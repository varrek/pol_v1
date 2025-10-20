/**
 * Test Suite for Voting System
 * Tests all requirements and scenarios from the OpenSpec specification
 */

import { VotingSystem } from './voting-system';

describe('VotingSystem', () => {
  let system: VotingSystem;

  beforeEach(() => {
    system = new VotingSystem();
  });

  // ==========================================================================
  // Requirement: Poll Creation
  // ==========================================================================

  describe('Poll Creation', () => {
    test('Create poll with valid data', () => {
      // WHEN a user creates a poll with a question and at least two options
      const pollId = system.createPoll(
        'What is your favorite color?',
        ['Red', 'Blue', 'Green'],
        'user1'
      );

      // THEN the system generates a unique poll ID and stores the poll
      expect(pollId).toBeTruthy();
      expect(pollId).toMatch(/^poll_\d+$/);

      // AND the poll is marked as open for voting
      const poll = system.getPoll(pollId);
      expect(poll.status).toBe('open');
      expect(poll.question).toBe('What is your favorite color?');
      expect(poll.options).toEqual(['Red', 'Blue', 'Green']);
    });

    test('Reject poll with insufficient options', () => {
      // WHEN a user attempts to create a poll with fewer than two options
      // THEN the system rejects the request with an appropriate error message
      expect(() => {
        system.createPoll('Question?', ['Only one option'], 'user1');
      }).toThrow('Poll must have at least two options');

      expect(() => {
        system.createPoll('Question?', [], 'user1');
      }).toThrow('Poll must have at least two options');
    });

    test('Reject poll with empty question', () => {
      // WHEN a user attempts to create a poll with an empty or blank question
      // THEN the system rejects the request with an appropriate error message
      expect(() => {
        system.createPoll('', ['Option 1', 'Option 2'], 'user1');
      }).toThrow('Question cannot be empty');

      expect(() => {
        system.createPoll('   ', ['Option 1', 'Option 2'], 'user1');
      }).toThrow('Question cannot be empty');
    });
  });

  // ==========================================================================
  // Requirement: Vote Casting
  // ==========================================================================

  describe('Vote Casting', () => {
    let pollId: string;

    beforeEach(() => {
      pollId = system.createPoll('Question?', ['A', 'B', 'C'], 'creator');
    });

    test('Cast valid vote', () => {
      // WHEN a user casts a vote on an open poll with a valid option
      expect(() => {
        system.castVote(pollId, 'voter1', 0);
      }).not.toThrow();

      // THEN the system records the vote
      // AND the vote is included in the poll results
      const results = system.getResults(pollId);
      expect(results.voteCounts[0]).toBe(1);
      expect(results.totalVotes).toBe(1);
    });

    test('Prevent duplicate votes', () => {
      // WHEN a user attempts to vote on the same poll more than once
      system.castVote(pollId, 'voter1', 0);

      // THEN the system rejects the subsequent vote attempts with an appropriate error message
      expect(() => {
        system.castVote(pollId, 'voter1', 1);
      }).toThrow('User has already voted on this poll');

      expect(() => {
        system.castVote(pollId, 'voter1', 0);
      }).toThrow('User has already voted on this poll');
    });

    test('Reject vote on closed poll', () => {
      // Close the poll first
      system.closePoll(pollId, 'creator');

      // WHEN a user attempts to vote on a closed poll
      // THEN the system rejects the vote with an appropriate error message
      expect(() => {
        system.castVote(pollId, 'voter1', 0);
      }).toThrow('Cannot vote on a closed poll');
    });

    test('Reject vote with invalid option', () => {
      // WHEN a user attempts to vote with an option that doesn't exist in the poll
      // THEN the system rejects the vote with an appropriate error message
      expect(() => {
        system.castVote(pollId, 'voter1', 5);
      }).toThrow('Invalid option');

      expect(() => {
        system.castVote(pollId, 'voter1', -1);
      }).toThrow('Invalid option');
    });
  });

  // ==========================================================================
  // Requirement: Result Viewing
  // ==========================================================================

  describe('Result Viewing', () => {
    test('Retrieve poll results', () => {
      // Create poll and cast some votes
      const pollId = system.createPoll('Question?', ['A', 'B', 'C'], 'creator');
      system.castVote(pollId, 'voter1', 0);
      system.castVote(pollId, 'voter2', 0);
      system.castVote(pollId, 'voter3', 1);

      // WHEN a user requests results for a poll
      const results = system.getResults(pollId);

      // THEN the system returns the poll question, all options, and vote counts for each option
      expect(results.question).toBe('Question?');
      expect(results.options).toEqual(['A', 'B', 'C']);
      expect(results.voteCounts).toEqual([2, 1, 0]);

      // AND the results reflect all votes cast up to that moment
      expect(results.totalVotes).toBe(3);
    });

    test('Show results for poll with no votes', () => {
      const pollId = system.createPoll('Question?', ['A', 'B'], 'creator');

      // WHEN a user requests results for a poll with no votes
      const results = system.getResults(pollId);

      // THEN the system returns the poll question and options with zero vote counts
      expect(results.question).toBe('Question?');
      expect(results.options).toEqual(['A', 'B']);
      expect(results.voteCounts).toEqual([0, 0]);
      expect(results.totalVotes).toBe(0);
    });
  });

  // ==========================================================================
  // Requirement: Poll Management
  // ==========================================================================

  describe('Poll Management', () => {
    let pollId: string;

    beforeEach(() => {
      pollId = system.createPoll('Question?', ['A', 'B'], 'creator');
    });

    test('Close poll', () => {
      // WHEN a poll creator closes their poll
      system.closePoll(pollId, 'creator');

      // THEN the system marks the poll as closed
      const poll = system.getPoll(pollId);
      expect(poll.status).toBe('closed');
      expect(poll.closedAt).toBeInstanceOf(Date);

      // AND no further votes can be cast on that poll
      expect(() => {
        system.castVote(pollId, 'voter1', 0);
      }).toThrow('Cannot vote on a closed poll');
    });

    test('Delete poll', () => {
      // Add some votes first
      system.castVote(pollId, 'voter1', 0);
      system.castVote(pollId, 'voter2', 1);

      // WHEN a poll creator deletes their poll
      system.deletePoll(pollId, 'creator');

      // THEN the system removes the poll and all associated votes
      // AND the poll is no longer accessible
      expect(() => {
        system.getPoll(pollId);
      }).toThrow('Poll not found');

      expect(() => {
        system.getResults(pollId);
      }).toThrow('Poll not found');
    });

    test('Prevent non-creator from managing poll', () => {
      // WHEN a user who is not the creator attempts to close or delete a poll
      // THEN the system rejects the request with an authorization error
      expect(() => {
        system.closePoll(pollId, 'notTheCreator');
      }).toThrow('Only the poll creator can close this poll');

      expect(() => {
        system.deletePoll(pollId, 'notTheCreator');
      }).toThrow('Only the poll creator can delete this poll');
    });
  });

  // ==========================================================================
  // Requirement: Poll Retrieval
  // ==========================================================================

  describe('Poll Retrieval', () => {
    test('Get poll by ID', () => {
      // Create a poll
      const pollId = system.createPoll('Question?', ['A', 'B'], 'creator');

      // WHEN a user requests a poll by its unique ID
      const poll = system.getPoll(pollId);

      // THEN the system returns the poll question, options, status (open/closed), and creator information
      expect(poll.id).toBe(pollId);
      expect(poll.question).toBe('Question?');
      expect(poll.options).toEqual(['A', 'B']);
      expect(poll.status).toBe('open');
      expect(poll.creator).toBe('creator');
      expect(poll.createdAt).toBeInstanceOf(Date);
    });

    test('Handle non-existent poll', () => {
      // WHEN a user requests a poll with an ID that doesn't exist
      // THEN the system returns an appropriate not found error
      expect(() => {
        system.getPoll('non_existent_poll');
      }).toThrow('Poll not found');
    });
  });

  // ==========================================================================
  // Integration Tests
  // ==========================================================================

  describe('Integration Scenarios', () => {
    test('Complete poll lifecycle', () => {
      // Create poll
      const pollId = system.createPoll(
        'Best programming language?',
        ['JavaScript', 'TypeScript', 'Python', 'Rust'],
        'alice'
      );

      // Multiple users vote
      system.castVote(pollId, 'bob', 1); // TypeScript
      system.castVote(pollId, 'charlie', 1); // TypeScript
      system.castVote(pollId, 'diana', 3); // Rust
      system.castVote(pollId, 'eve', 0); // JavaScript

      // Check results
      const results = system.getResults(pollId);
      expect(results.voteCounts).toEqual([1, 2, 0, 1]);
      expect(results.totalVotes).toBe(4);

      // Close poll
      system.closePoll(pollId, 'alice');

      // Verify no more votes allowed
      expect(() => {
        system.castVote(pollId, 'frank', 2);
      }).toThrow('Cannot vote on a closed poll');

      // Results still accessible
      const finalResults = system.getResults(pollId);
      expect(finalResults.totalVotes).toBe(4);
      expect(finalResults.status).toBe('closed');
    });

    test('Multiple independent polls', () => {
      const poll1 = system.createPoll('Poll 1?', ['A', 'B'], 'user1');
      const poll2 = system.createPoll('Poll 2?', ['X', 'Y', 'Z'], 'user2');

      // Vote on both
      system.castVote(poll1, 'voter', 0);
      system.castVote(poll2, 'voter', 1);

      // Verify independence
      const results1 = system.getResults(poll1);
      const results2 = system.getResults(poll2);

      expect(results1.totalVotes).toBe(1);
      expect(results2.totalVotes).toBe(1);
      expect(results1.voteCounts).toEqual([1, 0]);
      expect(results2.voteCounts).toEqual([0, 1, 0]);
    });
  });
});


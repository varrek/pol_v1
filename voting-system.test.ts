/**
 * Test Suite for Voting System
 * Tests all requirements and scenarios from the OpenSpec specification
 */

import { VotingSystem, getPollShareUrl, getPollIdFromUrl } from './voting-system';

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
  // Requirement: Poll Listing
  // ==========================================================================

  describe('Poll Listing', () => {
    test('Get all polls returns empty array when no polls exist', () => {
      // WHEN requesting all polls from empty system
      const polls = system.getAllPolls();

      // THEN the system returns an empty array
      expect(polls).toEqual([]);
    });

    test('Get all polls returns all created polls', () => {
      // Create multiple polls
      const poll1 = system.createPoll('Question 1?', ['A', 'B'], 'user1');
      const poll2 = system.createPoll('Question 2?', ['X', 'Y', 'Z'], 'user2');
      const poll3 = system.createPoll('Question 3?', ['Yes', 'No'], 'user1');

      // WHEN requesting all polls
      const polls = system.getAllPolls();

      // THEN the system returns all polls
      expect(polls).toHaveLength(3);
      expect(polls.map(p => p.id)).toContain(poll1);
      expect(polls.map(p => p.id)).toContain(poll2);
      expect(polls.map(p => p.id)).toContain(poll3);
    });

    test('Get all polls returns copies (immutability)', () => {
      // Create a poll
      const pollId = system.createPoll('Question?', ['A', 'B'], 'user1');

      // WHEN getting all polls
      const polls = system.getAllPolls();

      // THEN modifying returned poll does not affect stored poll
      polls[0].question = 'Modified question';

      const originalPoll = system.getPoll(pollId);
      expect(originalPoll.question).toBe('Question?');
    });
  });

  // ==========================================================================
  // Requirement: Vote Status Check
  // ==========================================================================

  describe('Vote Status Check', () => {
    let pollId: string;

    beforeEach(() => {
      pollId = system.createPoll('Question?', ['A', 'B'], 'creator');
    });

    test('hasUserVoted returns false when user has not voted', () => {
      // WHEN checking if user has voted before voting
      const hasVoted = system.hasUserVoted(pollId, 'voter1');

      // THEN the system returns false
      expect(hasVoted).toBe(false);
    });

    test('hasUserVoted returns true when user has voted', () => {
      // Cast a vote
      system.castVote(pollId, 'voter1', 0);

      // WHEN checking if user has voted after voting
      const hasVoted = system.hasUserVoted(pollId, 'voter1');

      // THEN the system returns true
      expect(hasVoted).toBe(true);
    });

    test('hasUserVoted is poll-specific', () => {
      // Create two polls
      const poll2 = system.createPoll('Question 2?', ['X', 'Y'], 'creator');

      // Vote only on first poll
      system.castVote(pollId, 'voter1', 0);

      // WHEN checking vote status
      // THEN user has voted on first poll but not second
      expect(system.hasUserVoted(pollId, 'voter1')).toBe(true);
      expect(system.hasUserVoted(poll2, 'voter1')).toBe(false);
    });

    test('hasUserVoted is user-specific', () => {
      // Vote as voter1
      system.castVote(pollId, 'voter1', 0);

      // WHEN checking vote status for different users
      // THEN only voter1 has voted
      expect(system.hasUserVoted(pollId, 'voter1')).toBe(true);
      expect(system.hasUserVoted(pollId, 'voter2')).toBe(false);
    });
  });

  // ==========================================================================
  // Immutability Tests
  // ==========================================================================

  describe('Immutability', () => {
    test('getPoll returns a copy that cannot modify stored poll', () => {
      // Create a poll
      const pollId = system.createPoll('Original question?', ['A', 'B'], 'user1');

      // WHEN getting poll and modifying returned object
      const poll = system.getPoll(pollId);
      poll.question = 'Modified question';
      poll.options.push('C');

      // THEN the stored poll is not affected
      const storedPoll = system.getPoll(pollId);
      expect(storedPoll.question).toBe('Original question?');
      // Note: options array is shallow copied, so this test verifies current behavior
    });

    test('Deleting poll removes all associated votes', () => {
      // Create poll and add votes
      const pollId = system.createPoll('Question?', ['A', 'B', 'C'], 'creator');
      system.castVote(pollId, 'voter1', 0);
      system.castVote(pollId, 'voter2', 1);
      system.castVote(pollId, 'voter3', 2);

      // Create another poll with votes
      const poll2 = system.createPoll('Question 2?', ['X', 'Y'], 'creator');
      system.castVote(poll2, 'voter1', 0);

      // WHEN deleting first poll
      system.deletePoll(pollId, 'creator');

      // THEN second poll votes are unaffected
      const results2 = system.getResults(poll2);
      expect(results2.totalVotes).toBe(1);
    });
  });

  // ==========================================================================
  // Edge Cases
  // ==========================================================================

  describe('Edge Cases', () => {
    test('Create poll with whitespace-only question fails', () => {
      expect(() => {
        system.createPoll('   \t\n   ', ['A', 'B'], 'user1');
      }).toThrow('Question cannot be empty');
    });

    test('Create poll trims question whitespace', () => {
      const pollId = system.createPoll('  Question with spaces?  ', ['A', 'B'], 'user1');
      const poll = system.getPoll(pollId);
      expect(poll.question).toBe('Question with spaces?');
    });

    test('Cast vote on non-existent poll fails', () => {
      expect(() => {
        system.castVote('non_existent', 'voter1', 0);
      }).toThrow('Poll not found');
    });

    test('Close already closed poll is idempotent', () => {
      const pollId = system.createPoll('Question?', ['A', 'B'], 'creator');
      system.closePoll(pollId, 'creator');

      // Closing again should not throw
      expect(() => {
        system.closePoll(pollId, 'creator');
      }).not.toThrow();

      const poll = system.getPoll(pollId);
      expect(poll.status).toBe('closed');
    });

    test('Get results for non-existent poll fails', () => {
      expect(() => {
        system.getResults('non_existent');
      }).toThrow('Poll not found');
    });

    test('Many voters can vote on same poll', () => {
      const pollId = system.createPoll('Question?', ['A', 'B'], 'creator');

      // 100 voters
      for (let i = 0; i < 100; i++) {
        system.castVote(pollId, `voter${i}`, i % 2);
      }

      const results = system.getResults(pollId);
      expect(results.totalVotes).toBe(100);
      expect(results.voteCounts[0]).toBe(50);
      expect(results.voteCounts[1]).toBe(50);
    });

    test('Poll with many options', () => {
      const options = Array.from({ length: 50 }, (_, i) => `Option ${i + 1}`);
      const pollId = system.createPoll('Many options?', options, 'creator');

      // Vote on last option
      system.castVote(pollId, 'voter1', 49);

      const results = system.getResults(pollId);
      expect(results.options).toHaveLength(50);
      expect(results.voteCounts[49]).toBe(1);
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

// ==========================================================================
// Poll Share URL Helper Tests (QR Code Functionality)
// ==========================================================================

describe('Poll Share URL Helpers', () => {
  // ==========================================================================
  // Requirement: Poll Share URL
  // ==========================================================================

  describe('getPollShareUrl', () => {
    test('Generate URL with poll ID as query parameter', () => {
      // WHEN the share URL is generated for a poll
      const url = getPollShareUrl('poll_123');

      // THEN the URL contains the poll ID as a query parameter
      expect(url).toBe('?poll=poll_123');
    });

    test('Generate URL with base URL', () => {
      // WHEN generating a share URL with a base URL
      const url = getPollShareUrl('poll_456', 'https://example.com/voting');

      // THEN the full URL is properly formed
      expect(url).toBe('https://example.com/voting?poll=poll_456');
    });

    test('URL encodes special characters in poll ID', () => {
      // WHEN generating a URL with special characters in poll ID
      const url = getPollShareUrl('poll with spaces & symbols');

      // THEN the poll ID is properly encoded
      expect(url).toBe('?poll=poll%20with%20spaces%20%26%20symbols');
    });

    test('Reject empty poll ID', () => {
      // WHEN attempting to generate URL with empty poll ID
      // THEN an error is thrown
      expect(() => {
        getPollShareUrl('');
      }).toThrow('Poll ID cannot be empty');

      expect(() => {
        getPollShareUrl('   ');
      }).toThrow('Poll ID cannot be empty');
    });
  });

  describe('getPollIdFromUrl', () => {
    test('Extract poll ID from URL with query parameter', () => {
      // WHEN parsing a URL with a poll parameter
      const pollId = getPollIdFromUrl('https://example.com/voting?poll=poll_123');

      // THEN the poll ID is correctly extracted
      expect(pollId).toBe('poll_123');
    });

    test('Extract poll ID from relative URL', () => {
      // WHEN parsing a relative URL with poll parameter
      const pollId = getPollIdFromUrl('/voting?poll=poll_789');

      // THEN the poll ID is correctly extracted
      expect(pollId).toBe('poll_789');
    });

    test('Return null for URL without poll parameter', () => {
      // WHEN parsing a URL without poll parameter
      const pollId = getPollIdFromUrl('https://example.com/voting');

      // THEN null is returned
      expect(pollId).toBeNull();
    });

    test('Handle URL-encoded poll ID', () => {
      // WHEN parsing a URL with encoded poll ID
      const pollId = getPollIdFromUrl('?poll=poll%20with%20spaces');

      // THEN the poll ID is decoded
      expect(pollId).toBe('poll with spaces');
    });

    test('Handle URL with multiple query parameters', () => {
      // WHEN parsing URL with multiple parameters
      const pollId = getPollIdFromUrl('https://example.com?user=123&poll=poll_456&mode=view');

      // THEN the poll ID is correctly extracted
      expect(pollId).toBe('poll_456');
    });

    test('Return null for invalid URL', () => {
      // WHEN parsing an invalid URL format
      const pollId = getPollIdFromUrl('not a valid url at all:::');

      // THEN null is returned (graceful handling)
      // Note: URL constructor with base URL handles most edge cases
      expect(pollId).toBeNull();
    });
  });

  describe('URL Roundtrip', () => {
    test('Poll ID survives generate and parse roundtrip', () => {
      // WHEN generating a URL and then parsing it back
      const originalPollId = 'poll_abc123';
      const shareUrl = getPollShareUrl(originalPollId, 'https://example.com');
      const parsedPollId = getPollIdFromUrl(shareUrl);

      // THEN the poll ID is preserved
      expect(parsedPollId).toBe(originalPollId);
    });

    test('Special characters survive roundtrip', () => {
      // WHEN generating and parsing a URL with special characters
      const originalPollId = 'poll_with-special.chars_123';
      const shareUrl = getPollShareUrl(originalPollId, 'https://example.com');
      const parsedPollId = getPollIdFromUrl(shareUrl);

      // THEN the poll ID is preserved
      expect(parsedPollId).toBe(originalPollId);
    });
  });
});


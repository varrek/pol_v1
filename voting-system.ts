/**
 * Simple Voting System
 * Implements poll creation, voting, and result management
 */

// ============================================================================
// Data Structures
// ============================================================================

interface Poll {
  id: string;
  question: string;
  options: string[];
  creator: string;
  createdAt: Date;
  closedAt: Date | null;
  status: 'open' | 'closed';
}

interface Vote {
  pollId: string;
  userId: string;
  optionIndex: number;
  timestamp: Date;
}

interface PollResults {
  pollId: string;
  question: string;
  options: string[];
  voteCounts: number[];
  totalVotes: number;
  status: 'open' | 'closed';
}

// ============================================================================
// Storage
// ============================================================================

class VotingSystem {
  private polls: Map<string, Poll> = new Map();
  private votes: Vote[] = [];
  private nextId = 1;

  // ==========================================================================
  // Poll Creation
  // ==========================================================================

  createPoll(question: string, options: string[], creator: string): string {
    // Validate question
    if (!question || question.trim() === '') {
      throw new Error('Question cannot be empty');
    }

    // Validate options
    if (options.length < 2) {
      throw new Error('Poll must have at least two options');
    }

    // Generate unique ID and create poll
    const id = this.generateId();
    const poll: Poll = {
      id,
      question: question.trim(),
      options,
      creator,
      createdAt: new Date(),
      closedAt: null,
      status: 'open',
    };

    this.polls.set(id, poll);
    return id;
  }

  // ==========================================================================
  // Vote Casting
  // ==========================================================================

  castVote(pollId: string, userId: string, optionIndex: number): void {
    // Check if poll exists
    const poll = this.polls.get(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }

    // Check if poll is open
    if (poll.status === 'closed') {
      throw new Error('Cannot vote on a closed poll');
    }

    // Check if option is valid
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      throw new Error('Invalid option');
    }

    // Check for duplicate vote
    const existingVote = this.votes.find(
      (v) => v.pollId === pollId && v.userId === userId
    );
    if (existingVote) {
      throw new Error('User has already voted on this poll');
    }

    // Record the vote
    const vote: Vote = {
      pollId,
      userId,
      optionIndex,
      timestamp: new Date(),
    };
    this.votes.push(vote);
  }

  // ==========================================================================
  // Result Viewing
  // ==========================================================================

  getResults(pollId: string): PollResults {
    const poll = this.polls.get(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }

    // Count votes for each option
    const voteCounts = new Array(poll.options.length).fill(0);
    const pollVotes = this.votes.filter((v) => v.pollId === pollId);

    for (const vote of pollVotes) {
      voteCounts[vote.optionIndex]++;
    }

    return {
      pollId: poll.id,
      question: poll.question,
      options: poll.options,
      voteCounts,
      totalVotes: pollVotes.length,
      status: poll.status,
    };
  }

  // ==========================================================================
  // Poll Management
  // ==========================================================================

  closePoll(pollId: string, userId: string): void {
    const poll = this.polls.get(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }

    // Check authorization
    if (poll.creator !== userId) {
      throw new Error('Only the poll creator can close this poll');
    }

    const updatedPoll: Poll = {
      ...poll,
      status: 'closed',
      closedAt: new Date(),
    };
    this.polls.set(pollId, updatedPoll);
  }

  deletePoll(pollId: string, userId: string): void {
    const poll = this.polls.get(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }

    // Check authorization
    if (poll.creator !== userId) {
      throw new Error('Only the poll creator can delete this poll');
    }

    // Remove poll and associated votes
    this.polls.delete(pollId);
    this.votes = this.votes.filter((v) => v.pollId !== pollId);
  }

  // ==========================================================================
  // Poll Retrieval
  // ==========================================================================

  getPoll(pollId: string): Poll {
    const poll = this.polls.get(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }
    return { ...poll }; // Return a copy
  }

  getAllPolls(): Poll[] {
    return Array.from(this.polls.values()).map(poll => ({ ...poll }));
  }

  hasUserVoted(pollId: string, userId: string): boolean {
    return this.votes.some(v => v.pollId === pollId && v.userId === userId);
  }

  // ==========================================================================
  // Helper Methods
  // ==========================================================================

  private generateId(): string {
    return `poll_${this.nextId++}`;
  }

  // Test helper: clear all data
  clear(): void {
    this.polls.clear();
    this.votes = [];
    this.nextId = 1;
  }
}

// ============================================================================
// Export
// ============================================================================

export { VotingSystem, Poll, Vote, PollResults };


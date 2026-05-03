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

class VotingSystem {
  private polls: Map<string, Poll> = new Map();
  private votes: Vote[] = [];
  private nextId = 1;

  createPoll(question: string, options: string[], creator: string): string {
    if (!question || question.trim() === '') {
      throw new Error('Question cannot be empty');
    }
    if (options.length < 2) {
      throw new Error('Poll must have at least two options');
    }

    const id = this.generateId();
    const poll: Poll = {
      id,
      question: question.trim(),
      options: [...options],
      creator,
      createdAt: new Date(),
      closedAt: null,
      status: 'open',
    };

    this.polls.set(id, poll);
    return id;
  }

  castVote(pollId: string, userId: string, optionIndex: number): void {
    const poll = this.polls.get(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }
    if (poll.status === 'closed') {
      throw new Error('Cannot vote on a closed poll');
    }
    if (optionIndex < 0 || optionIndex >= poll.options.length) {
      throw new Error('Invalid option');
    }

    const existingVote = this.votes.find(
      (v) => v.pollId === pollId && v.userId === userId
    );
    if (existingVote) {
      throw new Error('User has already voted on this poll');
    }

    const vote: Vote = {
      pollId,
      userId,
      optionIndex,
      timestamp: new Date(),
    };
    this.votes = [...this.votes, vote];
  }

  getResults(pollId: string): PollResults {
    const poll = this.polls.get(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }

    const pollVotes = this.votes.filter((v) => v.pollId === pollId);
    const voteCounts = poll.options.map((_, index) =>
      pollVotes.filter((v) => v.optionIndex === index).length
    );

    return {
      pollId: poll.id,
      question: poll.question,
      options: [...poll.options],
      voteCounts,
      totalVotes: pollVotes.length,
      status: poll.status,
    };
  }

  closePoll(pollId: string, userId: string): void {
    const poll = this.polls.get(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }
    if (poll.creator !== userId) {
      throw new Error('Only the poll creator can close this poll');
    }

    this.polls.set(pollId, { ...poll, status: 'closed', closedAt: new Date() });
  }

  deletePoll(pollId: string, userId: string): void {
    const poll = this.polls.get(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }
    if (poll.creator !== userId) {
      throw new Error('Only the poll creator can delete this poll');
    }

    this.polls.delete(pollId);
    this.votes = this.votes.filter((v) => v.pollId !== pollId);
  }

  getPoll(pollId: string): Poll {
    const poll = this.polls.get(pollId);
    if (!poll) {
      throw new Error('Poll not found');
    }
    return { ...poll, options: [...poll.options] };
  }

  getAllPolls(): Poll[] {
    return Array.from(this.polls.values()).map(poll => ({ ...poll, options: [...poll.options] }));
  }

  hasUserVoted(pollId: string, userId: string): boolean {
    return this.votes.some(v => v.pollId === pollId && v.userId === userId);
  }

  private generateId(): string {
    return `poll_${this.nextId++}`;
  }
}

export { VotingSystem, Poll, Vote, PollResults };

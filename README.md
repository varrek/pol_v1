# Voting System v

A simple, lightweight voting system for creating polls, casting votes, and viewing results.

## Features

- ✅ Create polls with multiple choice options
- ✅ Cast votes with duplicate prevention
- ✅ View real-time results
- ✅ Manage polls (close, delete)
- ✅ Authorization controls for poll creators

## Installation

```bash
npm install
```

## Usage

### Basic Example

```typescript
import { VotingSystem } from './voting-system';

// Create a voting system instance
const system = new VotingSystem();

// Create a poll
const pollId = system.createPoll(
  'What is your favorite programming language?',
  ['JavaScript', 'TypeScript', 'Python', 'Rust'],
  'alice'
);

// Cast votes
system.castVote(pollId, 'bob', 0);    // Vote for JavaScript
system.castVote(pollId, 'charlie', 1); // Vote for TypeScript
system.castVote(pollId, 'diana', 1);   // Vote for TypeScript

// Get results
const results = system.getResults(pollId);
console.log(results);
// {
//   pollId: 'poll_1',
//   question: 'What is your favorite programming language?',
//   options: ['JavaScript', 'TypeScript', 'Python', 'Rust'],
//   voteCounts: [1, 2, 0, 0],
//   totalVotes: 3,
//   status: 'open'
// }

// Close the poll (only creator can do this)
system.closePoll(pollId, 'alice');
```

### API Reference

#### `createPoll(question: string, options: string[], creator: string): string`

Creates a new poll.

**Parameters:**
- `question` - The poll question (cannot be empty)
- `options` - Array of options (must have at least 2)
- `creator` - User ID of the poll creator

**Returns:** Unique poll ID

**Throws:**
- `Error` if question is empty
- `Error` if fewer than 2 options provided

**Example:**
```typescript
const pollId = system.createPoll(
  'Best pizza topping?',
  ['Pepperoni', 'Mushrooms', 'Pineapple'],
  'user123'
);
```

#### `castVote(pollId: string, userId: string, optionIndex: number): void`

Cast a vote on an open poll.

**Parameters:**
- `pollId` - ID of the poll
- `userId` - ID of the user voting
- `optionIndex` - Index of the selected option (0-based)

**Throws:**
- `Error` if poll not found
- `Error` if poll is closed
- `Error` if option index is invalid
- `Error` if user has already voted on this poll

**Example:**
```typescript
system.castVote('poll_1', 'user456', 0);
```

#### `getResults(pollId: string): PollResults`

Retrieve current poll results.

**Parameters:**
- `pollId` - ID of the poll

**Returns:** Object with poll results including vote counts

**Throws:**
- `Error` if poll not found

**Example:**
```typescript
const results = system.getResults('poll_1');
console.log(`Total votes: ${results.totalVotes}`);
console.log(`Vote counts: ${results.voteCounts}`);
```

#### `getPoll(pollId: string): Poll`

Get poll information.

**Parameters:**
- `pollId` - ID of the poll

**Returns:** Poll object with all metadata

**Throws:**
- `Error` if poll not found

**Example:**
```typescript
const poll = system.getPoll('poll_1');
console.log(`Question: ${poll.question}`);
console.log(`Status: ${poll.status}`);
console.log(`Created by: ${poll.creator}`);
```

#### `closePoll(pollId: string, userId: string): void`

Close a poll to prevent further voting.

**Parameters:**
- `pollId` - ID of the poll
- `userId` - ID of the user (must be creator)

**Throws:**
- `Error` if poll not found
- `Error` if user is not the creator

**Example:**
```typescript
system.closePoll('poll_1', 'alice');
```

#### `deletePoll(pollId: string, userId: string): void`

Delete a poll and all its votes.

**Parameters:**
- `pollId` - ID of the poll
- `userId` - ID of the user (must be creator)

**Throws:**
- `Error` if poll not found
- `Error` if user is not the creator

**Example:**
```typescript
system.deletePoll('poll_1', 'alice');
```

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm test -- --watch
```

## Type Definitions

```typescript
interface Poll {
  id: string;
  question: string;
  options: string[];
  creator: string;
  createdAt: Date;
  closedAt: Date | null;
  status: 'open' | 'closed';
}

interface PollResults {
  pollId: string;
  question: string;
  options: string[];
  voteCounts: number[];
  totalVotes: number;
  status: 'open' | 'closed';
}
```

## Error Handling

All methods throw descriptive errors for invalid operations:

```typescript
try {
  system.castVote('poll_1', 'user123', 0);
} catch (error) {
  console.error(error.message);
  // Possible errors:
  // - "Poll not found"
  // - "Cannot vote on a closed poll"
  // - "Invalid option"
  // - "User has already voted on this poll"
}
```

## Design Decisions

- **In-memory storage**: Simple implementation suitable for single-instance applications
- **String-based IDs**: Auto-incrementing poll IDs for simplicity
- **Index-based voting**: Options referenced by index for efficiency
- **Creator authorization**: Only poll creators can close or delete their polls
- **One vote per user**: Enforced at the system level

## Limitations

- No persistence (data lost on restart)
- Single-instance only (no database or external storage)
- No vote modification (users cannot change their vote)
- No poll listing (fetch by ID only)

## License

MIT


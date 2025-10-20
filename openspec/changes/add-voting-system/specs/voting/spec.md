## ADDED Requirements

### Requirement: Poll Creation

The system SHALL allow users to create polls with a question and multiple choice options.

#### Scenario: Create poll with valid data

- **WHEN** a user creates a poll with a question and at least two options
- **THEN** the system generates a unique poll ID and stores the poll
- **AND** the poll is marked as open for voting

#### Scenario: Reject poll with insufficient options

- **WHEN** a user attempts to create a poll with fewer than two options
- **THEN** the system rejects the request with an appropriate error message

#### Scenario: Reject poll with empty question

- **WHEN** a user attempts to create a poll with an empty or blank question
- **THEN** the system rejects the request with an appropriate error message

### Requirement: Vote Casting

The system SHALL allow users to cast votes on open polls.

#### Scenario: Cast valid vote

- **WHEN** a user casts a vote on an open poll with a valid option
- **THEN** the system records the vote with the user ID, poll ID, and selected option
- **AND** the vote is included in the poll results

#### Scenario: Prevent duplicate votes

- **WHEN** a user attempts to vote on the same poll more than once
- **THEN** the system rejects the subsequent vote attempts with an appropriate error message

#### Scenario: Reject vote on closed poll

- **WHEN** a user attempts to vote on a closed poll
- **THEN** the system rejects the vote with an appropriate error message

#### Scenario: Reject vote with invalid option

- **WHEN** a user attempts to vote with an option that doesn't exist in the poll
- **THEN** the system rejects the vote with an appropriate error message

### Requirement: Result Viewing

The system SHALL provide real-time vote counts and results for each poll.

#### Scenario: Retrieve poll results

- **WHEN** a user requests results for a poll
- **THEN** the system returns the poll question, all options, and vote counts for each option
- **AND** the results reflect all votes cast up to that moment

#### Scenario: Show results for poll with no votes

- **WHEN** a user requests results for a poll with no votes
- **THEN** the system returns the poll question and options with zero vote counts

### Requirement: Poll Management

The system SHALL allow poll creators to manage their polls.

#### Scenario: Close poll

- **WHEN** a poll creator closes their poll
- **THEN** the system marks the poll as closed
- **AND** no further votes can be cast on that poll

#### Scenario: Delete poll

- **WHEN** a poll creator deletes their poll
- **THEN** the system removes the poll and all associated votes
- **AND** the poll is no longer accessible

#### Scenario: Prevent non-creator from managing poll

- **WHEN** a user who is not the creator attempts to close or delete a poll
- **THEN** the system rejects the request with an authorization error

### Requirement: Poll Retrieval

The system SHALL allow users to retrieve poll information.

#### Scenario: Get poll by ID

- **WHEN** a user requests a poll by its unique ID
- **THEN** the system returns the poll question, options, status (open/closed), and creator information

#### Scenario: Handle non-existent poll

- **WHEN** a user requests a poll with an ID that doesn't exist
- **THEN** the system returns an appropriate not found error


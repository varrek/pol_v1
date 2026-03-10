## ADDED Requirements

### Requirement: Poll URL Routing

The system SHALL support opening a specific poll via a shareable URL.

#### Scenario: Open poll from hash-based URL on load

- **WHEN** the user loads the application with a URL hash `#poll/<pollId>` and the poll exists
- **THEN** the system displays the poll detail view for that poll
- **AND** the URL remains `#poll/<pollId>`

#### Scenario: Update URL when navigating to a poll

- **WHEN** the user navigates to a poll (by clicking a poll in the list or after creating a poll)
- **THEN** the system sets `location.hash` to `#poll/<pollId>` so the URL is shareable

#### Scenario: Handle invalid or missing poll ID in URL

- **WHEN** the user loads the application with `#poll/<invalidOrMissingId>`
- **THEN** the system shows the polls list or an appropriate error state
- **AND** does not show poll detail for a non-existent poll

### Requirement: QR Code for Poll Sharing

The system SHALL display a QR code on the poll detail view that encodes the full URL to the current poll.

#### Scenario: Display QR code on poll detail

- **WHEN** the user views the detail of an existing poll
- **THEN** the system displays a QR code that encodes the full URL (origin + path + hash) to that poll
- **AND** scanning the QR code leads to the same poll in the browser

#### Scenario: QR code updates with current poll

- **WHEN** the user switches to view a different poll
- **THEN** the QR code updates to encode the URL of the currently displayed poll
- **AND** the system does not show a QR code when the poll does not exist

## ADDED Requirements

### Requirement: Poll share link

The system SHALL provide a shareable URL for each poll that opens the poll detail view when visited.

#### Scenario: Share URL format

- **WHEN** a poll exists with id `poll_1`
- **THEN** the share URL is the current page URL with fragment `#poll_1`
- **AND** visiting that URL opens the poll detail view for that poll

#### Scenario: Open poll from hash on load

- **WHEN** a user opens the application with a hash fragment matching a poll id (e.g. `#poll_1`)
- **THEN** the system opens the poll detail view for that poll after initialization
- **AND** the poll is displayed if it exists in the current session

### Requirement: QR code for poll share

The system SHALL display a QR code on the poll detail view that encodes the poll share URL.

#### Scenario: QR code visible on poll detail

- **WHEN** a user views a poll’s detail page
- **THEN** the system displays a QR code image
- **AND** scanning the QR code yields the poll share URL
- **AND** opening that URL shows the same poll (when state allows)

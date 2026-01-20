## ADDED Requirements

### Requirement: QR Code Generation

The system SHALL generate a QR code for each poll that encodes the direct URL to access that poll.

#### Scenario: QR code displayed on poll detail

- **WHEN** a user views a poll detail page
- **THEN** a QR code is displayed that links to the current poll

#### Scenario: QR code contains valid poll URL

- **WHEN** a QR code is scanned
- **THEN** the scanner navigates to the poll detail page for that specific poll

### Requirement: Poll Deep Linking

The system SHALL support accessing a specific poll directly via URL.

#### Scenario: Direct poll access via URL hash

- **WHEN** a user navigates to a URL with a poll ID hash (e.g., `#poll_1`)
- **THEN** the poll detail view is displayed for that poll

#### Scenario: Invalid poll ID in URL

- **WHEN** a user navigates to a URL with an invalid poll ID hash
- **THEN** the polls list view is displayed

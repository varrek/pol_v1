## ADDED Requirements

### Requirement: QR Code Generation
The system SHALL generate a QR code that encodes the shareable URL for any poll.

#### Scenario: Generate QR code for open poll
- **WHEN** a user views a poll detail page
- **AND** clicks the "Show QR Code" button
- **THEN** a QR code is displayed encoding the poll's shareable URL

#### Scenario: QR code contains valid poll URL
- **WHEN** a QR code is generated for a poll
- **THEN** scanning the QR code SHALL produce a URL in format `{baseUrl}?poll={pollId}`
- **AND** the URL SHALL be accessible and navigate to the poll

### Requirement: URL-Based Poll Navigation
The system SHALL support direct navigation to a poll via URL query parameter.

#### Scenario: Navigate to poll via URL parameter
- **WHEN** a user opens the application with `?poll={pollId}` in the URL
- **THEN** the system SHALL automatically display the poll detail view for that poll

#### Scenario: Invalid poll ID in URL
- **WHEN** a user opens the application with an invalid poll ID in the URL
- **THEN** the system SHALL display an error message
- **AND** show the polls list view

### Requirement: QR Code Display Modal
The system SHALL display the QR code in a dismissible modal overlay.

#### Scenario: Display QR code modal
- **WHEN** the user clicks "Show QR Code"
- **THEN** a modal overlay SHALL appear with the QR code
- **AND** the poll question SHALL be displayed as a title
- **AND** a "Copy Link" button SHALL be available

#### Scenario: Dismiss QR code modal
- **WHEN** the QR code modal is displayed
- **AND** the user clicks outside the modal or clicks a close button
- **THEN** the modal SHALL close

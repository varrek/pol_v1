## ADDED Requirements

### Requirement: QR Code Generation

The system SHALL generate a QR code for each poll that encodes the poll's shareable URL.

#### Scenario: Generate QR code for open poll

- **WHEN** user views an open poll detail page
- **THEN** a "Share Poll" button is displayed
- **AND** clicking the button shows a QR code encoding the poll URL

#### Scenario: Generate QR code for closed poll

- **WHEN** user views a closed poll detail page
- **THEN** the "Share Poll" button is still available
- **AND** clicking it shows a QR code (for viewing results)

### Requirement: Poll Share URL

The system SHALL provide a shareable URL for each poll that directly links to the poll detail view.

#### Scenario: URL contains poll ID

- **WHEN** the share URL is generated for a poll
- **THEN** the URL contains the poll ID as a query parameter or hash fragment
- **AND** navigating to the URL opens the poll detail view

#### Scenario: URL is scannable

- **WHEN** a user scans the QR code with a mobile device
- **THEN** the device's browser opens the poll voting/results page

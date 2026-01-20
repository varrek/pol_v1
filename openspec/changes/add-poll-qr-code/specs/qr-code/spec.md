## ADDED Requirements

### Requirement: Poll QR Code Generation
The system SHALL generate a QR code for each poll that encodes the poll's shareable URL.

#### Scenario: QR code display
- **WHEN** a user views a poll's detail page
- **THEN** a QR code encoding the poll URL is displayed in a "Share Poll" section

#### Scenario: QR code encodes correct URL
- **WHEN** the QR code is scanned
- **THEN** it decodes to the poll's shareable URL (e.g., `https://host/?poll=poll_1`)

### Requirement: QR Code Download
The system SHALL allow users to download the QR code as an image file.

#### Scenario: Download QR code
- **WHEN** a user clicks the "Download QR" button
- **THEN** the QR code image is downloaded to their device

### Requirement: URL-based Poll Navigation
The system SHALL support navigating directly to a poll via URL query parameter.

#### Scenario: Direct poll access via URL
- **WHEN** a user opens the application with `?poll=<poll_id>` in the URL
- **THEN** the poll detail view for that poll is displayed

#### Scenario: Invalid poll ID in URL
- **WHEN** a user opens the application with an invalid poll ID in the URL
- **THEN** an error message is displayed and the user can navigate to the polls list

### Requirement: Shareable URL Display
The system SHALL display a copyable poll URL alongside the QR code.

#### Scenario: Copy poll URL
- **WHEN** a user clicks the "Copy URL" button
- **THEN** the poll's shareable URL is copied to the clipboard
- **AND** a confirmation message is shown

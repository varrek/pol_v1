## ADDED Requirements

### Requirement: QR Code Generation

The system SHALL provide QR code generation for poll sharing.

#### Scenario: Generate QR code for poll
- **WHEN** a user clicks the "Share QR Code" button on a poll detail page
- **THEN** a modal displays containing a QR code that encodes the poll's shareable URL

#### Scenario: QR code contains valid poll URL
- **WHEN** a QR code is generated for a poll
- **THEN** scanning the QR code SHALL navigate to the poll's detail page

### Requirement: QR Code Download

The system SHALL allow users to download generated QR codes.

#### Scenario: Download QR code as image
- **WHEN** a user clicks the "Download" button in the QR code modal
- **THEN** the QR code image SHALL be downloaded as a PNG file

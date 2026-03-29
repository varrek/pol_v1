## ADDED Requirements

### Requirement: QR Code Sharing

The system SHALL generate and display a QR code for sharing polls.

#### Scenario: Display QR code on poll detail page

- **WHEN** a user views a poll detail page
- **THEN** the system generates and displays a QR code
- **AND** the QR code encodes the full URL to that specific poll

#### Scenario: QR code styling and instructions

- **WHEN** a QR code is displayed on the poll detail page
- **THEN** the system displays the QR code with sufficient size for scanning
- **AND** includes descriptive text explaining how to use the QR code
- **AND** the QR code is visually distinct from other page elements

#### Scenario: QR code updates when viewing different polls

- **WHEN** a user navigates from one poll to another
- **THEN** the system regenerates the QR code for the new poll
- **AND** the QR code reflects the correct URL for the currently viewed poll

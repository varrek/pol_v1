## ADDED Requirements

### Requirement: QR Code Generation

The system SHALL generate QR codes for poll URLs to enable easy sharing.

#### Scenario: Generate QR code for poll

- **WHEN** a user views a poll detail page
- **THEN** the system generates a QR code containing the poll URL
- **AND** displays the QR code prominently on the page

#### Scenario: Download QR code

- **WHEN** a user clicks the download QR code button
- **THEN** the system downloads the QR code as an image file
- **AND** the filename includes the poll ID

#### Scenario: QR code encodes correct URL

- **WHEN** a QR code is generated
- **THEN** it encodes the full URL to access the poll
- **AND** the URL includes the poll ID in a parseable format

### Requirement: QR Code Scanning

The system SHALL allow users to scan QR codes to quickly access polls.

#### Scenario: Access camera for scanning

- **WHEN** a user clicks "Scan QR Code"
- **THEN** the system requests camera permissions
- **AND** displays the camera viewfinder when granted

#### Scenario: Scan valid poll QR code

- **WHEN** a user scans a QR code containing a poll URL
- **THEN** the system extracts the poll ID
- **AND** navigates to the poll detail page

#### Scenario: Handle invalid QR code

- **WHEN** a user scans a QR code that doesn't contain a poll URL
- **THEN** the system displays an error message
- **AND** allows the user to scan again

#### Scenario: Handle camera permission denial

- **WHEN** a user denies camera permissions
- **THEN** the system displays a message explaining the need for camera access
- **AND** provides instructions to enable permissions

### Requirement: Deep Linking

The system SHALL support URL-based navigation to specific polls.

#### Scenario: Access poll via URL

- **WHEN** a user opens a URL with a poll ID
- **THEN** the system extracts the poll ID from the URL
- **AND** navigates directly to that poll

#### Scenario: Update URL when navigating

- **WHEN** a user navigates to a poll
- **THEN** the system updates the browser URL to include the poll ID
- **AND** enables browser back/forward navigation

#### Scenario: Handle invalid poll ID in URL

- **WHEN** a URL contains an invalid or non-existent poll ID
- **THEN** the system displays an error message
- **AND** redirects to the polls list

### Requirement: Share Interface

The system SHALL provide a user-friendly interface for sharing polls via QR codes.

#### Scenario: Display sharing options

- **WHEN** a user views a poll they created
- **THEN** the system displays a "Share" section with QR code
- **AND** provides copy link and download options

#### Scenario: Copy poll link

- **WHEN** a user clicks "Copy Link"
- **THEN** the system copies the full poll URL to clipboard
- **AND** displays a confirmation message

#### Scenario: Responsive QR display

- **WHEN** a user views the QR code on mobile
- **THEN** the system displays an appropriately sized QR code
- **AND** maintains scannability from another device


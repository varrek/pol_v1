## ADDED Requirements

### Requirement: JIRA Status Sync on Delivery

The development workflow SHALL keep JIRA issue status aligned with delivery stages: work started (In Progress), review requested (In Review), and merged or closed (Done or equivalent).

#### Scenario: Status updated when work starts

- **WHEN** implementation begins on a JIRA issue
- **THEN** the issue status SHALL be set to "In Progress" (or project-equivalent)
- **AND** the assignee SHALL be set when applicable

#### Scenario: Status updated when PR is opened

- **WHEN** a pull request is opened for the JIRA issue
- **THEN** the issue status SHALL be set to "In Review" (or project-equivalent)
- **AND** the PR link SHALL be added to the JIRA issue (e.g. in description, comment, or branch link)

#### Scenario: Status updated when PR is merged or closed

- **WHEN** the pull request is merged or closed
- **THEN** the JIRA issue SHALL be transitioned to "Done" or "Closed" as per project workflow
- **AND** the resolution SHALL be set when the project requires it

### Requirement: UI Testing Before PR

Deliverables that affect the web UI SHALL be validated with UI or browser tests before a pull request is created.

#### Scenario: UI tests run before PR

- **WHEN** changes affect the web interface (e.g. HTML, CSS, or frontend behavior)
- **THEN** the agent or developer SHALL run UI or browser tests (e.g. Playwright, project scripts, or manual verification)
- **AND** UI tests SHALL pass or be explicitly documented as not applicable before opening the PR

#### Scenario: Automated tests and UI tests both run

- **WHEN** preparing a pull request
- **THEN** the full automated test suite (e.g. `npm test`) SHALL be run
- **AND** UI or browser validation SHALL be run where the project supports it
- **AND** both SHALL pass before the PR is considered ready for review

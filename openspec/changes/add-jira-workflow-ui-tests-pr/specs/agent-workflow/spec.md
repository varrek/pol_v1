## ADDED Requirements

### Requirement: JIRA-Led Implementation Workflow

When working on a JIRA issue, the agent or developer SHALL fetch the issue, implement changes on a dedicated branch, update JIRA status as work progresses, run automated and UI tests, and deliver via a pull request linked to the issue.

#### Scenario: Start work on issue

- **WHEN** an agent or developer begins work on a JIRA issue
- **THEN** they SHALL create a feature branch (e.g. from the issue key or summary)
- **AND** they SHALL transition the JIRA issue to "In Progress" (or equivalent) when implementation starts

#### Scenario: Validation before PR

- **WHEN** implementation is complete and ready for review
- **THEN** the agent or developer SHALL run the full automated test suite (e.g. `npm test`)
- **AND** they SHALL run or verify UI/browser tests (e.g. Playwright or project UI test approach)
- **AND** all tests SHALL pass before a pull request is created

#### Scenario: PR creation and JIRA linkage

- **WHEN** work is ready for review
- **THEN** the agent or developer SHALL open a pull request
- **AND** the PR title or description SHALL reference the JIRA issue key (e.g. KAN-123)
- **AND** the JIRA issue SHALL be transitioned to "In Review" or equivalent when the PR is opened

#### Scenario: Handling PR review feedback

- **WHEN** a reviewer leaves comments on the pull request that require follow-up work
- **THEN** the agent or developer SHALL create JIRA ticket(s) for each distinct follow-up item
- **AND** each ticket SHALL reference the original issue or PR where applicable

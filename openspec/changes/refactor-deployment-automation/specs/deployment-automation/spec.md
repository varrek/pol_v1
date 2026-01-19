# Deployment Automation Specification

## ADDED Requirements

### Requirement: Automated Branch Management

The system SHALL provide programmatic branch creation and management through MCP GitHub tools.

#### Scenario: Create feature branch for change

- **WHEN** a new OpenSpec change is ready for implementation
- **THEN** the system creates a feature branch named `feature/<change-id>` using `mcp_github_create_branch`
- **AND** the branch is based on the current main branch

#### Scenario: Check existing branch

- **WHEN** a feature branch already exists for a change
- **THEN** the system uses the existing branch without creating a duplicate
- **AND** warns the user if uncommitted changes exist

### Requirement: Automated File Commit and Push

The system SHALL push multiple files to a remote branch in a single atomic commit using MCP GitHub tools.

#### Scenario: Push changes to feature branch

- **WHEN** implementation is complete and files are ready to push
- **THEN** the system collects all modified files for the change
- **AND** pushes them atomically using `mcp_github_push_files` with a descriptive commit message
- **AND** reports success or failure with clear error messages

#### Scenario: Generate commit message

- **WHEN** preparing to push files
- **THEN** the system generates a commit message following the pattern: `<verb> <change-name>` (e.g., "Add QR code poll sharing")
- **AND** includes a summary from the OpenSpec proposal if available

### Requirement: Automated Pull Request Creation

The system SHALL create GitHub pull requests programmatically with auto-generated descriptions based on OpenSpec proposals.

#### Scenario: Create PR from feature branch

- **WHEN** files are successfully pushed to a feature branch
- **THEN** the system creates a PR using `mcp_github_create_pull_request`
- **AND** sets the base branch to `main`
- **AND** sets the head branch to the feature branch
- **AND** uses an auto-generated title and description

#### Scenario: Generate PR description

- **WHEN** creating a pull request
- **THEN** the system generates a description including:
  - Change purpose from `proposal.md`
  - Implementation summary from `tasks.md`
  - OpenSpec validation status
  - List of affected files
- **AND** formats the description using markdown

#### Scenario: Handle PR creation failure

- **WHEN** PR creation fails (e.g., duplicate PR, network error)
- **THEN** the system reports the error clearly
- **AND** provides a manual fallback command
- **AND** does not leave the repository in an inconsistent state

### Requirement: Automated Code Review Request

The system SHALL optionally request automated code reviews using GitHub Copilot through MCP tools.

#### Scenario: Request Copilot review on new PR

- **WHEN** a PR is successfully created
- **AND** the user opts in to automated review
- **THEN** the system requests a Copilot review using `mcp_github_request_copilot_review`
- **AND** reports the review request status

### Requirement: OpenSpec Integration

The system SHALL validate OpenSpec status before creating PRs and optionally archive changes after merge.

#### Scenario: Validate before PR creation

- **WHEN** preparing to create a PR for an OpenSpec change
- **THEN** the system runs `openspec validate <change-id> --strict`
- **AND** only proceeds if validation passes
- **AND** reports validation errors if they exist

#### Scenario: Include OpenSpec status in PR

- **WHEN** generating PR description
- **THEN** the system includes:
  - Change ID and path (`openspec/changes/<id>/`)
  - Validation status (✅ Passed strict checks)
  - Task completion count (e.g., "21/23 tasks completed")
  - Link to proposal file

### Requirement: Error Handling and Fallback

The system SHALL provide clear error messages and manual fallback instructions when automation fails.

#### Scenario: MCP authentication failure

- **WHEN** MCP GitHub tools fail due to authentication error
- **THEN** the system reports the authentication issue
- **AND** provides instructions to check `.cursor/mcp.json` configuration
- **AND** suggests manual git/gh CLI commands as fallback

#### Scenario: Network failure during push

- **WHEN** file push fails due to network error
- **THEN** the system reports the network issue
- **AND** provides a retry command
- **AND** ensures no partial state is left in the repository

#### Scenario: Invalid branch state

- **WHEN** the target branch has conflicts or is out of sync
- **THEN** the system detects the conflict
- **AND** provides instructions to resolve (fetch, rebase, etc.)
- **AND** does not proceed with the PR creation

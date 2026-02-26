<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# JIRA Workflow (when working on a JIRA issue)

When working on a JIRA issue (e.g. KAN-xxx):

1. **Branch**: Create a feature branch from `main` (e.g. `feature/KAN-123-short-description`).
2. **Status**: When starting work, transition the issue to **In Progress** (or project equivalent).
3. **Implement**: Complete the work; run `npm test` and UI/browser tests before opening a PR.
4. **UI tests**: Run or verify UI (see "UI testing" below). Use the webapp-testing skill (e.g. `scripts/with_server.py` + Playwright) or manual verification.
5. **PR**: Open a pull request with the JIRA issue key in the title or description (e.g. `KAN-123: Add feature`).
6. **Status**: When the PR is opened, transition the issue to **In Review** (or equivalent).
7. **Review comments**: For each distinct follow-up from PR review, create a JIRA ticket and link to the original issue or PR.
8. **Done**: When the PR is merged, transition the issue to **Done** (or Closed) as per project workflow.

# UI Testing

- **Automated**: Run the full unit test suite with `npm test`.
- **Browser/UI**: For changes that affect the web UI, validate using one of:
  - The **webapp-testing** skill: use `scripts/with_server.py` (see `.agents/skills/webapp-testing/SKILL.md`) with a local server and Playwright to exercise the UI.
  - **Manual**: Open the app in a browser and verify the changed behavior.
- Both automated and UI validation should pass before opening a PR.

# Testing Requirements

**All new functionality MUST include automated tests.**

## When Implementing Features

1. **Write tests first (TDD)** - Create failing tests before implementation
2. **Cover success paths** - Test the main expected behavior
3. **Cover error cases** - Test edge cases and error handling
4. **Use factory patterns** - Create `getMockX(overrides?)` for test data

## Test Commands

```bash
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run with coverage report
```

## Before Committing

- Tests run automatically via pre-commit hook
- Commit will be blocked if tests fail
- Fix failing tests before committing

## Pull Request Requirements

- All PRs must pass test suite in CI
- New features without tests will not be approved
- Test coverage should not decrease
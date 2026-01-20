## Why

To ensure code quality and prevent regressions, all new functionality must include automated tests. Tests should run automatically before commits and on pull requests to catch issues early in the development cycle.

## What Changes

- Update Claude/Cursor agent rules to require tests for all new functionality
- Add pre-commit hook to run tests before each commit
- Update PR workflow to run tests before code review
- Update AGENTS.md with testing requirements

## Impact

- Affected specs: New `development-workflow` capability
- Affected code: 
  - `AGENTS.md` - Add testing requirements
  - `.claude/agents/code-reviewer.md` - Enforce test coverage
  - `.github/workflows/pr-claude-code-review.yml` - Add test step
  - `package.json` - Add pre-commit hook configuration
- Dependencies: Existing Jest testing setup

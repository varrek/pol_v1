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
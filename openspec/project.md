# Project Context

## Purpose
Simple voting system for creating polls and casting votes with a web-based UI.

## Tech Stack
- TypeScript
- Jest for testing
- HTML/CSS/JavaScript for web UI

## Project Conventions

### Code Style
- Use TypeScript strict mode
- Prefer interfaces over types
- Use factory patterns for test data

### Architecture Patterns
- Single-file web application (index.html)
- In-memory data storage
- Event-driven UI updates

### Testing Strategy

**All new functionality MUST include automated tests.**

- **Test-Driven Development (TDD)**: Write failing tests first, then implement
- **Behavior-driven tests**: Test what code does, not how it does it
- **Factory pattern**: Use `getMockX(overrides?)` for test data
- **Pre-commit hooks**: Tests run automatically before each commit
- **CI/CD**: Tests run on all pull requests before code review

Commands:
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

### Git Workflow
- Feature branches from main
- Pre-commit hooks run tests
- PRs require passing tests
- Code review via Claude

## Domain Context
- Polls have questions and multiple options
- Users can vote once per poll
- Poll creators can close or delete polls

## Important Constraints
- Tests must pass before commits
- PRs without tests for new features will not be approved

## External Dependencies
- Jest for testing framework
- Husky for Git hooks

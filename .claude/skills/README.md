# Claude Code Skills

This directory contains project-specific skills that provide Claude with domain knowledge and best practices for this codebase.

## Available Skills

| Skill | Description |
|-------|-------------|
| [systematic-debugging](./systematic-debugging/SKILL.md) | Four-phase debugging methodology with root cause analysis |
| [testing-patterns](./testing-patterns/SKILL.md) | Jest testing patterns, factory functions, mocking strategies, TDD workflow |

## Skill Combinations for Common Tasks

### Debugging an Issue
1. **systematic-debugging** - Root cause analysis first
2. **testing-patterns** - Write failing test that reproduces the bug
3. Fix the root cause
4. Verify test passes

### Writing New Tests
1. **testing-patterns** - TDD workflow, factory pattern
2. Write failing test first
3. Implement minimal code to pass
4. Refactor after green

### Fixing a Test Failure
1. **systematic-debugging** - Investigate why the test fails
2. **testing-patterns** - Understand test patterns and assertions
3. Trace to root cause
4. Fix and verify

## How Skills Work

Skills are automatically invoked when Claude recognizes relevant context. Each skill provides:

- **When to Use** - Trigger conditions
- **Core Patterns** - Best practices and examples
- **Anti-Patterns** - What to avoid
- **Integration** - How skills connect

## Adding New Skills

1. Create directory: `.claude/skills/skill-name/`
2. Add `SKILL.md` (case-sensitive) with YAML frontmatter:
   ```yaml
   ---
   name: skill-name              # Lowercase, hyphens, max 64 chars
   description: What it does and when to use it. Include trigger keywords.
   ---
   ```
3. Include standard sections: Core Patterns, Anti-Patterns, Integration
4. Add to this README

**Important:** The `description` field is critical—Claude uses semantic matching on it to decide when to apply the skill. Include keywords users would naturally mention.

## Maintenance

- Update skills when patterns change
- Remove outdated information
- Add new patterns as they emerge
- Keep examples current with codebase

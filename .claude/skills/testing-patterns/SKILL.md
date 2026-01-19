---
name: testing-patterns
description: Jest testing patterns, factory functions, mocking strategies, and TDD workflow. Use when writing unit tests, creating test factories, or following TDD red-green-refactor cycle.
---

# Testing Patterns and Utilities

## Testing Philosophy

**Test-Driven Development (TDD):**
- Write failing test FIRST
- Implement minimal code to pass
- Refactor after green
- Never write production code without a failing test

**Behavior-Driven Testing:**
- Test behavior, not implementation
- Focus on public APIs and business requirements
- Avoid testing implementation details
- Use descriptive test names that describe behavior

**Factory Pattern:**
- Create `getMockX(overrides?: Partial<X>)` functions
- Provide sensible defaults
- Allow overriding specific properties
- Keep tests DRY and maintainable

## Factory Pattern

### Data Factory

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

const getMockUser = (overrides?: Partial<User>): User => {
  return {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    ...overrides,
  };
};

// Usage
it('should display admin badge for admin users', () => {
  const user = getMockUser({ role: 'admin' });
  // test with user...
});
```

### Props Factory

```typescript
import { ComponentProps } from 'react';

const getMockMyComponentProps = (
  overrides?: Partial<ComponentProps<typeof MyComponent>>
) => {
  return {
    title: 'Default Title',
    count: 0,
    onPress: jest.fn(),
    isLoading: false,
    ...overrides,
  };
};

// Usage in tests
it('should render with custom title', () => {
  const props = getMockMyComponentProps({ title: 'Custom Title' });
  // render and test...
});
```

## Mocking Patterns

### Mocking Modules

```typescript
// Mock entire module
jest.mock('utils/analytics');

// Mock with factory function
jest.mock('utils/analytics', () => ({
  Analytics: {
    logEvent: jest.fn(),
  },
}));

// Access mock in test
const mockLogEvent = jest.requireMock('utils/analytics').Analytics.logEvent;
```

### Mocking Functions

```typescript
// Create mock function
const mockCallback = jest.fn();

// Mock return value
mockCallback.mockReturnValue('result');

// Mock implementation
mockCallback.mockImplementation((x) => x * 2);

// Verify calls
expect(mockCallback).toHaveBeenCalledWith('arg');
expect(mockCallback).toHaveBeenCalledTimes(1);
```

## Test Structure

```typescript
describe('ComponentName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render component with default props', () => {});
    it('should render loading state when loading', () => {});
  });

  describe('User interactions', () => {
    it('should call onPress when button is clicked', async () => {});
  });

  describe('Edge cases', () => {
    it('should handle empty data gracefully', () => {});
  });
});
```

## Assertion Patterns

```typescript
// Equality
expect(value).toBe(expected);           // Strict equality
expect(value).toEqual(expected);        // Deep equality

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeNull();
expect(value).toBeUndefined();

// Numbers
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThanOrEqual(10);

// Strings
expect(value).toMatch(/pattern/);
expect(value).toContain('substring');

// Arrays
expect(array).toContain(item);
expect(array).toHaveLength(3);

// Objects
expect(object).toHaveProperty('key');
expect(object).toMatchObject({ key: 'value' });

// Exceptions
expect(() => fn()).toThrow();
expect(() => fn()).toThrow('error message');
```

## Async Testing

```typescript
// Async/await
it('should fetch data', async () => {
  const data = await fetchData();
  expect(data).toBeDefined();
});

// Promises
it('should resolve with data', () => {
  return fetchData().then(data => {
    expect(data).toBeDefined();
  });
});

// Timers
jest.useFakeTimers();

it('should call callback after delay', () => {
  const callback = jest.fn();
  delayedCall(callback, 1000);
  
  jest.advanceTimersByTime(1000);
  
  expect(callback).toHaveBeenCalled();
});
```

## Anti-Patterns to Avoid

### Testing Mock Behavior Instead of Real Behavior

```typescript
// Bad - testing the mock
expect(mockFetchData).toHaveBeenCalled();

// Good - testing actual behavior
expect(result).toEqual(expectedData);
```

### Not Using Factories

```typescript
// Bad - duplicated, inconsistent test data
it('test 1', () => {
  const user = { id: '1', name: 'John', email: 'john@test.com', role: 'user' };
});
it('test 2', () => {
  const user = { id: '2', name: 'Jane', email: 'jane@test.com' }; // Missing role!
});

// Good - reusable factory
const user = getMockUser({ name: 'Custom Name' });
```

### Testing Implementation Details

```typescript
// Bad - testing internal state
expect(component.state.isLoading).toBe(true);

// Good - testing observable behavior
expect(screen.getByText('Loading...')).toBeTruthy();
```

## Best Practices

1. **Always use factory functions** for props and data
2. **Test behavior, not implementation**
3. **Use descriptive test names** - "should [expected behavior] when [condition]"
4. **Organize with describe blocks**
5. **Clear mocks between tests** - use `beforeEach(() => jest.clearAllMocks())`
6. **Keep tests focused** - one behavior per test
7. **Avoid test interdependence** - each test should be independent

## Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific file
npm test ComponentName.test.ts

# Run in watch mode
npm test -- --watch
```

## Integration with Other Skills

- **systematic-debugging**: Write test that reproduces bug before fixing

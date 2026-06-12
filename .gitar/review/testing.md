# Testing

- **No snapshot tests**: Snapshot testing must be avoided. Flag any `toMatchSnapshot()` or `toMatchInlineSnapshot()` usage in component tests.
- **Behavioral testing with RTL**: Tests must assert on user-visible behavior, not implementation details. Flag tests that query by component internals, CSS class names, or implementation-specific attributes.
- **Keyboard navigation coverage**: For every interactive element introduced, verify that at least one test explicitly exercises keyboard interaction (e.g., `userEvent.keyboard`, `fireEvent.keyDown`).
- **Coverage gate**: Low coverage on new code is a merge blocker. Flag new components that have no test file at all.
- **Test file location**: Tests must live in `src/components/{component-folder}/__tests__/{ComponentName}-test.tsx`.
- **Inline `setup*`/`render*` helpers**: Test files must define a local helper function (`setupFoo()` or `renderFoo()`) that wraps `render()` and returns `{ user, ...rest }`. Raw `render()` calls scattered across individual test cases are not permitted — they make tests harder to refactor and bypass the consistent `userEvent.setup()` wiring. Flag test files that call `render()` directly in `it()` blocks without a shared helper.

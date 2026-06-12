# Accessibility (a11y)

- **WCAG 2.2 AA**: Verify that interactive components expose correct roles, labels, and states. Flag missing `aria-label`, `aria-labelledby`, or `role` where semantics require them.
- **Aria attribute naming**: Aria props must match HTML attribute names in camelCase (e.g., `aria-label`, `aria-expanded`). Flag custom prop names that shadow or diverge from ARIA spec names.
- **Keyboard navigation**: All interactive elements must support standard keyboard patterns (Enter/Space to activate, Arrow keys for composite widgets, Escape to dismiss). Flag interactive components with no keyboard handler.
- **`jest-axe` in tests**: Every new component test file must include a `jest-axe` assertion (`expect(await axe(container)).toHaveNoViolations()`). Flag test files missing this check.
- **Storybook a11y**: Confirm that no a11y findings are suppressed in stories without a documented justification.

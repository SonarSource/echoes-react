# Accessibility (a11y)

- **WCAG 2.2 AA**: Verify that interactive components expose correct roles, labels, and states. Flag missing `aria-label`, `aria-labelledby`, or `role` where semantics require them.
- **Aria attribute naming**:
  - rendered DOM nodes must use spec ARIA attributes like aria-label
  - public component props must use repo conventions like ariaLabel / ariaLabelledBy
  - Flag any props that use the wrong casing or naming convention.
- **Keyboard navigation**:
  - All interactive elements must support standard keyboard patterns (Enter/Space to activate, Arrow keys for composite widgets, Escape to dismiss).
  - Require explicit keyboard handlers for custom non-semantic widgets or custom composite behavior
  - Do not require local handlers when native elements or Radix already provide the behavior
- **`jest-axe` in tests**: Every new component test file must include a `jest-axe` assertion (`expect(await axe(container)).toHaveNoViolations()`). Flag test files missing this check.
- **Storybook a11y**: Confirm that no a11y findings are suppressed in stories without a documented justification.

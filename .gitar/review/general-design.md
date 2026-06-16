# General design issues

## Duplication (DRY)

- Same 3+ lines of logic appearing in 3 or more files? Flag it. Two-file duplication is often coincidental — don't extract unless the intent is clearly the same.
- Two components or hooks structurally identical (same props, same state, same render logic)?
- A constant defined in one place but hardcoded as a literal elsewhere?

## Missing or better abstractions

- A `switch` / `if` chain on the same discriminator repeated across multiple components? Consider a lookup map or config object.
- Multiple styled components sharing identical CSS blocks that could be expressed as a shared base or CSS custom-property pattern.
- Trace "what files need to change to add the next variant or size". More than two is a signal to redesign.

## SOLID

- **S**: A component mixing unrelated concerns (data, presentation, styling logic all in one)?
- **O**: Adding a new variety or size — does it require modifying core component logic or just extending a map/enum?
- **D**: Logic tightly coupled to a specific variant rather than driven by props or config objects?

- Read @README.md every time you start.
- Read @package.json every time you start.

# About this project

Echoes React is a React component library implementing the Echoes design system for Sonar products. It is published as `@sonarsource/echoes-react` and consumed by downstream apps (SonarQube, SonarCloud). Changes here are public API changes — treat breaking changes with care.

# Design philosophy

- **Developer experience first**: Product developers must be able to rely on this library fully. APIs should be straightforward and easy to configure — if a component is hard to use, that is a design flaw.
- **One component, one use case**: Each component must serve a single, well-defined purpose. Avoid multi-purpose components with diverging code paths.
- **Design fidelity is non-negotiable**: Components must not visually or behaviourally differ from their Figma counterparts. Keep components in sync with the Design System — both UX designers and developers share responsibility for this.
- **Favour existing standards over custom solutions**: When adding interactive behaviour, prefer established external libraries that follow industry standards over bespoke implementations. Any new dependency must have a compatible license and allow sufficient customisation to meet the agreed-upon design.
- **Delivery over perfection**: The vision is a direction, not a gate. Incremental improvements are better than blocking delivery waiting for the ideal solution.

# Important skills

- `echoes-review` — review changes on the current branch or a PR for naming violations, a11y gaps, design-token misuse, missing exports, and architectural issues. Run before opening a PR.

Load skills only when the task actually requires them — do not load them at startup.

# Testing, linting, and running tools

```sh
yarn jest                          # run all unit tests
yarn jest src/components/Foo       # run tests for a specific component
yarn test-ci                       # full test run with coverage
yarn build                         # compile the library (dist/)
yarn ts-check                      # type check the library
yarn lint                          # lint the library
yarn format                        # auto-format with Prettier
```

- Never attempt to fix linting issues until you believe the implementation is correct.
- When adding new dependencies to `package.json`, always add a corresponding entry in `package.json.md`.
- **MANDATORY**: Run `yarn prettier --write <file>` after finishing editing files, do it in bulk.
- **MANDATORY**: Fix all TypeScript errors before declaring a task done — `yarn ts-check` will surface them.

# Writing code

- Keep things DRY. Reorganize if necessary before duplicating logic.
- Always prefer `export { ComponentName }` over `export default ComponentName` — prevents renaming at import.
- Use function declarations for components, not `const`.
- All new components must be functional components — no class components.

@.gitar/review/naming-and-api.md

@.gitar/review/component-patterns.md

@.gitar/review/folder-and-exports.md

@.gitar/review/radix-ui.md

@.gitar/review/design-tokens.md

@.gitar/review/accessibility.md

@.gitar/review/testing.md

@.gitar/review/localization.md

@.gitar/review/stories-and-figma.md

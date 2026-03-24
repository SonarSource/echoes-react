# Package.json: understanding our dependencies

## peerDependencies

- react : Core runtime required by all Echoes React components.
- react-dom : Required for DOM rendering and portals used by some components.
- react-intl : Required for components relying on internationalization.
- react-router-dom : Required by components integrating with routing/navigation context.
- @emotion/react : Required styling runtime for Emotion-based components.
- @emotion/styled : Required for Emotion styled-component APIs used in the library.

## Dependencies

- @mantine/core : Used as a base for some components (Select, MultiSelect). We maintain a patch to add `withExpandedAttribute` on `Combobox.Target` in Select so the trigger exposes the expected `aria-expanded` state for accessibility and tests.
- @mantine/hooks : Used with `@mantine/core` as a base for some components (Select, MultiSelect).
- Sonner : Used as the base component for Toast notifications
- @radix-ui/react-radio-group (patch): Replaces an internal callback-ref + `useState` pattern with `useRef` to avoid ref-driven render loops (notably with React 19) that can cause maximum update depth errors.

## DevDependencies

- @testing-library/react : Used for component and interaction testing. It should stay aligned with our React major version.

- @emotion/cache : Used by Emotion/Mantine styling internals.
- @emotion/serialize : Used by Emotion style serialization internals.
- @emotion/utils : Used by Emotion runtime/style utilities.

## Resolutions

- @radix-ui/react-compose-refs (patch): Prevents forwarding `null` to function refs. This avoids repeated ref teardown/setup feedback loops that can retrigger state updates.
- ast-types: Transitive dependency of Storybook. It is apparently incompatible with typescript 5.4+, but we've never been impacted (why?). With the bump to storybook 9, it requires a patch not to fail ts-check. See [this issue](https://github.com/benjamn/ast-types/issues/948)

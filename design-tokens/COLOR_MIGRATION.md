# Option 2 color migration

Echoes is migrating to the Website-aligned (`option-2`) palette through this dependency chain:

```text
brand primitives → light/dark semantic tokens → component tokens → components
```

## Ownership

- `brand/brand-a/palettes` and `brand/brand-b/palettes` contain independently owned copies of
  the approved primitives. Their values intentionally begin identical.
- Light and dark palettes are authored independently. Do not generate one by reversing the other.
- `modes/light.json` and `modes/dark.json` contain stable product intent.
- `component/light.json` and `component/dark.json` are the only color layer Echoes components
  should consume.
- Generated files in `src/generated` must not be edited manually.

## Color rules

- Gray supplies surfaces, borders, text, neutral controls, routine interaction, selection, and
  focus.
- Gray Alpha supplies contextual hover, pressed, and weak selected overlays.
- Blue is limited to verified AI, upgrade, upsell, pricing, and explicit feature patterns.
- Green, yellow, and red communicate success, warning, and danger with a non-color cue.
- Generic information is neutral.
- Data-visualization tokens are not general interface semantics.
- Teal, cyan, purple, magenta, and orange remain primitive-only until a reviewed component or
  data-visualization use adopts them.

## Temporary action comparison

The default mapping is `neutral-action`. Build the comparator with:

```sh
yarn build-tokens --brand=Brand-A --action-strategy=accent-action
```

Storybook exposes the same comparison in its action-strategy toolbar. This experiment is temporary:
after product testing, the winner remains in `modes/light.json` and `modes/dark.json`, and the
experiment sets, build argument, and toolbar overrides must be removed.

## Compatibility

Legacy `accent` and `emphasis` semantic tokens remain frozen during the consumer audit. They are
deprecated because their intent is ambiguous; do not use them in new component contracts. Do not
map every `emphasis` use to feature blue. In particular, ratings, severity, charts, margin
indicators, and `echoes.typography.code.highlight` require separate ownership.

## Quiet control borders

Secondary buttons and resting form controls use `color.border.default` to reduce visual noise.
Their borders strengthen to `color.border.strong` on hover, while focus, validation, selection, and
disabled states keep their dedicated component mappings.

This is an intentional visual tradeoff: the resting light border (`#C9CED6`, 1.54:1 against the
default surface) and dark border (`#474E57`, 2.31:1) do not meet the WCAG 2.2 3:1 non-text contrast
threshold. Hover borders meet 3:1, and keyboard focus remains independently visible. Do not claim
full non-text contrast conformance for resting controls without revisiting this decision.

## Neutral component surfaces

Legacy `background.neutral` aliases remain available for compatibility, but now resolve through the
website-aligned gray ramp: Gray 3 at rest, Gray 4 on hover, and Gray 5 when active. Component
contracts must not bind to the legacy blue-gray `grey.*` primitives.

Default contained surfaces remain Gray 1 so Gray Alpha interaction overlays composite onto the
authored solid ramp. Do not override the default surface to pure white at an application or
Storybook root; doing so produces in-between hover colors. Table headers use the semantic subtle
surface (Gray 3), while row hover continues to use the contextual Gray Alpha overlay.

## Validation

`validate-color-architecture.mjs` treats WCAG 2.2 AA contrast as a blocking gate and reports APCA
0.98G findings diagnostically. APCA remains non-blocking until product governance establishes it as
a release requirement; the authored Option 2 values must not be silently changed to clear a
diagnostic threshold.

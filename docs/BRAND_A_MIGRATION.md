# Brand A migration

Brand A replaces the Sonar visual language in place. Consumers continue to import
`@sonarsource/echoes-react/styles/sonar.css`; no brand-path migration is required.

This is a major visual change. Sonar now uses neutral primary actions, website-aligned light and
dark palettes, Geist, 13px small text, 6px standard control/card radii, quiet control borders, and
intent-based elevation. Blue is reserved for explicit feature, AI, upgrade, pricing, and upsell
communication. Generic information is neutral.

## Custom brands

Custom brand stylesheets must provide every property emitted by `sonar.css`. In particular, add the
new semantic and component families before upgrading:

- `color-feature`, `color-status`, `color-interaction`, `color-selection`, and `color-data-viz`;
- `shadow-*` intent roles;
- button, link, input, checkbox, radio-button, navigation, table/issue-row, message, badge, card,
  promotion, select, dropdown, and overlay contracts.

Existing `accent`, `emphasis`, Highlight, numeric `box-shadow-*`, and broad semantic properties are
retained for compatibility. They are not aliases for the narrower feature intent and should not be
used for new component work.

## Fonts

`sonar.css` loads the bundled Geist 1.7.2 variable font without a network request. Applications no
longer need to provide Inter for Echoes components. Ubuntu Mono remains consumer-provided when the
preferred code font is required.

The Gitar brand retains the resolved values of all properties that existed before this migration.

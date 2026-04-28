# Design Tokens

This package defines and builds the design tokens for Echoes. It supports multiple brands and multiple color modes (light/dark) through a three-layer token architecture.

## Architecture

Tokens are organized in three layers, each building on the one below it:

```
brand/          ← Layer 1: Primitives (raw values, brand-specific)
mode/           ← Layer 2: Semantic (maps primitives to roles and intent)
component/      ← Layer 3: Component (maps semantic tokens to component slots)
```

### Layer 1 — Brand (`tokens/brand/`)

Contains raw, brand-specific values. Each brand lives in its own folder:

```
brand/
  brandA/
    base.json     # Dimensions, spacing, typography, border radius
    colors.json   # Color palette + color roles
  brandB/
    base.json
    colors.json
```

Each `colors.json` has two subgroups:

**`palette`** — the raw color scales for this brand. These are private to the brand layer and should not be referenced directly from mode or component tokens.

```jsonc
"palette": {
  "grey":       { "50": "#...", "100": "#...", ... "900": "#..." },
  "indigo":     { ... },  // brand primary color family
  "tangerine":  { ... },  // brand secondary color family
  "green":      { ... },  // shared sentiment colors
  "yellow":     { ... },
  "orange":     { ... },
  "red":        { ... },
  "blue":       { ... },
  "purple":     { ... }
}
```

**`roles`** — semantic color roles that map palette shades to named steps. These are the tokens that higher layers consume.

```jsonc
"roles": {
  "support":   { "black", "white", "transparent" },
  "neutral":   { "lightest", "light", "medium", "strong", "bold", "dark" },
  "primary":   { "lightest", "light", "medium", "strong", "bold", "dark" },
  "secondary": { "lightest", "light", "medium", "strong", "bold", "dark" },
  "info":      { ... },
  "success":   { ... },
  "warning":   { ... },
  "danger":    { ... },
  "highlight": { ... }
}
```

The step names go from lightest to darkest and map to the underlying palette like this:

| Step       | Approx. palette shade |
|------------|----------------------|
| `lightest` | 50                   |
| `light`    | 100                  |
| `medium`   | 300                  |
| `strong`   | 500                  |
| `bold`     | 700                  |
| `dark`     | 900                  |

`primary` and `secondary` reference the brand-specific palette families (`indigo` and `tangerine`). All other roles reference shared palette families and are identical across brands.

### Layer 2 — Mode (`tokens/mode/`)

Contains semantic color tokens that describe intent, not appearance. These tokens reference **role tokens** from the brand layer, never palette tokens directly.

```
mode/
  light.json   # Semantic tokens for light mode
  dark.json    # Semantic tokens for dark mode
```

Example:
```jsonc
"background": {
  "accent": {
    "default": { "$value": "{echoes.color.roles.primary.strong}" }
  }
}
```

Because mode tokens reference roles (not palette shades), swapping a brand automatically changes the resolved color — no edits to mode files required.

### Layer 3 — Component (`tokens/component/`)

Maps semantic mode tokens to component-specific slots. These tokens are the ones consumed by component CSS.

```
component/
  base.json    # Non-color component tokens (shared across modes)
  light.json   # Light mode component token overrides
  dark.json    # Dark mode component token overrides
```

---

## Theme Configuration (`$themes.json`)

Tokens Studio themes define which token sets are active for each combination of brand and mode. There are three groups:

| Group   | Themes          | Purpose                                     |
|---------|-----------------|---------------------------------------------|
| `Brand` | brandA, BrandB  | Selects the active brand primitives          |
| `Modes` | light, dark     | Selects the active mode, using brandA colors |
| `Sonar` | base            | Non-color base tokens, used at all times     |

Each `Modes` theme includes the brand primitive sets as `"source"` so that role references resolve correctly at build time.

---

## Adding a New Brand

1. Copy `tokens/brand/brandA/` to `tokens/brand/brandC/`
2. Update `colors.json`:
   - Replace `palette.indigo.*` values with the new brand's primary color scale
   - Replace `palette.tangerine.*` values with the new brand's secondary color scale
   - The `roles` section requires no changes — it references palette by name
3. Add `brand/brandC/base` and `brand/brandC/colors` entries to `$metadata.json`
4. Add a new `Brand` group entry to `$themes.json` for the new brand
5. No changes to `mode/` or `component/` files are needed

---

## Build

```sh
node build.js
```

Output is written to `src/generated/`:

| File                            | Contents                                      |
|---------------------------------|-----------------------------------------------|
| `design-tokens-base.css`        | Non-color CSS custom properties (`:root`)     |
| `design-tokens-light.css`       | Light mode color CSS custom properties        |
| `design-tokens-dark.css`        | Dark mode color CSS custom properties         |
| `design-tokens.css`             | Root file importing all of the above          |
| `design-tokens-base.json`       | Non-color tokens as flat JSON                 |
| `design-tokens-themed.json`     | Light mode color tokens as flat JSON          |
| `themes.ts`                     | `Theme` enum with all available theme names   |
| `tailwindConfig.js`             | Spacing, width and height tokens as a Tailwind preset |

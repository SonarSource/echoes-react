# ADR 001 — Multi-Brand Design Token Architecture

**Date:** 2026-04-16
**Status:** Accepted
**Branch:** `marcio/revamp-tokens`

---

## Context

The original token architecture was designed for a single brand and a flat structure. Token sets were named `layer1`, `layer2`, `layer3` and were organized around the build pipeline rather than semantic meaning. As the need to support multiple brands (brandA, brandB) emerged, this structure created several problems:

- No clear separation between brand-specific values and shared semantic values
- Color palette tokens were referenced directly from semantic and component tokens, making brand swapping impossible without editing every downstream file
- The flat naming gave no guidance to contributors about where to add new tokens or what each layer was responsible for
- The `$themes.json` group name (`Themes`) was mismatched with the `build.js` filter (`group === 'Themes'`), which silently produced no themed output

---

## Decision

Rename and restructure the token layers around semantic responsibility rather than build order:

```
layer1/ → brand/        (primitives, brand-owned)
layer2/ → mode/         (semantic, shared)
layer3/ → component/    (component slots, shared)
```

Introduce a **palette / roles split** inside each brand's `colors.json`:

- **`palette`** holds raw color scales (50–900). It is private to the brand layer.
- **`roles`** holds named semantic steps (`lightest → light → medium → strong → bold → dark`) that map palette shades to intent. These are the values all upstream layers consume.

Mode files (`mode/light.json`, `mode/dark.json`) reference `roles.*` tokens, never `palette.*` tokens directly.

---

## Color Role Inventory

Each brand defines the following roles:

| Role        | Brand-specific? | Source palette    |
|-------------|-----------------|-------------------|
| `support`   | No              | Hardcoded black/white/transparent |
| `neutral`   | No              | `grey`            |
| `primary`   | **Yes**         | `indigo`          |
| `secondary` | **Yes**         | `tangerine`       |
| `info`      | No              | `blue`            |
| `success`   | No              | `green`           |
| `warning`   | No              | `yellow`          |
| `danger`    | No              | `red`             |
| `highlight` | No              | `purple`          |

Only `primary` and `secondary` differ between brands. All other roles resolve to the same hex values regardless of which brand is active.

---

## Consequences

**Positive:**

- Adding a new brand requires changes only in `brand/brandX/colors.json`. No mode or component tokens need to be updated.
- The step names (`lightest → dark`) communicate relative luminance without tying tokens to a specific palette shade, making them stable as palettes evolve.
- The `build.js` group mismatch (`Themes` vs `Modes`) was caught and fixed as part of this work, restoring correct themed CSS output.
- The architecture is self-documenting: a contributor looking at a mode token immediately knows it references a role, and a contributor looking at a role immediately knows which palette family backs it.

**Negative / Trade-offs:**

- Adding an additional indirection layer (palette → roles → semantic) means resolving a final CSS value requires following two hops instead of one.
- The palette shades used in the mode files before this change were granular (50, 100, 200, 300 ...). The roles layer collapses these to 6 steps. Some precision is intentionally lost — hover/active state distinctions that were previously encoded as adjacent palette shades now both resolve to the same role step. These interactions may need to be revisited if visual fidelity requires more granularity.
- The `mode/` files still hardcode `brandA` as the source in `$themes.json`. Multi-brand mode switching (e.g., brandB + dark mode) requires a follow-up theme configuration entry.

---

## Alternatives Considered

**Keep palette references in mode files, swap palettes per brand**
Rejected. Requires maintaining a full copy of every mode file per brand, or complex conditional logic in the build script.

**Single shared palette with CSS overrides at the brand level**
Rejected. Conflates the brand color system with CSS specificity concerns and doesn't model cleanly in Tokens Studio.

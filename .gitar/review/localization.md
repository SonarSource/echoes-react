# Localization (l10n)

- **English fallback**: Any user-visible string must have a default English value. Flag hardcoded non-English strings or strings with no default.
- **`label`-prefixed overrideable props**: All user-visible labels must be overrideable via props prefixed with `label` (e.g., `labelClose`, `labelConfirm`). Flag components with hardcoded non-overrideable strings.
- **No translation helpers**: Echoes is a library — it must not import or depend on app-level translation systems (`translate`). Flag any such imports.

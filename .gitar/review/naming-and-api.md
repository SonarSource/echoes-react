# Naming & API conventions

- **Component files**: Component names and their `.tsx` files must use PascalCase. Flag any snake_case or kebab-case component file names.
- **Folder names**: Must be kebab-case. Flag any PascalCase or camelCase folder names under `src/components/`.
- **Boolean props**: Must be prefixed with `is`, `has`, `enable`, or `disable`, and must default to `false`. Flag booleans like `disabled={true}` as default, or props named `active` / `open` without the prefix.
- **Event handler props**: Must start with `on` (e.g., `onClick`, `onValueChange`). Flag handlers named `handle*`, `click*`, or similar.
- **Internal sub-components**: Sub-components within a folder must be prefixed with the parent component name (e.g., `SelectOption`, not just `Option`) to avoid collisions and keep them grouped in search results.
- **Predictability**: Prop names should be obvious and consistent with existing Echoes components. Flag novel naming when a standard equivalent exists in the library (e.g., using `type` where similar components use `variety`).
- **Props interface ordering**: Props must follow this order — required/semantic props first, then boolean flags (`is*`/`has*`/`enable*`/`disable*`), then callbacks (`on*`), then layout/style props (`className` last). Flag interfaces that mix callbacks before flags or put semantic props at the end.
- **TSDoc on every public prop**: Every field in a public props interface must have a `/** */` doc comment. Optional props that have a default value must document it with `@defaultValue`. Enum members must also be individually documented. Flag any undocumented public prop or enum member.
- **Union types for mutually exclusive props**: Props that are mutually exclusive (e.g., `ariaLabel` vs `ariaLabelledBy`, controlled vs uncontrolled open state) must be expressed as a TypeScript union type (`PropsA | PropsB`) rather than making both optional and relying on runtime checks. Flag components where two props are documented as "use one or the other" but the interface permits both simultaneously.

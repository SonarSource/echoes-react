# Folder & export architecture

- **Folder placement**: New components must live in a new `src/components/{kebab-case-name}/` folder or an existing matching feature/family folder. Flag components landing directly in `src/components/` without their own folder.
- **Named exports only**: Default exports must be rejected. Every symbol — component, enum, props type — must use a named export.
- **`index.ts` wiring**: The component's folder `index.ts` must export: the component itself, all enums, and the props type — all as named exports. The top-level `src/components/index.ts` must also be updated. Flag any component that is implemented but not re-exported at both levels, and flag any props interface that is exported from the component file but missing from the public barrel.
- **Logic separation**: Complex components should be split into internal sub-components within the same folder. Flag monolithic components that exceed ~150 lines and handle multiple distinct concerns inline.

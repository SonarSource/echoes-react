# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**echoes-react** is SonarSource's Design System implemented as a React component library. It's published as `@sonarsource/echoes-react` and provides reusable UI components for SonarSource products.

### Vision & Principles

- **Developer Experience First**: All decisions prioritize ease of use for consuming developers
- **Building Blocks Philosophy**: Components act as building blocks with one use case per component and straightforward APIs
- **Brand Consistency**: Ensure strong UX and brand consistency between products
- **Reliability**: Components must be tested, accessible, and technically validated

## Development Commands

### Core Development

- `yarn dev` - Start development with build watcher and Storybook
- `yarn storybook` - Run Storybook server only (port 6006)
- `yarn build` - Build the library for production

### Testing & Validation

- `yarn jest` - Run tests (use for single test runs)
- `yarn test-ci` - Run tests with coverage for CI (outputs to build-reports/)
- `yarn test` - Run full test suite with coverage and code quality validation, usually too slow for interactive use

### Code Quality

- `yarn ts-check` - TypeScript compilation check (no emit)
- `yarn lint` - ESLint with SonarQube rules
- `yarn format` - Format code with Prettier
- `yarn format-check` - Check code formatting
- `yarn validate` - Run TypeScript check, format check, and linting

### Generated Content

- `yarn build-tokens` - Generate design tokens from Figma tokens (required after token changes)
- `yarn build-fonts` - Generate optimized icon font subset (required after adding new icons)
- `yarn build-intl-keys` - Generate i18n keys file for consumers (required after adding new translations)

## Architecture

### Key Directories

- `src/components/` - All React components organized by feature (badges, buttons, form, icons, etc.)
- `src/generated/` - Generated files (design tokens, fonts, themes) - do not edit directly
- `design-tokens/` - Raw design tokens from Figma, transformed via Style Dictionary
- `stories/` - Storybook documentation matching component structure
- `config/` - Build scripts, validation, and tooling configuration

### Component Organization

Components follow a consistent pattern based on team strategies:

**File Structure:**

- `src/components/[component-name]/ComponentName.tsx` - Main component (PascalCase)
- `src/components/[component-name]/index.ts` - Named exports (no default exports)
- `src/components/[component-name]/__tests__/` - Tests with `.test.tsx` extension
- `stories/[component-name]/` - Storybook stories matching component structure

**Naming Conventions:**

- Component names: PascalCase matching Figma component names exactly
- Folder names: kebab-case
- Variants: `[Archetype][Variant]` structure (e.g., `ButtonPrimary`, `LinkDiscreet`)
- Internal components: Always prefixed with main component name
- Exported components appear first in folders due to naming

### Build System & Styling Strategy

- **Vite** with TypeScript for building ES modules
- **Emotion** for CSS-in-JS styling (required, no Tailwind or twin-macro)
- **Design Tokens First**: All styling must use design tokens via CSS variables
- **Style Dictionary**: Transforms Figma tokens to CSS variables (3-layer system)
- **Radix UI** primitives for proven accessibility
- **Yarn PnP** for package management (requires Node.js ≥20.13)

### Path Aliases

- `~common/*` → `src/common/*`
- `~generated/*` → `src/generated/*`
- `~utils/*` → `src/utils/*`
- `~types/*` → `src/types/*`

## Development Workflow

### After Adding New Icons

Run `yarn build-fonts` to regenerate the optimized font subset.

### After Design Token Changes

Run `yarn build-tokens` to transform Figma tokens to CSS variables.

### After Adding Translations

Run `yarn build-intl-keys` to update the keys file for consumers.

### Before Committing

Always run `yarn validate` to ensure TypeScript, formatting, and linting pass.

## Testing Strategy

**Framework & Tools:**

- Jest with React Testing Library (RTL) for screen reader compatibility
- jsdom environment with jest-axe for accessibility testing
- Test files use `.test.tsx` extension in `__tests__/` directories

**Testing Requirements:**

- Focus on component behavior over snapshots
- Test keyboard navigation for all interactive elements
- Include accessibility testing with jest-axe
- Coverage thresholds enforced via CI
- All components must have comprehensive tests

**Best Practices:**

- Test user interactions, not implementation details
- Verify proper ARIA attributes and semantics
- Test all component variants and states

## Accessibility (a11y) Requirements

**WCAG 2.2 AA Compliance** - All components must meet AA level standards:

- **Keyboard Navigation**: Follow WAI-ARIA standards for all interactive elements
- **Screen Reader Support**: Proper HTML semantics and ARIA attributes
- **Required Props**: Any prop necessary for accessibility must be required
- **Testing**: jest-axe validation in unit tests, Storybook a11y addon enabled

## Component Development Guidelines

### Design Principles

**Core Philosophy:**

- **Developer Experience First**: Always prioritize making components as easy as possible to use
- **One Component, One Use Case**: Each component answers exactly one use case
- **Minimal API Surface**: Restrict APIs to bare minimum to avoid over-customization
- **Predictable Naming**: Component and prop names should be easy to guess
- **Design-Code Alignment**: Names must match between Figma and code implementation

**Component vs Props Decision Framework:**

- **Create Multiple Components When**: Each variant represents a different use case
- **Use Props When**: Variation relates to context/status (e.g., `isDisabled` for input status)
- **Required vs Optional**: Accessibility-related props must be required

**Props Naming Conventions:**

- **Boolean props**: Prefix with `is`, `has`, `enable` or `disable` (default to `false`)
- **Initialization props**: Prefix with `init` (for uncontrolled component initial state)
- **Translated labels**: Prefix with `label` (enables IDE autocompletion)
- **Accessibility props**: camelCase ARIA attributes, suffix with context if needed
- **Event handlers**: Prefix with `on` (e.g., `onClick`, `onChange`, `onDelete`)

**Anti-Patterns to Avoid:**

- Don't create components with same appearance but different use cases
- Links should trigger navigation and look like links
- Buttons should perform actions and look like buttons
- Components must have predictable behavior matching their appearance

### Styling Requirements

- **Design Tokens Only**: All styling must use design tokens via CSS variables
- **No Direct Values**: Never use hardcoded colors, spacing, or typography values
- **Three-Layer Token System**:
  - Layer 1 (Global): Primitive values (internal to design system)
  - Layer 2 (Aliases): Semantic meaning (recommended for products)
  - Layer 3 (Component): Component-specific tokens (internal)

### Localization Support

- **react-intl Integration**: Use context with English fallbacks
- **Generic Defaults**: Provide generic English text that can be overridden
- **Label Props**: Prefix translated labels with `label`
- **Contextual Overrides**: Allow text overrides for specific contexts

## Peer Dependencies

Components require these peer dependencies in consuming applications:

- React 18+, react-dom
- @emotion/react, @emotion/styled
- react-intl (for i18n)
- react-router-dom (for routing components)

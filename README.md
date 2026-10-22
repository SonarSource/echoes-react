# echoes-react

[![Build Status](https://github.com/SonarSource/echoes-react/actions/workflows/build.yml/badge.svg)](https://github.com/SonarSource/echoes-react/actions/workflows/build.yml)
[![Releasability status](https://github.com/SonarSource/echoes-react/actions/workflows/releasability.yml/badge.svg)](https://github.com/SonarSource/echoes-react/actions/workflows/releasability.yml)
[![Quality Gate Status](https://next.sonarqube.com/sonarqube/api/project_badges/measure?project=SonarSource_echoes-react&metric=alert_status&token=sqb_ced4ef7f562917d10af6bb2e9f1649c62a882ff9)](https://next.sonarqube.com/sonarqube/dashboard?id=SonarSource_echoes-react)

A React implementation of Echoes, Sonar's Design System.

## Installation

### Requirements

This library can be installed with **npm** or **Yarn**.

### Install the library

```bash
npm install @sonarsource/echoes-react
# or
yarn add @sonarsource/echoes-react
```

### Install peer dependencies

Echoes React has several peer dependencies that must be installed in your project:

```bash
npm install @emotion/react @emotion/styled react-intl
# or
yarn add @emotion/react @emotion/styled react-intl
```

These dependencies are required for:

- **@emotion/react & @emotion/styled**: CSS-in-JS styling
- **react-intl**: Internationalization support

## Usage

### Providers

Make sure to setup the following Providers at the root of your app:

#### Echoes Provider

The `EchoesProvider` is required to provide theming and configuration context for all Echoes components.

#### Intl Provider

The `IntlProvider` from `react-intl` is necessary for translations. See [this page](https://formatjs.github.io/docs/react-intl/components#intlprovider) for more information.
The [i18n keys file](i18n/keys.json) contains the list of keys that should be translated and provided by your `IntlProvider`.
Make sure to have the `IntlProvider` wrapping the `EchoesProvider`.

#### CSS variables

Import the Sonar brand CSS once (`@sonarsource/echoes-react/styles/sonar.css`), typically in the module that renders the providers.

To use custom brand values, create your own CSS file instead of importing the default one. Use `sonar.css` as a template: it must define the same CSS custom properties under the same selectors (`:root` for base tokens, `[data-echoes-theme='light']` and `[data-echoes-theme='dark']` for themed tokens), otherwise theme switching will not work.

#### Fonts

The Sonar New brand CSS (`@sonarsource/echoes-react/styles/sonar-new.css`) bundles the Geist 1.7.2
variable sans and monospace fonts locally and loads them automatically. No network font request is
required. Both fonts are distributed under the SIL Open Font License 1.1. Optical sizing is enabled
globally for variable Geist.

Other brands' CSS may use fonts that are not bundled (e.g. Sonar uses `Inter` and `Ubuntu Mono`).
The consuming application is responsible for loading those fonts; importing those brands' CSS does
not load the fonts.

If your application uses Google Fonts, add the following links to the HTML `<head>` of each entry point that uses the Sonar brand:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&amp;family=Ubuntu+Mono:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap" />
```

Using a stylesheet link in the HTML lets the browser discover the fonts earlier than a CSS `@import`. Combine the font families in one stylesheet request and remove any corresponding font `@import` rules from your application CSS. The preconnects prepare connections to the stylesheet and font-file origins; the font-file origin requires `crossorigin`.

The example includes Inter weights 100–900 and Ubuntu Mono regular, bold, and their italic variants. Request only the families, weights, and styles your application needs, while preserving the character coverage required by its supported languages. Load fonts used only by a specific page or layout there instead of adding them to every entry point.

Use `display=swap` for all Google Fonts families so text can render with a fallback while fonts download. Suitable fallback fonts are defined in Echoes font stacks, including monospace fallbacks for code. You can check rendering with slow or blocked font requests.

If you cannot use Google Fonts, define the fonts with `@font-face` and serve the `.woff2` files yourself (e.g. as static assets):

```css
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100;
  font-display: swap;
  src: url('../fonts/Inter/Inter-Thin.woff2') format('woff2');
}
```

Define a face for each weight and style you use, keeping `font-display: swap`. The path above is an example; use the location of your application's font assets.

If the fonts are unavailable, text uses the fallback fonts from the font stack or the browser and OS defaults.

#### Router adapter

Echoes does not depend on any router. Links, buttons with a `to`, breadcrumbs, dropdown menu links and navigation components use the router adapter you pass to the required `router` prop of `EchoesProvider`.

An adapter is an object with two members:

- `Link`: a component that renders an anchor and performs client-side navigation. It receives `to`, `state`, `reloadDocument`, `ref` and the regular anchor attributes.
- `usePathname`: a hook returning the current pathname, without basename, search or hash. Echoes uses it to highlight the active navigation items.

Define the adapter once at module scope so its reference stays stable. If the adapter relies on router hooks, `EchoesProvider` must be rendered inside your router.

With **react-router-dom**:

```tsx
import { Link, useLocation } from 'react-router-dom';
import type { EchoesRouter } from '@sonarsource/echoes-react';

export const reactRouterAdapter: EchoesRouter = {
  Link,
  usePathname: () => useLocation().pathname,
};
```

With **Next.js** (app router):

```tsx
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { toHref } from '@sonarsource/echoes-react';
import type { EchoesRouter, EchoesRouterLinkProps } from '@sonarsource/echoes-react';

function Link({ reloadDocument, state, to, ...props }: EchoesRouterLinkProps) {
  // `toHref` serializes `to` and normalizes the `?` / `#` prefixes of `search` and `hash`.
  const href = toHref(to);

  return reloadDocument ? <a href={href} {...props} /> : <NextLink href={href} {...props} />;
}

export const nextRouterAdapter: EchoesRouter = { Link, usePathname };
```

Pass `router={null}` if your app has no client-side router: links render plain anchors, every navigation is a full page load, and the active route is read from `window.location`.

Active navigation items are detected automatically only for absolute destinations (`/path` or `{ pathname: '/path' }`). For relative or search-only destinations, pass `isActive` explicitly.

#### Stacking Context

In order to have tooltips and other overlay components appear above the rest of the UI, it is probably necessary to have a [Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context) for your app. This means the root app component should define a new one, or be wrapped in a component that does it.

The easiest way to start a new Stacking Context is to provide your app root with the following CSS properties:

```css
isolation: isolate;
position: relative;
```

#### Complete Setup Example

```tsx
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { EchoesProvider } from '@sonarsource/echoes-react';
import '@sonarsource/echoes-react/styles/sonar.css'; // Import the sonar brand or include your own!
import { reactRouterAdapter } from './reactRouterAdapter';

function App() {
  return (
    <IntlProvider locale="en" messages={messages}>
      <BrowserRouter>
        <EchoesProvider router={reactRouterAdapter}>
          <div className="app-root" style={{ isolation: 'isolate', position: 'relative' }}>
            <YourAppRoot />
          </div>
        </EchoesProvider>
      </BrowserRouter>
    </IntlProvider>
  );
}
```

### Use components

```ts
import { Checkbox } from '@sonarsource/echoes-react';
```

See available components and usage in storybook: <https://echoes-react.netlify.app/>

### Testing with Echoes components in your app

#### Rendering components

To render app components that use Echoes components internally you need to make sure your test render function also provides the necessary context providers detailed in the [Providers](#providers) section above.
You can also configure the `EchoesProvider` with `tooltipsDelayDuration={0}` to disable the tooltip delay during tests, which can help avoid flaky tests due to tooltips not appearing on time.

#### Jest

The lib only provides an ES module bundle. If you use Jest for your tests (or a similar library) make sure your transform preprocessor goes through `@sonarsource/echoes-react` to make it runnable on Node.js.
You can do that by adding an exception in your `transformIgnorePatterns`, for example:

```js
transformIgnorePatterns: [`/node_modules/(?!@sonarsource/echoes-react)`],
```

## Contributing

### VSCode Configuration

We recommend VSCode to work on this project.
There is a `.vscode` folder containing:

- A list of recommended extensions
  - Install them through the marketplace
- A template for necessary (and recommended) settings: `settings.template.json`
  - Copy it and save it as `settings.json`
  - You must open the project directly. Adding its folder in an existing workspace might not work, as the typescript configuration must be defined at workspace level.

### Run storybook

Use the following command to run both the build watcher and the storybook server in `dev` mode:

```bash
yarn dev
```

### Tests

To run tests, use the following command:

```bash
yarn jest
```

### Build

To build the lib, use the following command:

```bash
yarn build
```

### Generated files

The lib is built on top of some generated files like the design-tokens or the icons fonts. These generated files are versioned in the `src/generated` and `i18n` folders.

#### Generated Icons font

We generated an optimized version of the material-symbold-rounded font that we use for our icons. The whole font contains thousands of icons and weighs more than 4Mb, so we generate a subset of it containing only the icons we use in the design system, reducing its size to a few Kb.

If you add new icons you must run the following command to generate the new optimized font:

```bash
yarn build-fonts
```

#### Generated Design Tokens

Our raw design tokens files that are created on Figma are stored inside the `design-tokens/tokens` folder. We can't use these tokens as is, so we transform them using `style-dictionary` to css variable format and store them in the `src/generated` folder. We also generate a few other files to help us with typings.

There can be multiple _brands_ representing the first layer of tokens. All brands are built automatically.

If new design tokens are added to the raw Figma file, we must run the following command to generate the new design tokens css variables for all brands:

```bash
yarn build-tokens
```

#### Generated i18n keys file

We use the `react-intl` library for internationalization. We store our translations in the `i18n/keys.json` file. This file is generated based on all the translation keys contained in our components. This file is mainly useful for the products that use the lib to know what keys they should translate.

If you add new translation keys, you must run the following command to generate the new `i18n/keys.json` file:

```bash
yarn build-intl-keys
```

### Releasing

[Release process](docs/RELEASING.md)

## Troubleshooting

### Common Issues

#### "Cannot resolve module" errors with Vite/Webpack

Make sure all peer dependencies are installed, see the [Installation](#installation) section above.

#### Missing component styles or functionality

Ensure you have wrapped your app with all required providers in the correct order and configured a proper stacking context, see [Providers](#providers) section above.

#### Tooltips not appearing above other UI elements

If tooltips or other overlay components don't appear correctly, ensure you have configured a stacking context, see [Providers](#providers) section above.

#### Router context errors

If your router adapter relies on router hooks (like `useLocation` from `react-router-dom`), `EchoesProvider` and every Echoes link must be rendered inside your router. In tests, wrap them in a test router (e.g. `MemoryRouter`), or pass `router={null}` to `EchoesProviderForTests` to get plain anchors.

## License

Copyright 2023-2025 SonarSource.
Licensed under the [GNU Lesser General Public License, Version 3.0](http://www.gnu.org/licenses/lgpl.txt)

# echoes-react

A React implementation of Echoes, Sonar's Design System.

## Installation

```bash
yarn add @sonarsource/echoes-react
```

## Usage

### Providers

Make sure to setup the following Providers at the root of your app:

#### Intl Provider

The `IntlProvider` from `react-intl` is necessary for translations. See [this page](https://formatjs.io/docs/react-intl/components/#intlprovider) for more information.
The [i18n keys file](i18n/keys.json) contains the list of keys that should be translated.

#### Tooltip Provider

The `TooltipProvider` is required to allow the Tooltips to work.

`import { TooltipProvider } from '@sonarsource/echoes-react';` and wrap the root of your app.

### Use components

```ts
import { Checkbox } from '@sonarsource/echoes-react';
```

See available components and usage in storybook: <https://echoes-react.netlify.app/>

> **Tooltips and stacking context**
>
> If tooltips do not appear above the rest of the UI, read the jsdoc of [Tooltips](src/components/tooltip/Tooltip.tsx)

### Make it work in Jest

The lib only provides es module bundle. If you use Jest for your tests (or a similar library) make sure your transform preprocessor goes through `echoes-react` to make it runnable on Node.js.
You can do that by adding an exception in your `transformIgnorePatterns`, for example:

```js
transformIgnorePatterns: [`/node_modules/(?!@sonarsource/echoes-react)`],
```

## Local Development

### VSCode Configuration

We recommend VSCode to work on this project.
There is a `.vscode` folder containing:

- A list of recommended extensions
  - Install them through the marketplace
- A template for necessary (and recommended) settings: `settings.template.json`
  - Copy it and save it as `settings.json`
  - You must open the project directly. Adding its folder in an existing workspace might not work, as the typescript configuration must be defined at workspace level.

You should also [set up your vscode to work](https://yarnpkg.com/getting-started/editor-sdks) with the `yarn` pnp setup, using the following command: `yarn dlx @yarnpkg/sdks vscode`

### Run storybook

Use the following command to run both the build watcher and the storybook server in `dev` mode:

```bash
yarn dev
```

### Tests

To run tests, run:

```bash
yarn jest
```

### Build

To build the lib, run:

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

If new design tokens are added to the raw Figma file, we must run the following command to generate the new design tokens css variables:

```bash
yarn build-tokens
```

#### Generated i18n keys file

We use the `react-intl` library for internationalization. We store our translations in the `i18n/keys.json` file. This file is generated based on all the translation keys contained in our components. This file is mainly useful for the products that use the lib to know what keys they should translate.

If you add new translation keys, you must run the following command to generate the new `i18n/keys.json` file:

```bash
yarn build-intl-keys
```

### Deployment

[Release process definition](docs/RELEASING.md)

## License

Copyright 2023-2024 SonarSource.
Licensed under the [GNU Lesser General Public License, Version 3.0](http://www.gnu.org/licenses/lgpl.txt)

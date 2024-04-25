# echoes-react

A React implementation of Echoes, Sonar's Design System.

## Installation

```bash
yarn add @sonarsource/echoes-react
```

## Usage

Make sure to setup the `IntlProvider` from `react-intl` at the root of your app. See [this page](https://formatjs.io/docs/react-intl/components/#intlprovider) for more information.

Use components from the lib:

```ts
import { Checkbox } from '@sonarsource/echoes-react';
```

See available components and usage in storybook: https://echoes-react.netlify.app/

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
yarn test
```

### Build

To build the lib, run:

```bash
yarn build
```

### Deployment

[Release process definition](docs/RELEASING.md)

```

```

## License

Copyright 2023-2024 SonarSource.
Licensed under the [GNU Lesser General Public License, Version 3.0](http://www.gnu.org/licenses/lgpl.txt)

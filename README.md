# echoes-react

A React implementation of Echoes, Sonar's Design System.

## Local Development

### VSCode Configuration

We recommend VSCode to work on this project. There is a `.vscode` folder containing:

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


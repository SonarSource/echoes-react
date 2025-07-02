# Package.json: understanding our dependencies

## peerDependencies

## Dependencies

- @mantine/core : Used as a base some components (Select, MultiSelect), currently in v6 because v7 only supports React 18. We had to create a patch to prevent some TS error with React 18, we will be able to drop it once we upgrade to Mantine v7.
- @mantine/hooks : Used as a base some components (Select, MultiSelect), currently in v6 because v7 only supports React 18
- Sonner : Used as the base component for Toast notifications

## DevDependencies

- @testing-library/react : Used for testing, must match the version of React so we are stuck with v12 until we upgrade to React 18

- @emotion/cache : peer dependencies of Mantine v6
- @emotion/serialize : peer dependencies of Mantine v6
- @emotion/utils : peer dependencies of Mantine v6

## Resolutions

- ast-types: Transitive dependency of Storybook. It is apparently incompatible with typescript 5.4+, but we've never been impacted (why?). With the bump to storybook 9, it requires a patch not to fail ts-check. See [this issue](https://github.com/benjamn/ast-types/issues/948)

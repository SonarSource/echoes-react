# Package.json: understanding our dependencies

## peerDependencies

## Dependencies

- @mantine/core : Used as a base some components (Select, MultiSelect), currently in v6 because v7 only supports React 18. We had to create a patch to prevent some TS error with React 18, we will be able to drop it once we upgrade to Mantine v7.
- @mantine/hooks : Used as a base some components (Select, MultiSelect), currently in v6 because v7 only supports React 18

## DevDependencies

- @emotion/cache : peer dependencies of Mantine v6
- @emotion/serialize : peer dependencies of Mantine v6
- @emotion/utils : peer dependencies of Mantine v6

## Resolutions

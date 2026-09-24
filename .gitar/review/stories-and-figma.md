# Stories & Figma Connect

- **Stories file**: Every new component must have a corresponding `stories/{category}/{ComponentName}-stories.tsx` file. Flag missing story files. When an existing component gains a new prop, variety, or behaviour, the matching story must be updated or a new story added to cover it — flag changes to component files with no corresponding change to the stories file.
- **Controls coverage**: Stories must expose all meaningful props as Storybook controls. Flag stories that omit enum props from `argTypes`.

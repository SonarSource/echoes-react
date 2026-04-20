# Releasing

## Versioning

This project follows [semver](https://semver.org/).

Major and minor versions follow the versioning in the Echoes Design System. Patches may diverge.

For more details, refer to the [internal versioning strategy](https://docs.google.com/document/d/1JkzJVFBN3MPl-uBDgddICfdFf4kXPaRBa6XqaJV0F5U) (Sonar employees only)

## Release Process for Major and Minor Versions

- Create a new branch for the release and maintenance following the name convention `branch-x.y`

- [Publish a new GitHub release](https://github.com/SonarSource/echoes-react/releases/new) targeting the release branch
  - Tag version: `x.y.z-build_number`
    - find it in the `repox-main` Github check, where it says `Latest promoted build of '0.13.0-2686' from branch 'main'`
  - Release title: `@sonarsource/echoes-react - x.y.z`
  - Find the relevant Jira release from the [releases page](https://sonarsource.atlassian.net/projects/ECHOES?selectedItem=com.atlassian.jira.jira-projects-plugin%3Arelease-page) and after ensuring the correct tickets are in there, release it, generating release notes in Jira at the same time.
  - Populate the Github release notes section (copied as markdown from Jira).
    - Example: <https://github.com/SonarSource/echoes-react/releases/tag/v0.5.0>
  - click _Publish Release_

- On the `main` branch, bump the [package version](https://github.com/SonarSource/echoes-react/blob/main/package.json#L3) for the next development iteration with `yarn version major|minor` and commit with message `Prepare for version x.y`.

## Release Process for Patch Versions

- Check out the version branch `branch-x.y` (create it if it doesn't exist yet)

- Bump the [package version](https://github.com/SonarSource/echoes-react/blob/main/package.json#L3) with `yarn version patch` and commit with message `Prepare for version x.y.z`.

- Cherry-pick the commits from the `main` branch that need to be in this patch release

- Create a PR on the version branch with the changes

- [Create a new version in the Echoes Design System project](https://sonarsource.atlassian.net/projects/ECHOES?selectedItem=com.atlassian.jira.jira-projects-plugin%3Arelease-page) like [this one](https://sonarsource.atlassian.net/projects/ECHOES/versions/15545)

- Tag the relevant tickets with this new version

- Once the PR is merged, follow the same procedure as for Major/Minor versions, skipping the version bump at the end

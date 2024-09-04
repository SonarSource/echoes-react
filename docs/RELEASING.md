# Releasing

## Versioning

This project follows [semver](https://semver.org/).

Major and minor versions follow the versioning in the Echoes Design System. Patches may diverge.

For more details, refer to the [internal versioning strategy](https://docs.google.com/document/d/1JkzJVFBN3MPl-uBDgddICfdFf4kXPaRBa6XqaJV0F5U) (Sonar employees only)

## Release Process for Release Candidates

- Make sure the version is correct in **_package.json_**
  - If not, bump it with a `[No Jira] Prepare version vX.Y.Z-rcN` commit message
- [Publish a new GitHub release](https://github.com/SonarSource/echoes-react/releases/new) targeting the candidate branch (usually the **_main_** branch):
  - Title: `@sonarsource/echoes-react - vX.Y.Z-rcN`
  - Description: You can leave this blank
  - Check **[x]_Set as a pre-release_**
    - Make sure **[ ]_Set as the latest release_** has been automatically unchecked.
  - Click **_Publish release_**

## Release Process for Major and Minor Versions

- Create a new branch for the release and maintenance following the name convention `branch-x.y`

- [Create a Jira release ticket in the REL project](https://jira.sonarsource.com/projects/REL) like [this one](https://sonarsource.atlassian.net/jira/software/c/projects/REL/issues/REL-3062)

  - Summary: @sonarsource/echoes-react x.y
  - Documentation status: N/A
  - Short description: pull from [version description](https://sonarsource.atlassian.net/projects/DS/versions/15439/tab/release-report-all-issues)
  - SQ compatibility: current version
  - Link to Jira RELEASE NOTES: copy from a previous release ticket, updating the release ID, e.g.: <https://sonarsource.atlassian.net/projects/DS/versions/15590/tab/release-report-all-issues?isReleaseNoteModalOpen=true>

- [Publish a new GitHub release](https://github.com/SonarSource/echoes-react/releases/new) targeting the release branch

  - Find the relevant release from the [releases page](https://sonarsource.atlassian.net/projects/DS?selectedItem=com.atlassian.jira.jira-projects-plugin%3Arelease-page) and populate (as markdown) the notes section.
  - Example: <https://github.com/SonarSource/echoes-react/releases/tag/v0.5.0>
  - click _Publish Release_

- Close the REL ticket you've created

- Bump the [package version](https://github.com/SonarSource/echoes-react/blob/main/package.json#L3) for the next development iteration with `yarn version major|minor` and commit with message `[No Jira] Prepare for version x.y`.

## Release Process for Patch Versions

- Check out the version branch `branch-x.y`

- Bump the [package version](https://github.com/SonarSource/echoes-react/blob/main/package.json#L3) with `yarn version patch` and commit with message `[No Jira] Prepare for version x.y.z`.

- Cherry-pick the commits from the `main` branch that need to be in this patch release

- Create a PR on the version branch with the changes

- [Create a new version in the Echoes Design System project](https://sonarsource.atlassian.net/projects/DS?selectedItem=com.atlassian.jira.jira-projects-plugin%3Arelease-page) like [this one](https://sonarsource.atlassian.net/projects/DS/versions/15545)

- Tag the relevant tickets with this new version

- Once the PR is merged, follow the same procedure as for Major/Minor versions, starting with the creation of a Jira REL ticket, and skipping the version bump at the end

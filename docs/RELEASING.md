# Releasing

## Versioning

This project follows [semver](https://semver.org/).

Major and minor versions follow the versioning in the Echoes Design System. Patches may diverge.

For more details, refer to the [internal versioning strategy](https://docs.google.com/document/d/1JkzJVFBN3MPl-uBDgddICfdFf4kXPaRBa6XqaJV0F5U) (Sonar employees only)

## Release Process

- [Create a Jira release ticket](https://jira.sonarsource.com/projects/REL) like [this one](https://sonarsource.atlassian.net/browse/REL-PLACEHOLDER)

  - Title: @sonarsource/echoes-react 0.1.3.1223
  - Documentation status: N/A
  - Short description: pull from [version description](https://sonarsource.atlassian.net/projects/DS/versions/15439/tab/release-report-all-issues)
  - SQ compatibility: current version

- [Publish a new GitHub release](https://github.com/SonarSource/echoes-react/releases/new)

  - Find the relevant release from the [releases page](https://sonarsource.atlassian.net/projects/DS?selectedItem=com.atlassian.jira.jira-projects-plugin%3Arelease-page) and populate (as markdown) the notes section.
  - click `Publish Release`

- Bump the [package version](https://github.com/SonarSource/echoes-react/blob/main/package.json#L3) for the next development iteration

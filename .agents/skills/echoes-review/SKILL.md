---
name: echoes-review
description: Echoes review — analyse your current branch or an existing PR for naming violations, a11y gaps, design-token misuse, missing exports, and architectural issues in the Echoes React component library.
---

Run echoes review: $ARGUMENTS

Parse arguments:

- `--pr <number or URL>` — review a specific PR's diff instead of the current branch; accepts a bare number (`123`) or a full GitHub URL — extract the number from the URL path before proceeding; `--base` is ignored when this is set since `gh pr diff` always diffs against the PR's own base branch
- `--base <branch>` — override the base branch when diffing the current branch (default: auto-detected main or master); has no effect when `--pr` is provided

---

## Step 1: Load review guidelines

Read all files under `.gitar/review/` — they contain the authoritative rules for this review:

@.gitar/review/general-design.md
@.gitar/review/naming-and-api.md
@.gitar/review/component-patterns.md
@.gitar/review/folder-and-exports.md
@.gitar/review/radix-ui.md
@.gitar/review/design-tokens.md
@.gitar/review/accessibility.md
@.gitar/review/testing.md
@.gitar/review/localization.md
@.gitar/review/stories-and-figma.md

---

## Step 2: Get the diff

The two modes use **different data sources**. Do not mix them.

### Mode A: `--pr`

```bash
git fetch origin pull/{pr}/head:pr-{pr}

gh pr diff {pr} --name-only
gh pr diff {pr}
```

For each changed file that looks architecturally significant (component files, index exports, stories, tests, figma-connect files, design token files), read its full content from the fetched PR ref:

```bash
git show pr-{pr}:<file_path>
```

### Mode B: Current branch (no `--pr`)

```bash
git rev-parse --abbrev-ref HEAD
```

Determine the merge-base. If `--base` was provided, use it directly; otherwise auto-detect:

```bash
MERGE_BASE=$(git merge-base HEAD origin/main 2>/dev/null || git merge-base HEAD origin/master)
```

Get the diff from the merge-base to the **working tree** (includes committed, staged, and unstaged changes):

```bash
git diff $MERGE_BASE --name-only
git diff $MERGE_BASE
```

For each architecturally significant changed file, read the full file from disk for context beyond the diff.

---

## Step 3: Analyse

Apply every rule from the loaded `.gitar/review/` files to the diff. For each finding note: file path, approximate line, and whether it's a **must fix** (correctness risk) or **worth addressing** (design smell that will compound).

Before reporting each finding, assess the tradeoff:

- **Scope**: one-liner fix, single-file refactor, or multi-file change?
- **Complexity trade**: does the fix remove complexity in one place but add it somewhere else?
- **Risk**: does it touch a public API (breaking change for consumers)?
- **Strategic direction**: is the implementation heading the right way, or is it a local fix on a fundamentally wrong approach?

Include the tradeoff in every finding. A finding without a tradeoff is just a complaint.

---

## Step 4: Report findings

---

**Must fix:**

- `{file}:{line}` — {what breaks or violates and why} → fix: {concrete suggestion} | cost: {tradeoff}

**Worth addressing (will compound if left):**

- `{file}:{line}` — {the smell or gap} → suggestion: {cleaner approach} | cost: {tradeoff}

**Looks good:**

- {something specific that was done well}

---

Keep each finding to 2-3 sentences. If no must-fix items, say so clearly.

### Closing prompt

**If `--pr` was used** (reviewing an existing PR):

Ask: "Want me to address any of these, or post these findings as a comment on the PR?"

If the answer is to post: use `gh pr comment {pr} --body "{findings}"`. Do **not** offer to create a new PR — one already exists.

**If reviewing the current branch** (no `--pr`):

Ask: "Want to address any of these before opening the PR, or shall I go ahead and create it?"

If the answer is to create it: `gh pr create --title "{title}" --body "{body}"`. Mention any deferred items briefly in the PR body so reviewers are aware.

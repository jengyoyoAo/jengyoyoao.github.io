# GitHub Pages deployment

## One-time change before publishing this migration

The old site serves repository-root HTML from `master`. The new site builds Markdown into `_site/` and deploys that output. Before merging/pushing the migration for production, set:

**Repository → Settings → Pages → Build and deployment → Source → GitHub Actions**

Do not keep “Deploy from a branch”: generated article HTML is no longer committed to the repository root.

This branch prepares the workflow but does not change live repository settings. After the setting is changed and the migration is pushed, the `Build and deploy website` workflow will install locked dependencies, build, run tests, upload `_site/`, and deploy it. Pull requests build/test but never deploy.

GitHub may request environment approval if the repository has existing deployment-protection rules. Keep those rules and complete the approval in GitHub if required.

## Routine updates

Commit Markdown, source code and any metadata changes, then push to `master`. Review the Actions run before assuming the live site is updated. Never commit build output or install dependencies manually on GitHub Pages.

## Local preview

```sh
npm ci
npm run dev
```

Open <http://localhost:8765/>. For a clean production-like check, run `npm test`.

## Rollback

Revert the migration commit to restore the old tracked HTML, and set Pages Source back to **Deploy from a branch → master → /(root)**. Existing public article URLs remain unchanged in either setup.

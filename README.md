# Cheng-You Cheng — Personal Website

Static personal site, built with Eleventy from Markdown and standalone Python/C sources. Existing public URLs are preserved.

**Live site:** <https://jengyoyoao.github.io/>

## Preview and verify

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open <http://localhost:8765/>. Changes to Markdown, templates and solution source files trigger a rebuild. Use `npm test` to build and run link, formula, code, ordering and automation checks. `npm run build` produces a clean `_site/`; never edit generated HTML.

## Add a solution

```sh
npm run new:solution -- leetcode 4 "Median of Two Sorted Arrays" --difficulty=hard --languages=python,c
```

The command creates one draft Markdown file under `solutions/leetcode/` and the selected source files. Edit the summary, problem URL, topic and explanation, then replace the source placeholders with your code. Set `draft: false` when ready to include it in the preview and site. Drafts do not appear in lists, counts, raw Markdown or downloadable code.

Supported platforms: `project-euler`, `leetcode`, `cses`, `zerojudge`. For a custom problem URL, supply `--url=https://...`. Verify the generated title-based URL for LeetCode; CSES uses its task ID. ZeroJudge URLs must be supplied explicitly. LeetCode difficulty is `easy`, `medium` or `hard`.

Only maintain Markdown and source files. Article HTML, language tabs, syntax highlighting, numeric platform lists and published counts are generated automatically. Add alternative approaches by declaring another source group in front matter and using `{% solution groupName %}`.

## Add a learning note

```sh
npm run new:note -- linear-algebra-basics "Linear Algebra Basics" --topic=Mathematics
```

Edit `notes/linear-algebra-basics.md`, then set `draft: false`. The note and the Notes list are generated automatically. Journal remains at `/notes.html`; learning notes use `/notes/`.

Use `$n$` for inline LaTeX and `$$ ... $$` on separate lines for display math. Formulas are rendered during the build using local KaTeX assets, so no external formula CDN is required.

See [the writing guide](docs/WRITING.md) for examples and [deployment instructions](docs/DEPLOYMENT.md) for the one-time GitHub Pages setup.

## Where things live

- `solutions/` — canonical solution Markdown and unmodified Python/C files.
- `notes/` — learning-note Markdown and the automatic Notes index.
- `_includes/` — shared page, article and list templates.
- `_data/` — platform labels and catalog data loader.
- `online-judge/progress-data.json` — catalog totals and their snapshot sources/dates; update when needed. Published counts are automatic.
- `index.html`, `about.html`, `community.html`, `notes.html`, `journal/` — existing static profile and Journal pages, copied as-is.
- `.github/workflows/pages.yml` — builds/tests pull requests and builds/deploys `master`.
- `_site/` — generated output, excluded from Git.

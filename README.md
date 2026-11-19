# Cheng-You Cheng — Personal Website

My personal website, collecting my projects, learning notes, programming solutions, and experiences.

**Website:** [jengyoyoao.github.io](https://jengyoyoao.github.io/)

## Contents

- **About** — my background and interests.
- **Community** — teaching and community activities.
- **Journal** — personal experiences and reflections.
- **Notes** — structured learning notes in mathematics, programming, AI, English, and tools.
- **Online Judge** — solution write-ups and code for Project Euler, LeetCode, CSES, and ZeroJudge.

## How the site is organized

This is a static Eleventy site. Source files stay close to the public URL they produce, while shared presentation and build helpers have dedicated directories.

- Root `.njk` files are the home, About, Community, Journal index, and 404 page templates. Their `permalink` values preserve the existing `.html` URLs.
- `journal/*.njk` contains personal journal articles; `notes.njk` is their index page, kept at `/notes.html` for compatibility.
- `notes/*.md` contains technical and study notes. `notes/*.njk` contains topic landing pages. `_data/noteTopics.json` defines the available Notes topics.
- `solutions/<platform>/*.md` contains problem write-ups. Beside them, `.py` and `.c` files are the downloadable source of truth shown by the pages.
- `_includes/` contains shared layouts and content components. `_data/` contains site data. `images/` and root-level CSS/JavaScript are public static assets.
- `scripts/` contains content scaffolding, validation, cleanup, and math helpers. `tests/` checks generated pages, URLs, links, metadata, and solution rendering. `docs/` contains writing and deployment guidance.
- `online-judge/` contains the platform landing pages and progress snapshot.

The existing source folders already separate site pages, study notes, solutions, assets, tooling, and documentation. Keeping the page templates at the root also makes their route mapping easy to see, so there is no extra `src/` layer that would need URL remapping.

## Local development

```sh
npm ci
npm run dev
```

Open <http://localhost:8765/>. Before publishing, run:

```sh
npm test
```

This cleans and builds `_site/`, validates Notes metadata, then checks existing public URLs, generated-page local links and fragments, math rendering, and solution/source consistency. Commit source files only; `_site/` and `node_modules/` are generated or installed locally.

For article formats, metadata requirements, and publishing details, see [docs/WRITING.md](docs/WRITING.md) and [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

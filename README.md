# Cheng-You Cheng — Personal Website

A static personal website for my profile, selected projects, teaching, and contact information.

**Live site:** <https://jengyoyoao.github.io/>

## Files

- `index.html` — responsive home page.
- `about.html`, `community.html`, `notes.html` — personal, community, and journal subpages.
- `journal/` — individual journal articles; each post has its own page, publication date, and hashtags.
- `online-judge.html` — overview linking to platform-specific solution logs.
- `project-euler.html`, `cses.html`, `zerojudge.html`, `leetcode.html` — per-platform solution pages.
- `site.css` — shared styles for all site pages.
- `solutions/` — source code and Markdown notes, organized by platform.
- `images/avatar.jpg` — illustrated profile avatar.
- `404.html` — matching not-found page.

## Local preview

Run a static server from the repository root and open its local URL. No build step or framework is required.

## Adding a journal post

1. Add an article page under `journal/` using `journal/first-open-source-pr.html` as a template. Keep the publication date in its `<time>` element and add the post's hashtags in its `.journal-tags` list.
2. Add a matching card to the Recent posts section in `notes.html`. Link its cover to the article page, and update the visible date, summary, and hashtags.
3. Preview both pages locally and check that the article links back to `notes.html`.

## Publishing

GitHub Pages serves the root of the `master` branch. Pushing changes to that branch triggers deployment.

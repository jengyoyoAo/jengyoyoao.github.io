# Writing and Updating Content

## Keep one Markdown source for each solution article

For example, use `solutions/leetcode/0003-longest-substring-without-repeating-characters.md`:

```yaml
---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 3
title: Longest Substring Without Repeating Characters
date: "2026-11-05"
difficulty: medium
topic: Sliding window
summary: Track last-seen character indices to move the window past duplicates.
problem_url: https://leetcode.com/problems/longest-substring-without-repeating-characters/
permalink: online-judge/leetcode/problem-3.html
solutions:
  - label: Python
    path: solutions/leetcode/0003-longest-substring-without-repeating-characters.py
  - label: C
    path: solutions/leetcode/0003-longest-substring-without-repeating-characters.c
---
```

Then write the article content directly:

```markdown
## Key idea

Let $n = |s|$ be the length of the string.

## Solution

{% solution solutions %}

## Complexity

- **Time:** $O(n)$.
- **Extra space:** $O(1)$ for a fixed alphabet.
```

The source files listed under `solutions` are loaded and highlighted automatically, and rendered as language tabs with Copy buttons. Do not paste a duplicate copy of the same code into the Markdown file. For a brute-force or other approach, declare another source group, such as `bruteForce`, and insert it with `{% solution bruteForce %}` where you want it to appear.

Problem ordering, Easy/Medium/Hard colors, article dates, and the number of published problems per platform are generated automatically. For a daily problem, add `daily: "2026-11-05"`. Do not manually edit published problem counts in lists or charts. Platform-wide totals are not fetched automatically; update the snapshot and source in `online-judge/progress-data.json`.

## Create a draft

```sh
npm run new:solution -- leetcode 4 "Median of Two Sorted Arrays" --difficulty=hard --languages=python,c
npm run new:note -- linear-algebra-basics "Linear Algebra Basics" --topic=Mathematics
```

New content defaults to `draft: true` and will not appear on the generated site, in lists, or in counts. When it is ready, change this to `draft: false` and run `npm run dev` to preview it. Drafts are still stored in the Git repository, so this is not a way to store private information.

### Notes metadata

Every file under `notes/**/*.md`, including drafts and section pages, must provide these fields:

- `layout`: `note.njk`, `mathematics-section.njk`, `geometry-section.njk`, or `vocabulary.njk`.
- `tags`: exactly one content tag: `note`, `math-section`, or `vocabulary-section`.
- `title` and `summary`: non-empty strings.
- `topic`: the `name` of a category in `_data/noteTopics.json`.
- `date`: a valid `YYYY-MM-DD` date.
- `permalink`: a unique `notes/<slug>/index.html` path.
- `draft`: optional; if present, it must be the YAML boolean `true` or `false`.

Before Eleventy builds the site, `npm run build` validates all notes, including drafts, and reports the source file and any field errors. A regular note uses `layout: note.njk` and `tags: [note]`, for example at `notes/linear-algebra-basics/index.html`. The Notes index sorts entries by date, newest first.

Journal and Notes are separate sections. Journal contains personal experiences and reflections; its source files are in `journal/*.njk`, and its index source is `notes.njk`, which retains the public URL `/notes.html`. Notes contains learning material in mathematics, programming, AI, English, and tools; its source files are in `notes/`.

## Pre-publication checks for LLM-assisted content

Use the checks that apply whenever an LLM helped draft, translate, summarize, or produce content. Treat generated text and code as a draft, and verify it against reliable sources and your own intent before publishing.

- **Facts and dates:** Check names, claims, dates, and links against the original records or authoritative sources. Do not fill gaps with plausible-sounding details or include personal information that was not intended for publication.
- **Mathematics notes:** Verify definitions, assumptions, theorem statements, and each step of a proof or derivation. Recalculate examples independently, including boundary cases, and confirm that notation is consistent.
- **Programming notes and solutions:** Run the code. Compare its output with known examples, then check edge cases and error behavior. Confirm that the explanation matches the actual implementation and that time and space complexity claims are justified.
- **General study notes:** Verify technical claims against reliable or primary references, especially when they depend on a software version, standard, or recent change. Reproduce commands and outputs where possible.
- **Journal and profile writing:** Make sure the wording says what you mean, keeps your voice, and separates remembered facts from interpretation. For bilingual writing, compare both versions for meaning, tone, and dates.
- **Website and community pages:** Recheck your role, status, organization names, date ranges, and external links. Make sure every personal or achievement claim is supported by your records.

Before publishing, preview the generated page and run `npm test`.

## LaTeX

Use `$...$` for inline formulas and this format for a display formula:

```markdown
$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$
```

A `$` inside a code block is not rendered as a formula. Function names and literal programming syntax can continue to use backticks. Invalid LaTeX causes the build to fail, so check formulas before publishing.

## Preview and publish

1. Run `npm run dev` and open `http://localhost:8765/`.
2. Run `npm test` to check the articles, links, and automation.
3. Commit source files such as Markdown, code, and templates. Do not commit `_site/` or `node_modules/`.
4. Push to `master`. GitHub Actions will build and publish the site; initial deployment requires the deployment settings to be configured.

The home, About, Community, Journal index, and Journal articles share the navigation, footer, and page frame in `_includes/base.njk`. Update the shared template when adding a site-wide navigation item. Each page keeps its existing public URL through an explicit `permalink`.

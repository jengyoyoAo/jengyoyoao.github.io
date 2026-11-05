# Online Judge solutions

Canonical Markdown explanations and standalone Python/C source files, grouped by platform.

## Add a solution

From the repository root:

```sh
npm run new:solution -- leetcode 4 "Median of Two Sorted Arrays" --difficulty=hard --languages=python,c
```

Edit the generated Markdown and code. Set `draft: false` when ready, then run `npm run dev` to preview. The website article, language tabs, sorted platform list and published count are generated automatically. Do not create or edit article HTML manually.

Use LaTeX in explanations and keep executable code in the source files. The `{% solution solutions %}` shortcode reads those source files directly, so no second code copy is needed.

See [the writing guide](../docs/WRITING.md) and [TEMPLATE.md](TEMPLATE.md). The platform README lists are reference links; the actual website lists are derived from article metadata.

## Platforms

- [Project Euler](project-euler/)
- [CSES](cses/)
- [ZeroJudge](zerojudge/)
- [LeetCode](leetcode/)

# Solution template

Prefer the scaffold command so the filenames and output URL match the problem:

```sh
npm run new:solution -- leetcode 4 "Median of Two Sorted Arrays" --difficulty=hard --languages=python,c
```

A complete article has front matter and Markdown content:

```markdown
---
layout: solution.njk
tags: [solution]
draft: true
platform: leetcode
problem_id: 4
title: Median of Two Sorted Arrays
date: "2026-11-05"
difficulty: hard
topic: Binary search
summary: Replace this with your short summary.
problem_url: https://leetcode.com/problems/median-of-two-sorted-arrays/
permalink: online-judge/leetcode/problem-4.html
solutions:
  - label: Python
    path: solutions/leetcode/0004-median-of-two-sorted-arrays.py
  - label: C
    path: solutions/leetcode/0004-median-of-two-sorted-arrays.c
---

## Key idea

Explain the algorithm, using $n$ for the input size.

## Solution

{% solution solutions %}

## Why it works

Explain correctness.

## Complexity

- **Time:** Replace with your analysis.
- **Extra space:** Replace with your analysis.

## Takeaway

Record the useful observation or pitfall.
```

Set `draft: false` only after replacing the source placeholders and completing the explanation. Never edit `_site/` directly.

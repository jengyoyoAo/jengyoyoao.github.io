---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 2124
title: Check if All A's Appears Before All B's
date: "2026-11-22"
daily: "2026-11-22"
difficulty: easy
topic: String scanning
summary: Check for the forbidden adjacent pair ba. Includes my one-line Python solution, a matching C scan, and a proof of the condition.
lead: Decide whether every a appears before every b in a string containing only those two characters.
problem_url: https://leetcode.com/problems/check-if-all-as-appears-before-all-bs/
permalink: online-judge/leetcode/problem-2124.html
solutions:
  - label: Python
    path: solutions/leetcode/2124-check-if-all-as-appears-before-all-bs.py
  - label: C
    path: solutions/leetcode/2124-check-if-all-as-appears-before-all-bs.c
---

## Key idea

A valid string contains a block of a's followed by a block of b's; either block may be absent. Once a b appears, the string must never return to an a. This happens exactly when the adjacent pair `ba` is absent.

## Solution

{% solution solutions %}

The Python version preserves the code from my screenshot. The `in` operator checks for a contiguous substring, so `"ba" not in s` directly expresses the condition.

The C version checks adjacent characters and returns immediately when it finds `ba`. Its index starts at $i=1$, allowing each comparison to read $s[i-1]$ and $s[i]$. The problem guarantees a nonempty string, so the initial index is valid even when the string contains only one character: it then points to the terminating null character. The input is unchanged.

## Why it works

If `ba` occurs, a b is immediately followed by an a. That violates the required order, so returning false is correct.

Conversely, suppose some b appears before a later a. Consider the first a after that b. Every character between the chosen b and this a must be b, since the string contains only a and b. The character immediately before this a is therefore b, giving an adjacent `ba` pair.

Thus every invalid string contains `ba`, and every string containing `ba` is invalid. Checking for its absence is both necessary and sufficient.

## Complexity

Let $n$ be the string length.

- **Time:** $O(n)$ in the worst case for both versions. The Python search pattern has fixed length $2$, and the C scan examines each adjacent pair at most once.
- **Extra space:** $O(1)$. Neither version builds another string or stores a collection of positions.

## Examples

| String | Contains `ba`? | Result |
| --- | --- | --- |
| `aaabbb` | No | `true` |
| `abab` | Yes | `false` |
| `bbb` | No | `true` |
| `aaa` | No | `true` |
| `a` | No | `true` |

Strings containing only one character type satisfy the condition as well; both types do not need to appear.

## Takeaway

With an alphabet of only two ordered characters, a global ordering violation must contain a local transition back to the earlier character. Recognizing that forbidden pair turns the check into a simple substring search.

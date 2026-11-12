---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 3105
title: Longest Strictly Increasing or Strictly Decreasing Subarray
date: "2026-11-12"
daily: "2026-11-12"
difficulty: easy
topic: Array & consecutive runs
summary: Track increasing and decreasing run lengths in one pass. Includes my original two-pass Python approach, improved Python solution, and matching C implementation.
lead: Find the longest contiguous subarray whose adjacent values are all strictly increasing or all strictly decreasing.
problem_url: https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray/
permalink: online-judge/leetcode/problem-3105.html
solutions:
  - label: Python
    path: solutions/leetcode/3105-longest-strictly-increasing-or-strictly-decreasing-subarray.py
  - label: C
    path: solutions/leetcode/3105-longest-strictly-increasing-or-strictly-decreasing-subarray.c
twoPass:
  - label: Python · Original two-pass approach
    path: solutions/leetcode/3105-longest-strictly-increasing-or-strictly-decreasing-subarray-two-pass.py
---

## Key idea

Keep two run lengths ending at the current index: $\mathrm{inc}$ for a strictly increasing run and $\mathrm{dec}$ for a strictly decreasing run. An adjacent comparison tells us which run can extend.

- If $\mathrm{nums}[i]>\mathrm{nums}[i-1]$, increase $\mathrm{inc}$ and reset $\mathrm{dec}=1$.
- If $\mathrm{nums}[i]<\mathrm{nums}[i-1]$, increase $\mathrm{dec}$ and reset $\mathrm{inc}=1$.
- If the values are equal, reset both to $1$ because neither strict direction can continue.

After each comparison, update the best length seen so far.

## Solution

{% solution solutions %}

The Python version preserves my improved solution. LeetCode supplies the `List` typing name. The C version follows the same transitions using only integer counters. Both assume the problem’s nonempty-array input contract and leave the input unchanged.

## My original two-pass approach

{% solution twoPass %}

The first scan finds the longest strictly increasing run. When the next value is no larger than the previous value, the current run ends just before index $i$, so its length is $i-\mathrm{start}$. The final update is needed because the last run may reach the end without triggering a break.

Reversing the array turns every strictly decreasing run in the original order into a strictly increasing run in the reversed order. A second increasing-run scan therefore finds the best decreasing length.

This version is also linear-time, but `nums[::-1]` creates a new list of length $n$. Assigning that list to the local name `nums` does not reverse or modify the caller’s original list. The one-pass version avoids this allocation and tracks both directions together.

## Why it works

A single element forms a valid run of length $1$, so both counters start at $1$. Assume the counters correctly describe the longest increasing and decreasing runs ending at index $i-1$.

If the next value is larger, the increasing run extends by one. No decreasing run of length greater than one can end at $i$, since its final adjacent pair would have to decrease. The symmetric argument applies when the next value is smaller. Equality prevents both strict directions from extending, leaving only the single-element run.

Thus the counters remain correct at every index. Every monotonic subarray ends at some index, so taking the maximum of both counters across all indices gives the required global maximum.

## Complexity

Let $n$ be the array length.

| Approach | Time | Extra space |
| --- | --- | --- |
| Original Python: two scans and a reversed copy | $O(n)$ | $O(n)$ |
| Improved Python: two run counters | $O(n)$ | $O(1)$ |
| C: two run counters | $O(n)$ | $O(1)$ |

The improvement reduces auxiliary space and the number of passes, rather than improving the time Big O. The counters use only comparisons and increments; the C code does not subtract array values.

## Example

For $\mathrm{nums}=[1,4,3,3,2]$:

| Index $i$ | Value | $\mathrm{inc}$ | $\mathrm{dec}$ | Best length |
| --- | --- | --- | --- | --- |
| $0$ | $1$ | $1$ | $1$ | $1$ |
| $1$ | $4$ | $2$ | $1$ | $2$ |
| $2$ | $3$ | $1$ | $2$ | $2$ |
| $3$ | $3$ | $1$ | $1$ | $2$ |
| $4$ | $2$ | $1$ | $2$ | $2$ |

The equal adjacent values break both runs, so $[4,3,3,2]$ is not strictly decreasing. The answer is $2$. For an all-equal array, the answer is $1$.

## Takeaway

Track the property of a subarray ending at the current position. Reset the opposite direction when the trend changes, and reset both on equality. This is about contiguous subarrays, not subsequences that may skip elements.

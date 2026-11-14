---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 3364
title: Minimum Positive Sum Subarray
date: "2026-11-14"
daily: "2026-11-14"
difficulty: easy
topic: Prefix sums & enumeration
summary: Enumerate permitted subarray lengths and use prefix differences to check each sum in constant time. Includes my Python solution, a matching C version, and precise complexity analysis.
lead: Find the smallest strictly positive sum among contiguous subarrays with lengths between the given bounds.
problem_url: https://leetcode.com/problems/minimum-positive-sum-subarray/
permalink: online-judge/leetcode/problem-3364.html
solutions:
  - label: Python
    path: solutions/leetcode/3364-minimum-positive-sum-subarray.py
  - label: C
    path: solutions/leetcode/3364-minimum-positive-sum-subarray.c
---

## Key idea

Enumerate each permitted length and every starting position for that length. Precompute prefix sums so that evaluating a candidate does not require adding its elements again.

Only sums strictly greater than zero are eligible. Track the minimum such sum, or return $-1$ if no candidate qualifies.

## Solution

{% solution solutions %}

This preserves the Python solution from my screenshot. LeetCode supplies the `List` typing name. The input array is not modified.

The C version follows the same prefix-sum construction and candidate enumeration. It uses `INT_MAX` as the initial answer and frees the prefix array before returning. Under the problem bounds, prefix and subarray sums have magnitude at most $100{,}000$, so they fit in a 32-bit `int`. An allocation failure returns `-1`. Both versions have the same time and extra-space bounds.

## Prefix-sum formula

Let $\mathrm{prefix}[k]$ be the sum of the first $k$ elements:

$$
\mathrm{prefix}[0]=0,\qquad
\mathrm{prefix}[i+1]=\mathrm{prefix}[i]+\mathrm{nums}[i].
$$

A subarray starting at $i$ with length $\mathrm{size}$ occupies the half-open interval $[i,i+\mathrm{size})$. Its sum is:

$$
s=\mathrm{prefix}[i+\mathrm{size}]-\mathrm{prefix}[i].
$$

The common prefix before $i$ cancels, leaving exactly the desired consecutive elements. Each sum query therefore takes $O(1)$ time after preprocessing.

## Why it works

The outer loop visits every length from $l$ through $r$, including both bounds. For each length, the inner loop visits all valid starts from $0$ through $n-\mathrm{size}$. Every candidate satisfying the length constraint is therefore examined exactly once.

The prefix difference gives its exact sum. The test $s>0$ discards nonpositive sums, while the update retains the smallest eligible value seen so far. After all candidates are processed, the stored answer is the required minimum. If it is still infinity, no eligible subarray exists, so returning $-1$ is correct.

The positivity test is strict: a zero sum does not qualify. Negative elements are allowed, so a longer window need not have a larger sum; this solution does not rely on monotonic window sums.

## Complexity

Let $n$ be the array length. The number of candidate subarrays checked is:

$$
\sum_{k=l}^{r}(n-k+1)
=(r-l+1)(n+1)-\frac{(l+r)(r-l+1)}{2}.
$$

- **Time:** $O(n+\sum_{k=l}^{r}(n-k+1))$, including prefix construction. A simpler upper bound is $O(n(r-l+1))$, or $O(n^2)$ in the worst case.
- **Extra space:** $O(n)$ for the prefix array.

Constant-time range-sum queries avoid the extra work of summing each candidate slice. They do not make the whole algorithm linear: the candidate enumeration is still quadratic when all lengths are permitted.

## Example

For $\mathrm{nums}=[3,-2,1,4]$, $l=2$, and $r=3$, the prefix array is $[0,3,1,2,6]$.

| Length | Start | Prefix difference | Sum |
| --- | --- | --- | --- |
| $2$ | $0$ | $1-0$ | $1$ |
| $2$ | $1$ | $2-3$ | $-1$ |
| $2$ | $2$ | $6-1$ | $5$ |
| $3$ | $0$ | $2-0$ | $2$ |
| $3$ | $1$ | $6-3$ | $3$ |

Ignoring the negative sum leaves a minimum positive sum of $1$. If all allowed subarrays have sums at most zero, the result is $-1$.

## Takeaway

Prefix sums separate range-sum computation from candidate enumeration. Check the number of candidates when analyzing complexity, and keep both the inclusive length bounds and the strict positivity condition explicit.

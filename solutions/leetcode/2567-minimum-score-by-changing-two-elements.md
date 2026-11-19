---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 2567
title: Minimum Score by Changing Two Elements
date: "2026-11-19"
daily: "2026-11-19"
difficulty: medium
topic: Sorting & greedy extremes
summary: Sort the array and compare changing the two smallest, the two largest, or one element at each end. Includes my Python solution, a matching C version, and a proof that the low score can be zero.
lead: Minimize the sum of the smallest and largest pairwise absolute differences after changing two elements.
problem_url: https://leetcode.com/problems/minimum-score-by-changing-two-elements/
permalink: online-judge/leetcode/problem-2567.html
solutions:
  - label: Python
    path: solutions/leetcode/2567-minimum-score-by-changing-two-elements.py
  - label: C
    path: solutions/leetcode/2567-minimum-score-by-changing-two-elements.c
---

## Key idea

The high score is the array’s range: maximum minus minimum. The low score is nonnegative, and it becomes zero whenever two elements are equal.

After sorting, changing two extreme elements can reduce the range. There are only three ways to distribute those changes between the two ends: change both smallest elements, both largest elements, or one from each end. In each case, the changed values can match remaining values, making the low score zero without increasing the remaining range.

## Solution

{% solution solutions %}

This preserves the Python code from my screenshot. LeetCode supplies the `List` typing name. `nums.sort()` changes the input array’s order in place. The function computes the minimum score directly; it does not need to construct the modified array.

The C version uses `qsort` and evaluates the same three ranges. It also sorts the input in place. The comparator returns the ordering without subtracting its arguments. Under the problem bounds, the range differences fit in a 32-bit `int`.

## The three cases

Let the sorted values be $a_0\le a_1\le\cdots\le a_{n-1}$.

| Changed elements | Remaining range | Code |
| --- | --- | --- |
| Two smallest | $a_{n-1}-a_2$ | `case1` |
| Two largest | $a_{n-3}-a_0$ | `case2` |
| Smallest and largest | $a_{n-2}-a_1$ | `case3` |

For the first case, set the two smallest elements to $a_2$. For the second, set the two largest to $a_{n-3}$. For the third, set the smallest to $a_1$ and the largest to $a_{n-2}$. Each construction leaves the displayed range and creates duplicate values, so its low score is zero.

The problem guarantees $n\ge3$, making all these indices valid. When $n=3$, all three candidate ranges are zero: the two changed elements can match the third.

## Why it works

At least $n-2$ original elements remain untouched after two positions are changed. The final high score cannot be smaller than the range of those untouched values, and the low score cannot be negative.

Among any chosen $n-2$ sorted elements, the narrowest possible range is achieved by a consecutive block of $n-2$ positions. To see this, if the first chosen index is $p$, the last chosen index must be at least $p+n-3$; replacing the selection by the block from $p$ through $p+n-3$ cannot increase its range.

There are exactly three such blocks, starting at indices $0$, $1$, and $2$. Their ranges are precisely the three values calculated by the code. Thus no solution can have a total score below their minimum.

The duplicate-producing constructions above attain each candidate range with low score zero. The lower bound is therefore achievable, proving that the minimum of the three cases is optimal.

## Complexity

Let $n$ be the array length.

- **Python time:** $O(n\log n)$ for sorting, followed by three constant-time comparisons.
- **Python extra space:** $O(n)$ in the worst case for sorting workspace.
- **C:** the three range calculations use $O(1)$ time and space after sorting. Total time and auxiliary space depend on the library’s `qsort` implementation; the C standard does not guarantee a particular sorting complexity. With an $O(n\log n)$ sorting implementation, total time is $O(n\log n)$.

Sorting in place does not imply constant auxiliary memory in Python. Only the first three and last three ordered values affect the result, but this implementation obtains them by sorting the whole array.

## Example

For $\mathrm{nums}=[1,4,7,8,5]$, sorting gives $[1,4,5,7,8]$:

- Change the two smallest: $8-5=3$.
- Change the two largest: $5-1=4$.
- Change one at each end: $7-4=3$.

The answer is $3$. For instance, setting the two smallest values to $5$ produces $[5,5,5,7,8]$, whose low score is $0$ and high score is $3$.

## Takeaway

Separate the two parts of the objective. Show that the low score can be zero while minimizing the range, then enumerate how the two changes remove extremes from the sorted array.

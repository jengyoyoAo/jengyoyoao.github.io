---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 1524
title: Number of Sub-arrays With Odd Sum
date: "2026-11-15"
daily: "2026-11-15"
difficulty: medium
topic: Prefix parity & counting
summary: Count earlier prefixes with opposite parity instead of enumerating every subarray. Includes my original quadratic Python version and linear-time Python/C solutions.
lead: Count contiguous subarrays with an odd sum, returning the answer modulo one billion and seven.
problem_url: https://leetcode.com/problems/number-of-sub-arrays-with-odd-sum/
permalink: online-judge/leetcode/problem-1524.html
solutions:
  - label: Python
    path: solutions/leetcode/1524-number-of-sub-arrays-with-odd-sum.py
  - label: C
    path: solutions/leetcode/1524-number-of-sub-arrays-with-odd-sum.c
enumeration:
  - label: Python · Original enumeration
    path: solutions/leetcode/1524-number-of-sub-arrays-with-odd-sum-enumeration.py
---

## Key idea

A subarray sum is the difference between two prefix sums. That difference is odd exactly when the two prefixes have different parity. We therefore need only the current prefix parity and the numbers of earlier even and odd prefixes.

For each new prefix:

- If it is odd, every earlier even prefix forms an odd-sum subarray ending here.
- If it is even, every earlier odd prefix forms an odd-sum subarray ending here.

Add the opposite-parity count to the answer, then record the current prefix in its own parity group.

## Solution

{% solution solutions %}

The Python version follows the parity-counting algorithm in my screenshot and returns the final count modulo $10^9+7$. The C version uses the same variables and transitions. Neither implementation changes the input array.

The C accumulator uses `long long`: the count before taking the modulus can exceed a 32-bit signed integer. Even the general subarray-count upper bound, $n(n+1)/2$, is at most $5{,}000{,}050{,}000$ under the problem bounds and fits safely in `long long`. Python integers handle the count directly.

## My original enumeration

{% solution enumeration %}

This version already stores only prefix parity, so each candidate’s parity is computed in constant time. However, it still visits every subarray by enumerating its length and starting position: there are $n(n+1)/2$ candidates. The time is therefore $O(n^2)$ despite constant-time prefix queries.

The stored prefix values are $0$ or $1$. Their difference can be $-1$, $0$, or $1$; in Python, applying `% 2` maps both odd differences to $1$. The optimized version avoids these differences entirely by counting opposite-parity prefixes.

## Prefix-parity relation

Let $P_j$ be the sum of the first $j$ elements, with $P_0=0$. A subarray occupying the half-open interval $[i,j)$ has sum $P_j-P_i$. Thus:

$$
(P_j-P_i)\bmod2=1
\quad\Longleftrightarrow\quad
(P_j\bmod2)\ne(P_i\bmod2).
$$

The current parity can be updated without storing full prefix sums:

$$
\mathrm{curr\_parity}=(\mathrm{curr\_parity}+\mathrm{num})\bmod2.
$$

Initialize $\mathrm{even\_count}=1$ to include the empty prefix $P_0=0$. This lets the algorithm count subarrays beginning at index $0$ without a special case. Initialize $\mathrm{odd\_count}=0$.

## Why it works

Before processing a new prefix, the two counters contain exactly the earlier prefixes grouped by parity. Pairing the current prefix with every earlier prefix of opposite parity counts precisely the odd-sum subarrays ending at this position.

Updating the appropriate counter afterward restores the invariant for the next position. Every nonempty subarray has a unique ending prefix and starting prefix, so each odd-sum subarray is counted exactly once, while even-sum subarrays are never counted. Taking the final modulus preserves the required answer.

The two counters count prefixes, not array elements. A new odd element does not necessarily create an odd prefix: its parity combines with the prefix accumulated so far.

## Complexity

Let $n$ be the array length.

| Approach | Time | Extra space |
| --- | --- | --- |
| Original Python enumeration | $O(n^2)$ | $O(n)$ |
| Python parity counting | $O(n)$ | $O(1)$ |
| C parity counting | $O(n)$ | $O(1)$ |

The optimized versions process each element once and keep only a fixed number of counters. These bounds use the usual unit-cost integer arithmetic model.

## Example

For $\mathrm{arr}=[1,3,5]$:

| Element | Current prefix parity | Opposite prefixes added | Running answer |
| --- | --- | --- | --- |
| $1$ | Odd | $1$ even prefix | $1$ |
| $3$ | Even | $1$ odd prefix | $2$ |
| $5$ | Odd | $2$ even prefixes | $4$ |

The result is $4$. For an array of all even values, every prefix is even, so no opposite-parity pair exists and the result is $0$.

## Takeaway

When the answer depends only on the parity of a range sum, store parity frequencies rather than individual prefix values or subarrays. Including the empty prefix correctly handles ranges starting at the beginning of the array.

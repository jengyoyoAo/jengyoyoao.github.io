# LeetCode 1385: Find the Distance Value Between Two Arrays

- **Problem:** [LeetCode 1385](https://leetcode.com/problems/find-the-distance-value-between-two-arrays/)
- **Daily Question:** 2026-11-05
- **Languages:** Python 3, C99 or later
- **Website:** [Read solution](../../online-judge/leetcode/problem-1385.html)

## Key idea

For each $\mathrm{num}$ in $\mathrm{arr1}$, determine whether $\mathrm{arr2}$ contains a value in the inclusive interval $[\mathrm{num} - d, \mathrm{num} + d]$. Count $\mathrm{num}$ only when no such value exists. Equal values appearing at different positions in $\mathrm{arr1}$ are counted separately.

My first approach checks every pair. Sorting $\mathrm{arr2}$ lets the second approach discard half of the remaining candidates at each binary-search step.

## Why binary search works

The search interval $[l, r]$ contains every candidate not yet ruled out. If $|\mathrm{num} - \mathrm{arr2}[\mathrm{mid}]| \le  d$, a disqualifying value has been found, so set $\mathrm{is\_vaild}$ to zero and stop.

Otherwise, when $\mathrm{num} > \mathrm{arr2}[\mathrm{mid}]$, the middle value is below $\mathrm{num} - d$. Every value to its left is also too small, so continue with $l = \mathrm{mid} + 1$. In the other case, the middle value is above $\mathrm{num} + d$, so all values to its right are too large and $r = \mathrm{mid} - 1$ is safe. If the search becomes empty, no disqualifying value exists, and this element contributes one to $\mathrm{count}$.

## Complexity

Let $n = |\mathrm{arr1}|$ and $m = |\mathrm{arr2}|$. Treat integer arithmetic and comparisons as constant-time operations.

Brute force: $O(nm)$ time and $O(1)$ extra space.

Sorting + binary search: $O(m \log m + n \log m)$ time for $m \ge  2$. More generally, including single-element arrays, $O(m \log(m + 1) + n \log(m + 1))$.

Extra space: The binary searches use $O(1)$ extra space; Python’s list sort may use $O(m)$ temporary space, so the complete implementation uses $O(m)$ extra space in the worst case.

## Example

With $\mathrm{arr1} = [4, 5, 8]$, $\mathrm{arr2} = [10, 9, 1, 8]$, and $d = 2$, both $4$ and $5$ qualify. The element $8$ does not, because $\mathrm{arr2}$ contains $8$. The result is $2$.

## Takeaway

Sorting turns repeated full scans into logarithmic searches. This is a search for any value inside an interval, rather than an exact-match search. The condition includes equality, so a distance exactly equal to $d$ disqualifies the element.

`arr2.sort()` changes the input list in place. The variable spellings $\mathrm{vaild}$ and $\mathrm{is\_vaild}$ are retained from my original code; their spelling does not affect execution.


## C binary search

[Source](1385-find-the-distance-value-between-two-arrays.c). Uses `qsort` and the same search as the Python implementation. Search time is $O(n \log(m + 1))$ with $O(1)$ extra search space. Sorting complexity and temporary space depend on the C library; the C standard does not specify `qsort` complexity.

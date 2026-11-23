---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 1352
title: Product of the Last K Numbers
date: "2026-11-23"
daily: "2026-11-23"
difficulty: medium
topic: Prefix products & data structure design
summary: Store prefix products since the latest zero and answer suffix queries with one division. Includes my Python solution and a matching C implementation.
lead: Maintain a stream of numbers and return the product of its last k values efficiently.
problem_url: https://leetcode.com/problems/product-of-the-last-k-numbers/
permalink: online-judge/leetcode/problem-1352.html
solutions:
  - label: Python
    path: solutions/leetcode/1352-product-of-the-last-k-numbers.py
  - label: C
    path: solutions/leetcode/1352-product-of-the-last-k-numbers.c
---

## Key idea

Multiplying the last $k$ numbers from scratch takes $O(k)$ time per query. Instead, store prefix products for the current suffix of nonzero numbers. A quotient of two prefix products gives the requested suffix product directly.

Zero needs special handling: it prevents division, and every query that includes it must return zero. Reset the prefix list to $[1]$ whenever a zero arrives. Earlier products are no longer needed.

## Solution

{% solution solutions %}

The Python version preserves the algorithm from my screenshot, with the generated usage comments omitted.

The C version uses the same prefix products and a logical length. It reserves $40{,}001$ entries because the problem allows at most $40{,}000$ total method calls, plus the initial product $1$. Resetting only the length keeps the allocated array available for reuse. The constructor allocates the object, and the free function releases it.

The problem guarantees that every contiguous product fits in a signed 32-bit integer. Thus the stored nonzero prefix products and multiplication results fit in the C `int` used by LeetCode. No floating-point division is needed.

## Prefix products since the latest zero

Let $r$ be the number of values added since the most recent zero, or since initialization if no zero has appeared. Write those values as $a_1,\ldots,a_r$. Define

$$
P_0=1,\qquad P_j=\prod_{i=1}^{j}a_i.
$$

The list stores $[P_0,P_1,\ldots,P_r]$, so its length is $r+1$. The initial $1$ is the empty product and lets a query covering the entire nonzero suffix divide by $P_0$.

- When a nonzero value arrives, append the previous product multiplied by that value.
- When a zero arrives, reset the list to $[1]$, making $r=0$.
- If $k>r$, the requested suffix crosses the latest zero, so return $0$.
- Otherwise, return $P_r/P_{r-k}$.

The code checks $k\ge\operatorname{len}(\mathrm{prefix})$, which is equivalent to $k>r$. In Python, the indices $-1$ and $-1-k$ select $P_r$ and $P_{r-k}$ respectively. The quotient is exact because the denominator is a product of the same initial factors as the numerator.

## Why it works

Initially, the prefix list correctly represents an empty suffix with product $1$. Adding a nonzero value extends every represented full-prefix product by that value, so appending the new product preserves the invariant. Adding zero starts a new nonzero suffix, correctly represented by $[1]$.

If a query uses more than the $r$ values in the current suffix, it must include the latest zero and therefore has product $0$. The problem guarantees enough total values for every query; before any zero appears, such an oversized query cannot occur.

For $k\le r$, dividing $P_r$ by $P_{r-k}$ cancels precisely the first $r-k$ factors, leaving exactly the last $k$. All stored factors are nonzero, so division is safe. These two cases cover every valid query.

## Complexity

Let $m$ be the number of method calls and $r$ the current nonzero suffix length. Integer arithmetic is constant time under the problem’s 32-bit product guarantee.

- **Query:** $O(1)$ time in both implementations.
- **Python add:** $O(1)$ amortized time. List growth can copy existing entries, and resetting can take $O(r)$ time to release the old list in CPython. Across all calls, each stored entry is created and discarded at most once, so total work is $O(m)$.
- **Python space:** $O(r+1)$ for the current prefix list, and $O(m)$ in the worst case.
- **C add:** $O(1)$ worst-case time, including a zero reset, because the array is allocated in advance.
- **C space:** $O(C)$ for reserved capacity $C=40{,}001$, independent of the current suffix length. No per-call allocation is required.

## Example

After adding $3,0,2,5,4$, the stored prefix products are $[1,2,10,40]$. The earlier $3$ was discarded when zero arrived.

| Query | Calculation | Result |
| --- | --- | --- |
| Last $2$ values | $40/2$ | $20$ |
| Last $3$ values | $40/1$ | $40$ |
| Last $4$ values | Includes the latest zero | $0$ |

Adding $8$ extends the list to $[1,2,10,40,320]$. The product of the last $2$ values is then $320/10=32$.

## Takeaway

Prefix products support range queries through exact division, but zeros break that operation. Treat each zero as a boundary: retain only the products after it and detect crossing queries from the stored suffix length.

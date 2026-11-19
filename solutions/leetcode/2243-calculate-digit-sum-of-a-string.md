---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 2243
title: Calculate Digit Sum of a String
date: "2026-11-16"
daily: "2026-11-16"
difficulty: easy
topic: String simulation
summary: Repeatedly replace consecutive digit groups with their sums, preserving group order. Includes my Python solution and a matching C implementation.
lead: Apply digit-group sum rounds until the string length is no greater than the group size.
problem_url: https://leetcode.com/problems/calculate-digit-sum-of-a-string/
permalink: online-judge/leetcode/problem-2243.html
solutions:
  - label: Python
    path: solutions/leetcode/2243-calculate-digit-sum-of-a-string.py
  - label: C
    path: solutions/leetcode/2243-calculate-digit-sum-of-a-string.c
---

## Key idea

Simulate the requested rounds. While $|s|>k$, split the current string into consecutive groups of at most $k$ characters. Add the digits in each group, convert the sum back into decimal text, and concatenate those strings in the original group order.

Build the entire next string before replacing the current one. This ensures every group in a round reads from the same version of the input.

## Solution

{% solution solutions %}

The Python code preserves my implementation from the screenshot. The slice handles the final short group automatically, and `str(group_sum)` retains every digit of a multi-digit sum.

The C version uses two allocated buffers: one for the current round and one for the next. It converts a sum to decimal digits in reverse order, then appends them in forward order. The `do ... while` ensures a zero sum produces the character `0` rather than an empty string.

The original input is not modified. The C function returns an allocated string for the caller to free, and returns `NULL` if allocation fails. Both buffers include space for the terminating null character.

## Group boundaries and zero sums

The final group may contain fewer than $k$ digits and must still be processed. Each group sum contributes its own decimal representation, including zero. Converting the entire merged string to an integer would incorrectly remove leading zeros.

A multi-digit sum is not reduced immediately to one digit. For example, a group whose digits sum to $13$ contributes the two characters `13`. Any further grouping happens only in the next round, and only if the merged string is still longer than $k$.

## Why it works

At the start of a round, the current string matches the result of all previous rounds. The group loop visits consecutive blocks of size $k$, except possibly the last block. Each block is replaced by exactly the decimal representation of its digit sum, and the replacements are appended in order. The newly built string is therefore precisely the required result of one round.

Replacing the current string after that loop preserves this invariant. The outer loop stops exactly when the length is at most $k$, so the returned string is the required final result.

The length never increases: a group of $g$ digits has sum at most $9g$, whose decimal representation uses at most $g$ digits. A round need not strictly shorten the string, however: with $k=2$, `99` becomes `18`, still two characters. If a full round preserves the length, the multi-digit group sums strictly reduce the total sum of the string’s digits. Otherwise, the length decreases. This finite progress guarantees termination for the problem’s $k\ge2$ constraint.

## C buffer capacity

Because no round increases the string length, two buffers of $n+1$ bytes are sufficient, where $n$ is the original length. The extra byte stores the null terminator. Under the problem bounds, each group sum is at most $900$, so the C integer sum and temporary digit array are sufficient.

Swapping the buffer pointers after each round avoids copying the completed next string back into the old buffer.

## Complexity

Let $n$ be the initial string length, $R$ the number of transformation rounds, and $L_t$ the input length of round $t$.

- **Digit scanning:** $O(L_t)$ per round. Across all groups, each input character is read once.
- **C time:** $O(n+\sum_t L_t)$, bounded by $O(n+Rn)$. The initial copy takes $O(n)$, including when no round is needed; writing the group sums takes no more characters than the round consumed.
- **Python time:** repeated immutable-string concatenation can copy the already-built prefix. A conservative implementation-independent upper bound is $O(n+\sum_t L_t^2)$, or $O(n+Rn^2)$. Interpreter optimizations can reduce that copying; the code retains my original `temp += ...` form.
- **Extra space:** $O(n)$ for intermediate strings or the two C buffers. Peak storage does not accumulate across rounds.

These are conservative bounds expressed using the number of rounds; they do not assume that the length strictly shrinks in every round. The problem limits the initial length to $100$.

## Example

For $s=\texttt{11111222223}$ and $k=3$:

| Round | Groups | Group sums | New string |
| --- | --- | --- | --- |
| $1$ | `111`, `112`, `222`, `23` | $3,4,6,5$ | `3465` |
| $2$ | `346`, `5` | $13,5$ | `135` |

The final length is $3$, so the process stops. For `00000000` with $k=3$, the three zero-sum groups produce `000`, which must keep all three zeros.

## Takeaway

When simulating string transformations, keep round boundaries explicit, preserve zero-valued groups, and remember that a group sum can contain multiple digits. Build each round separately so new digits are never mixed with unprocessed old digits.

---
layout: "solution.njk"
tags: ["solution"]
platform: "project-euler"
problem_id: 2
title: "Even Fibonacci Numbers"
date: "2026-10-25"
problem_url: "https://projecteuler.net/problem=2"
summary: "Generate Fibonacci terms below four million and sum the even-valued terms. Includes Python and C solutions."
lead: "Find the sum of the even-valued terms in the Fibonacci sequence whose values do not exceed four million."
topic: "Fibonacci sequence"
permalink: "online-judge/project-euler/problem-2.html"
solutions: [{"label":"Python","path":"solutions/project-euler/0002-even-fibonacci-numbers.py"},{"label":"C","path":"solutions/project-euler/0002-even-fibonacci-numbers.c"}]
---

## Key idea

Generate Fibonacci numbers in order, keeping only the previous two values. Add a term to the total when it is even, and stop once the next term reaches the four-million limit.

## Solution

{% solution solutions %}

Both versions output $4613732$. The C version corrects the bound to four million and uses `long long` for the sequence and sum.

## Why it works

The initialization sets $a$, $b$, and $c$ to the first three Fibonacci values, 1, 1, and 2. Each loop advances the pair by one term, so every Fibonacci value below the limit is visited exactly once. The parity check adds exactly the even-valued terms, and the loop stops before adding any term at or above four million. Therefore, the total is the requested sum.

## Complexity

Let $n$ be the upper bound on Fibonacci values.

-   **Time:** $O(\log n)$ iterations, because Fibonacci values grow exponentially. In a bit-complexity model for Python's arbitrary-precision integers, additions grow with the number of digits, giving $O((\log n)^2)$ bit operations.
-   **Extra space:** $O(1)$ stored values; with arbitrary-precision integers, those values require $O(\log n)$ bits.

## Takeaway

Tracking only the previous two terms avoids storing the whole sequence. Check the bound carefully in both language versions; the C code originally used 400,000 instead of 4,000,000.

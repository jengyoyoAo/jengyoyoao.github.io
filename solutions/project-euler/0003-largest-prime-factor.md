---
layout: "solution.njk"
tags: ["solution"]
platform: "project-euler"
problem_id: 3
title: "Largest Prime Factor"
date: "2026-10-25"
problem_url: "https://projecteuler.net/problem=3"
summary: "Factor 600,851,475,143 by trial division and find its largest prime factor. Includes Python and C solutions."
lead: "Find the largest prime factor of 600,851,475,143."
topic: "Prime factorization"
permalink: "online-judge/project-euler/problem-3.html"
solutions: [{"label":"Python","path":"solutions/project-euler/0003-largest-prime-factor.py"},{"label":"C","path":"solutions/project-euler/0003-largest-prime-factor.c"}]
---

## Key idea

I used trial division: when a factor divides the number, divide it out and check the smaller result again. After checking 2, test odd factors. If no factor up to the square root divides the remaining number, that remainder is the largest prime factor.

## Solution

{% solution solutions %}

Both versions output $6857$ for this input. The Python code stays close to my original recursive version. I adjusted the C entry point to `int main(void)` and added parentheses to the `MAX` macro. The Python even-number branch does not update $\mathrm{ans}$, but that does not affect this odd input.

## Why it works

The code tries factors in increasing order. When a factor divides the number, it divides it out and continues with the smaller quotient. The last remaining value greater than 1 has no smaller factor left to check, so it is prime. For the given input, both programs print $6857$.

## Complexity

Let $n$ be the original input value.

-   **Time:** $O(\sqrt{n})$ trial divisions in the worst case.
-   **Extra space:** $O(\log n)$ recursion depth in the Python version; $O(1)$ in the C version.

## Takeaway

Removing a factor makes the next search smaller. This is the straightforward trial-division approach I used; the C version uses a standard `int main(void)` entry point, while the Python even-number case could be handled more completely by updating $\mathrm{ans}$ before recursing.

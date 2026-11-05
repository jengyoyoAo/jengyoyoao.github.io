---
layout: "solution.njk"
tags: ["solution"]
platform: "project-euler"
problem_id: 4
title: "Largest Palindrome Product"
date: "2026-10-25"
problem_url: "https://projecteuler.net/problem=4"
summary: "Find the largest palindrome product of two three-digit numbers. Includes Python and C solutions, search pruning, and notes on faster approaches."
lead: "Find the largest palindrome made from the product of two three-digit numbers."
topic: "Palindromes"
permalink: "online-judge/project-euler/problem-4.html"
solutions: [{"label":"Python","path":"solutions/project-euler/0004-largest-palindrome-product.py"},{"label":"C","path":"solutions/project-euler/0004-largest-palindrome-product.c"}]
extraSolution1: [{"label":"Python · Prefix approach","path":"solutions/project-euler/0004-largest-palindrome-product-prefix.py"}]
---

## Key idea

Check products of two three-digit numbers and reverse the digits to test whether each product is a palindrome. Keep the largest palindrome found instead of returning at the first match.

The two implementations use the same arithmetic palindrome check: repeatedly take the last digit with modulo 10, append it to the reversed number, and remove it from the original number using integer division. Starting the inner loop at $j = i$ avoids checking both $i \times  j$ and $j \times  i$.

For each fixed $i$, the product decreases as $j$ decreases. If $\mathrm{num} \le  \mathrm{ans}$, break only the inner loop: smaller values of $j$ cannot improve the maximum. The next outer-loop iteration must still be checked because its inner loop restarts at a larger $j$.

## Solution

{% solution solutions %}

Both the Python and C versions print $906609$ = 993 × 913. The C solution is my revised version. Its palindrome helper uses `int` for the original and reversed values; both fit the products in this problem on a 32-bit-or-larger `int` implementation.

## Why it works

Every unordered pair of three-digit factors appears with 100 ≤ $j$ ≤ $i$ ≤ 999. Reversing the decimal digits identifies palindromes, and $\mathrm{ans}$ stores the largest one seen. For a fixed $i$, products decrease as $j$ decreases, so once a product is no larger than $\mathrm{ans}$, the remaining products in that inner loop cannot improve it. The final result is therefore the largest palindrome product.

## Complexity

-   **Time:** $O(n^2 \log n)$, where $n$ is the upper factor bound; each digit reversal takes $O(\log n)$ time.
-   **Extra space:** $O(1)$.

## A faster approach: mirror a $\mathrm{prefix}$

Generate six-digit palindromes in descending order by mirroring a three-digit $\mathrm{prefix}$. For example, $\mathrm{prefix}$ 906 becomes 906609. Instead of testing whether every product is a palindrome, test whether each palindrome has two three-digit factors.

Every six-digit palindrome is divisible by 11 because its alternating digit sum is zero. Since 11 is prime, at least one factor must be divisible by 11. The inner loop therefore checks three-digit multiples of 11 and verifies that the quotient is also a three-digit integer. Palindromes are generated from largest to smallest, so the first valid factorization gives the maximum.

{% solution extraSolution1 %}

This implementation searches only six-digit palindromes. It finds 906609 = 993 × 913, so shorter palindromes cannot improve the result for this problem. A general solver must also search shorter palindromes if no six-digit candidate has a valid factorization.

### Complexity

Let $n$ be the upper factor bound for a generalized search over $d$-digit factors. There are $O(n)$ mirrored candidates, each requiring $O(\log n)$ digit operations to construct and at most $O(n)$ trial divisions. The total is $O(n \log n + n^2)$ = $O(n^2)$ time and $O(1)$ extra integer variables under the same unit-cost arithmetic model used above. The factor-of-11 shortcut reduces constant work, not the Big O.

### A small improvement to the pair search

The main solutions can also stop the outer loop when $i \cdot  i \le  \mathrm{ans}$. Because $j \le  i$, no product in the current or later rows can improve the maximum. This pruning does not change the stated $O(n^2 \log n)$ upper bound.

## Takeaway

Descending loop variables do not guarantee that all products are visited in descending order. Keep a running maximum, and only stop a search when the remaining candidates cannot improve it.

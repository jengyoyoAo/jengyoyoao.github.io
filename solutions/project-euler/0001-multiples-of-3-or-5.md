---
layout: "solution.njk"
tags: ["solution"]
platform: "project-euler"
problem_id: 1
title: "Multiples of 3 or 5"
date: "2026-10-25"
problem_url: "https://projecteuler.net/problem=1"
summary: "Scan the numbers below 1,000 and sum those divisible by 3 or 5. Includes Python and C solutions."
lead: "Find the sum of all natural numbers below 1,000 that are multiples of 3 or 5."
topic: "Implementation"
permalink: "online-judge/project-euler/problem-1.html"
solutions: [{"label":"Python","path":"solutions/project-euler/0001-multiples-of-3-or-5.py"},{"label":"C","path":"solutions/project-euler/0001-multiples-of-3-or-5.c"}]
---

## Key idea

Check every integer below the limit. If it is divisible by 3 _or_ 5, add it to a running total. Using a single OR condition means a number divisible by both (such as 15) is counted only once.

## Solution

{% solution solutions %}

Both versions output $233168$. The C loop includes zero, which does not affect the sum.

## Why it works

Each number below 1,000 is examined exactly once. The divisibility condition accepts precisely the numbers that are multiples of 3 or 5, and each accepted number is added once. Therefore, the final total is the required sum.

## Complexity

Let $n$ be the exclusive upper limit of the scan.

-   **Time:** $O(n)$, because the loop checks each number below the limit once.
-   **Extra space:** $O(1)$, because the algorithm uses a fixed number of variables.

## Takeaway

A direct scan keeps the solution simple and easy to verify. The OR condition is important: it avoids counting multiples of 15 twice.

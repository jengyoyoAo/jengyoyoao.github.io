---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 1267
title: Count Servers that Communicate
date: "2026-11-08"
daily: "2026-11-08"
difficulty: medium
topic: Row and column counting
summary: Count servers in each row and column, then count each server that shares either with another server. Includes Python and C solutions with a two-pass correctness analysis.
lead: Count the servers that share a row or column with at least one other server.
problem_url: https://leetcode.com/problems/count-servers-that-communicate/
permalink: online-judge/leetcode/problem-1267.html
solutions:
  - label: Python
    path: solutions/leetcode/1267-count-servers-that-communicate.py
  - label: C
    path: solutions/leetcode/1267-count-servers-that-communicate.c
---

## Key idea

A server communicates if there is another server in the same row **or** the same column. Instead of comparing every pair of servers, first count how many servers each row and column contains.

For a server at $(i,j)$, check whether $\mathrm{row\_count}[i]>1$ or $\mathrm{col\_count}[j]>1$. A count greater than one means that the row or column contains a server besides the current one.

## Solution

{% solution solutions %}

The first pass builds the row and column totals. The second pass checks each server using those totals. Rows with no servers are skipped in the second pass; this saves work for empty rows but does not change the worst-case time complexity. The input grid is not modified.

The C version follows the same two-pass approach. `calloc` initializes the row and column counters to zero, and both arrays are freed before returning. It uses LeetCode’s nonempty rectangular-grid input contract; allocation failure returns `-1`, outside the valid result range. Both language versions have the same time and extra-space bounds.

## Why it works

After the first pass, $\mathrm{row\_count}[i]$ equals the number of servers in row $i$, and $\mathrm{col\_count}[j]$ equals the number in column $j$, because each occupied cell increments exactly its own row and column counters.

Consider an occupied cell $(i,j)$. If either corresponding count exceeds one, another server shares that row or column, so this server can communicate. Conversely, if this server can communicate, another server must be in the same row or column, so at least one of the two counts exceeds one. The condition is therefore both necessary and sufficient.

Each occupied cell is visited once in the second pass and contributes at most one to the answer. The OR condition avoids double-counting servers that have neighbors in both directions. Empty cells never contribute.

## Complexity

Let $m$ be the number of rows and $n$ the number of columns.

- **Time:** $O(mn)$. The first pass visits every cell, and the second visits at most every cell once more.
- **Extra space:** $O(m+n)$ for the row and column counters.

The empty-row check improves some inputs but cannot reduce the first pass, which already scans the entire grid.

## Example

For the grid $[[1,0],[1,1]]$, the row totals are $[1,2]$ and the column totals are $[2,1]$.

- The server at $(0,0)$ shares its column with another server.
- The server at $(1,0)$ shares both its row and column, but is counted only once.
- The server at $(1,1)$ shares its row with another server.

The result is $3$. In contrast, the grid $[[1,0],[0,1]]$ contains two isolated servers and gives $0$.

## Takeaway

When a condition depends only on row or column membership, aggregate counts can replace pairwise comparisons. Count qualifying servers, rather than communicating pairs, and use OR to combine the two directions.

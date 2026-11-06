---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 2747
title: Count Zero Request Servers
date: "2026-11-06"
daily: "2026-11-06"
difficulty: medium
topic: Offline queries & sliding window
summary: Replace a full scan for every query with sorted queries, two moving pointers, and per-server request counts. Includes my original TLE attempt and optimized Python and C solutions.
lead: For each query, count servers with no requests in its inclusive time window.
problem_url: https://leetcode.com/problems/count-zero-request-servers/
permalink: online-judge/leetcode/problem-2747.html
solutions:
  - label: Python
    path: solutions/leetcode/2747-count-zero-request-servers.py
  - label: C
    path: solutions/leetcode/2747-count-zero-request-servers.c
bruteForce:
  - label: Python · Original attempt (TLE)
    path: solutions/leetcode/2747-count-zero-request-servers-brute-force.py
---

## Key idea

For a query time $t$, the relevant requests are those in the inclusive interval $[t-x,t]$. Instead of rebuilding the active-server set for every query, sort the logs by time and process queries in increasing time order. Since $x$ is fixed, both window boundaries move only forward.

Maintain a request count for each server in the current window. The variable $\mathrm{active\_servers\_count}$ tracks how many servers have a positive count. The result is $n-\mathrm{active\_servers\_count}$.

## Solution

{% solution solutions %}

This is the optimized algorithm from my screenshot. LeetCode provides the `List` typing name. `logs.sort(...)` reorders the input logs in place; `queries` stays unchanged. Saving each query’s original index lets the algorithm restore the required output order.

The C version uses `qsort` for both orderings and an array indexed by server ID instead of a dictionary. It reorders the input log pointers but does not modify the log rows or the query array. The returned answer array is allocated with `malloc` for the caller to free. The temporary arrays are freed before returning; allocation failures return `NULL` with `returnSize` set to zero.

## Why my original attempt timed out

{% solution bruteForce %}

For every query, the original code initializes a dictionary for all $n$ servers and scans all request logs. Tracking whether a server was already counted avoids duplicate counting, but it does not avoid repeatedly scanning the same logs. With $m$ logs and $q$ queries, this takes $O(q(n+m))$ time. I received TLE with this version.

The optimized solution reuses the previous window rather than starting over. Each log is added at most once and removed at most once across all queries.

## Moving the window

1. Add every unprocessed log whose time is at most $\mathrm{window\_end}$. Increase the active-server total only when a server’s count changes from zero to one.
2. Remove logs whose time is strictly less than $\mathrm{window\_start}$. Decrease the active-server total only when a server’s count drops to zero.
3. Store the inactive-server count at the query’s original index.

The endpoints matter: requests exactly at $t-x$ or $t$ must stay in the window. This is why insertion uses `<= window_end` and removal uses `< window_start`.

A server can receive several requests inside the window. A Boolean flag is not enough for removal: deleting one request must not mark the server inactive if another request remains. The dictionary therefore stores frequencies.

## Why it works

After adding logs up to the current query time, the right pointer lies just after every log with time at most $t$. Removing logs before $t-x$ leaves exactly the logs in $[t-x,t]$ between the two pointers. A server has a positive stored count exactly when it received at least one request in that interval.

The active-server total changes only on zero-to-one and one-to-zero transitions, so it always equals the number of distinct servers represented in the window. Subtracting that total from $n$ gives the required number of zero-request servers.

Sorting queries is safe because each query is evaluated with its own window and written back to its original index. The left-removal loop is also safe: $x$ is nonnegative, so every log before the window start has already been added by the right pointer.

## Complexity

Let $n$ be the number of servers, $m$ the number of logs, and $q$ the number of queries. Dictionary operations are assumed to take expected constant time.

- **Original attempt:** $O(q(n+m))$ time; $O(n)$ auxiliary space, plus $O(q)$ for the returned answers.
- **Optimized expected time:** $O(m\log m+q\log q+m+q)$. Sorting dominates for large inputs; the two pointers traverse the logs only once each.
- **Optimized extra space:** $O(q+\min(n,m))$ for the indexed queries and server-count dictionary, plus up to $O(m)$ temporary space for Python’s log sorting. Including the output, the overall worst-case extra space is $O(m+q)$.

The C implementation initializes an array of $n+1$ counters, so its explicit auxiliary storage is $O(n+q)$ including the returned array, plus any internal `qsort` workspace. The C standard does not guarantee `qsort` complexity. With an $O(k\log k)$ sorting implementation, its total time is $O(n+m\log m+q\log q+m+q)$; the window scan itself uses direct array access and takes $O(m+q)$ time without hash-table assumptions.

Zero-count dictionary entries are retained, so the dictionary can contain servers seen in earlier windows, not just servers active in the current window. The time bound is expected rather than a worst-case guarantee for arbitrary hash collisions.

## Example

With $n=3$, logs $[[1,3],[2,6],[1,5]]$, $x=5$, and queries $[10,11]$:

- At $t=10$, the window is $[5,10]$. Servers $1$ and $2$ are active, so the result is $1$.
- At $t=11$, the window becomes $[6,11]$. The request at time $5$ leaves, leaving only server $2$ active, so the result is $2$.

Return $[1,2]$. Requests at the left endpoint remain included, such as the request at time $6$ for the second query.

## Takeaway

When queries can be processed offline, sorting them can turn repeated scans into a single forward-moving window. Store original indices to restore order, and use frequencies when removing one event must not remove an entire entity.

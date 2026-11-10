---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 3693
title: Climbing Stairs II
date: "2026-11-10"
daily: "2026-11-10"
difficulty: medium
topic: Dynamic programming
summary: Keep only the previous three DP values to find the minimum climbing cost. Includes my constant-space Python solution and an equivalent C version.
lead: Reach the final step at minimum total cost using jumps of one, two, or three steps.
problem_url: https://leetcode.com/problems/climbing-stairs-ii/
permalink: online-judge/leetcode/problem-3693.html
solutions:
  - label: Python
    path: solutions/leetcode/3693-climbing-stairs-ii.py
  - label: C
    path: solutions/leetcode/3693-climbing-stairs-ii.c
---

## Key idea

Let $\mathrm{dp}[i]$ be the minimum total cost to reach step $i$. The last jump can come only from steps $i-1$, $i-2$, or $i-3$, provided the source index is nonnegative. Compare these possibilities instead of exploring every path.

The conceptual base state is $\mathrm{dp}[0]=0$. Rather than keeping the full DP array, the implementation stores just the three values needed by the next transition in $a$, $b$, and $c$.

## Solution

{% solution solutions %}

This uses my updated Python code from the screenshot. Python evaluates the entire right-hand side of the tuple assignment before updating $a$, $b$, and $c$, so the transition uses the old values of all three states.

The C version uses a temporary variable, `next`, before shifting the states. It needs no allocated DP array and does not change the input costs. Under the problem bounds on a 32-bit `int` implementation, the candidate totals fit in `int`: even the all-one-step path costs at most $10001n$, and adding a destination cost and a jump penalty stays below $10001n+9\le1{,}000{,}100{,}009$.

## Rolling states

Before processing array index $i$, $c$ represents the minimum cost to reach step $i$, $b$ represents step $i-1$, and $a$ represents step $i-2$, once those steps exist. The next state, for destination step $i+1$, is:

$$
\mathrm{next}=\mathrm{costs}[i]+\min(c+1,b+4,a+9).
$$

After computing it, shift the states to $(b,c,\mathrm{next})$.

### Why zero initialization works here

The code initializes all three states to zero, even though two predecessors do not yet exist. These placeholder candidates cannot win in the first two iterations:

- At $i=0$, the valid one-step candidate has extra cost $1$, smaller than the placeholder costs $4$ and $9$.
- At $i=1$, the valid two-step candidate from step $0$ has extra cost $4$, smaller than the remaining invalid three-step candidate’s $9$.
- From $i=2$ onward, all three predecessor states correspond to real steps.

The same destination cost is added to every candidate, so it does not change those comparisons. This initialization is justified by this particular jump-cost structure; it is not a general rule for rolling DP.

## State transition

For a jump of length $k$, the cost is the destination step’s cost plus $k^2$. Thus:

$$
\mathrm{dp}[i] = \min_{1\le k\le\min(3,i)}\left(\mathrm{dp}[i-k]+\mathrm{costs}[i-1]+k^2\right).
$$

The squared jump costs are $1$, $4$, and $9$. The step cost is paid at the destination, so all three transitions use the same array element $\mathrm{costs}[i-1]$.

The statement numbers step costs from $1$ to $n$, while Python lists are zero-indexed. Step $i$ therefore corresponds to `costs[i - 1]`, not `costs[i]`. The mathematical recurrence includes only valid predecessors. In the rolling implementation, the zero-initialized placeholders are harmless for the reasons above, and no negative array indices are used.

## Why it works

The base state is correct because the starting step requires no payment. Assume the DP values for steps before $i$ are optimal.

Every valid path to $i$ ends with a jump of length $1$, $2$, or $3$. Removing that last jump leaves a path to $i-k$, whose minimum cost is already known. Adding the destination cost and squared jump length gives the cheapest path for that last-jump choice. Taking the minimum over all valid choices therefore gives the optimal cost to reach $i$.

The loop processes steps in increasing order, preserving the three predecessor values before each update. The first two iterations handle the initial boundary correctly, and every later iteration applies the recurrence to three real states. By induction, the final value $c=\mathrm{dp}[n]$ is the minimum total cost.

## Complexity

- **Time:** $O(n)$. Each step considers at most three transitions.
- **Extra space:** $O(1)$ for three rolling states and a fixed number of temporary variables.

The DP table below is only an explanation of the conceptual states; neither displayed implementation stores that table.

## Example

For $n=4$ and $\mathrm{costs}=[1,2,3,4]$, the DP values are:

| Step $i$ | Minimum cost $\mathrm{dp}[i]$ |
| --- | --- |
| $0$ | $0$ |
| $1$ | $2$ |
| $2$ | $5$ |
| $3$ | $9$ |
| $4$ | $13$ |

One optimal path is $0\to1\to2\to4$, with payments $2+3+8=13$.

## Takeaway

A small set of possible last moves often leads to a direct DP recurrence. Keep the destination cost separate from the jump-length cost, translate indices carefully, and retain only the predecessor states that the next transition actually needs.

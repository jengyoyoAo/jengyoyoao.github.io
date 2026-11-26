---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 3360
title: Stone Removal Game
date: "2026-11-26"
daily: "2026-11-26"
difficulty: easy
topic: Simulation & turn parity
summary: Simulate the forced removals and track whether the number of completed turns is odd. Includes my Python solution and a matching C version.
lead: Alice and Bob alternate removing stones, starting at ten and decreasing the required amount by one each turn.
problem_url: https://leetcode.com/problems/stone-removal-game/
permalink: online-judge/leetcode/problem-3360.html
solutions:
  - label: Python
    path: solutions/leetcode/3360-stone-removal-game.py
  - label: C
    path: solutions/leetcode/3360-stone-removal-game.c
---

## Key idea

Every turn has a fixed required removal, so there are no choices to optimize. Simulate the turns until the remaining pile is too small. The player who completed the last move wins.

Alice moves first, so she wins after an odd number of completed turns. A parity flag avoids storing the full turn count.

## Solution

{% solution solutions %}

The Python code preserves my screenshot solution. The C version follows the same updates and returns a Boolean result using `stdbool.h`.

## Tracking the turns

The variable $n$ is the remaining number of stones, $k$ is the next required removal, and $\mathrm{win}$ is the parity of the number of completed turns.

Initially, $k=10$ and $\mathrm{win}=0$. While $n\ge k$, remove exactly $k$ stones, toggle $\mathrm{win}$ between $0$ and $1$, and decrease $k$ for the next player.

The equality in $n\ge k$ matters: removing exactly the remaining pile is a valid move. Once $n<k$, the current player loses. Returning whether $\mathrm{win}=1$ tells us whether Alice made the last successful move.

## Why it works

Before each loop iteration, the simulated pile matches the real game, and $k$ is precisely the amount required on the current turn. If the pile has enough stones, the rules force the same subtraction performed by the loop. Toggling the flag preserves the parity of successful moves, and decreasing $k$ prepares the next turn.

When the condition fails, the next player cannot move. An odd number of successful moves means Alice moved last and Bob loses; an even number means Alice is the player who cannot move. This also handles no successful moves: the flag stays zero and Alice loses immediately.

The problem restricts the initial pile to $1\le n\le50$. Completing the first eight moves would require $10+9+\cdots+3=52$ stones, so at most seven moves succeed. The required amount therefore remains positive throughout this implementation; it never reaches a zero-removal turn.

## Complexity

- **Time:** $O(1)$. Under the stated bounds, the loop completes at most seven iterations.
- **Extra space:** $O(1)$, using only the remaining pile, next removal amount, and parity flag.

## Examples

For an initial pile of $12$, Alice removes $10$, leaving $2$. Bob needs $9$ and cannot move, so the result is `true`.

For an initial pile of $19$, Alice removes $10$ and Bob removes $9$. Alice then needs $8$ with no stones left, so the result is `false`.

For an initial pile of $1$, Alice cannot make the first move, so the result is `false`.

## Takeaway

When every move is forced, simulating the rules and tracking turn parity is enough. No game-tree search or dynamic programming is needed.

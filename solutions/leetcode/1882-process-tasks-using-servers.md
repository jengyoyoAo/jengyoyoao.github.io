---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 1882
title: Process Tasks Using Servers
date: "2026-11-07"
daily: "2026-11-07"
difficulty: medium
topic: Two min-heaps & event-driven simulation
summary: Replace repeated sorting and list scans with two min-heaps for available and busy servers. Includes my original TLE simulation and Python/C heap solutions.
lead: Assign arriving tasks in queue order to the available server with the smallest weight, breaking ties by index.
problem_url: https://leetcode.com/problems/process-tasks-using-servers/
permalink: online-judge/leetcode/problem-1882.html
solutions:
  - label: Python
    path: solutions/leetcode/1882-process-tasks-using-servers.py
  - label: C
    path: solutions/leetcode/1882-process-tasks-using-servers.c
simulation:
  - label: Python · Original attempt (TLE)
    path: solutions/leetcode/1882-process-tasks-using-servers-simulation.py
---

## Key idea

Two different priorities are needed:

- **Available servers:** a min-heap ordered by $(\mathrm{weight},\mathrm{index})$ chooses the next server.
- **Working servers:** a min-heap ordered by $(\mathrm{free\_time},\mathrm{weight},\mathrm{index})$ finds the next completion event.

Task $i$ arrives at time $i$. Process tasks in increasing index order and first set $\mathrm{time}=\max(\mathrm{time},i)$. If no server is available, jump directly to the next completion time instead of simulating every second.

Before assigning the task, move **all** servers whose finish times are at most the current time into the available heap. Then choose the server with the smallest weight and index.

## Solution

{% solution solutions %}

The Python version keeps my min-heap implementation. The C version implements both binary min-heaps explicitly, with a shared comparison routine that uses the appropriate ordering. It builds the initial available heap bottom-up and allocates room for $n$ servers in each heap. Every server is in exactly one heap at a time.

The C result is allocated with `malloc` for the caller to free. Temporary heap arrays are freed before returning, and allocation failures return `NULL` with `returnSize` set to zero. Neither implementation changes the input arrays.

## Why my first simulation timed out

{% solution simulation %}

My original version uses task and server objects, a FIFO queue, and lists for available and working servers. It already jumps to the earliest completion when all servers are busy, but it still repeatedly sorts the available list and scans the working list.

Removing the first available server with `pop(0)` shifts the remaining list elements. Deleting completed tasks from the working list can also shift elements. These repeated operations become expensive with many tasks and servers. I received TLE with this version.

The heap solution replaces repeated global sorting and scans with logarithmic insertion and removal. It also avoids a separate waiting queue: iterating through tasks by index already preserves their FIFO order, even when the simulated time has advanced beyond their arrival times.

## Why all completed servers must be released

Several servers can become free at the same time, or the current time may already be later than multiple finish times. Releasing just one server can choose the wrong weight or index for the next task. The loop with the condition $\mathrm{free\_time}\le\mathrm{time}$ restores every eligible server before selecting from the available heap.

For example, let the server weights be $[5,1]$ and the task durations be $[3,2,1]$. Server $1$ takes the first task at time $0$, and server $0$ takes the second at time $1$. Both finish at time $3$. The third task has been waiting since time $2$, so it must choose server $1$, whose weight is smaller. The result is $[1,0,1]$.

## Why it works

Before each assignment, the current time is at least the task’s arrival time and never moves backward. If the available heap is empty, the earliest finish time is the earliest moment when the task can start. Advancing directly to it skips no possible assignment.

After transferring every completed server, the available heap contains exactly the servers free at the current time. Its minimum therefore satisfies the required weight and index priority. Recording the chosen server’s finish time as $\mathrm{time}+\mathrm{task\_time}$ restores the busy-server heap for later tasks.

Processing tasks in increasing index order respects the queue. Each task is assigned as soon as possible after all preceding tasks have been assigned, with the correct server priority. By repeating this step, the entire assignment sequence follows the scheduling rules.

## Complexity

Let $n$ be the number of servers and $m$ the number of tasks.

- **Heap solutions — time:** $O(n+m\log(n+1))$. Initial heap construction takes $O(n)$. Each task causes a constant number of heap operations, amortized across the full run: each busy-server entry is inserted once and removed at most once.
- **Heap solutions — auxiliary space:** $O(n)$, excluding the $O(m)$ returned answer array.
- **Original simulation — time:** a conservative upper bound is $O(n\log(n+1)+mn\log(n+1))$. Repeated sorts can touch up to $n$ servers, and list scans and shifting deletions add more work. Time jumps avoid iterating through every second of a long processing interval, but do not remove these costs.
- **Original simulation — space:** $O(n+m)$ for server/task objects, lists, the queue, and the answer.

The $\log(n+1)$ notation also covers the single-server case, where processing tasks is linear in $m$.

## C time values need 64 bits

Finish times can exceed a 32-bit signed integer. With one server and $200{,}000$ tasks of duration $200{,}000$, the final finish time reaches $40{,}000{,}000{,}000$. The C implementation therefore uses `long long` for the simulated clock and server finish times. Python integers already grow as needed.

## Example

For server weights $[3,3,2]$ and task durations $[1,2,3,2,1,2]$, the assigned server indices are $[2,2,0,2,1,2]$. At time $5$, multiple servers have completed tasks; returning all of them to the available heap lets the algorithm apply the weight/index priority correctly.

## Takeaway

Use separate heaps when the next event and the next resource follow different orderings. An event-driven clock avoids waiting one second at a time, while processing tasks in arrival order can eliminate an explicit waiting queue.

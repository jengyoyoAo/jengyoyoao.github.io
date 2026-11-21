---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 3331
title: Find Subtree Sizes After Changes
date: "2026-11-21"
daily: "2026-11-21"
difficulty: medium
topic: Tree DFS & backtracking
summary: Find each node’s closest matching ancestor with DFS and backtracking, then rebuild the tree and count subtree sizes. Includes Python and C implementations.
lead: Reattach each node to its nearest original ancestor with the same character, then find every subtree size.
problem_url: https://leetcode.com/problems/find-subtree-sizes-after-changes/
permalink: online-judge/leetcode/problem-3331.html
solutions:
  - label: Python
    path: solutions/leetcode/3331-find-subtree-sizes-after-changes.py
  - label: C
    path: solutions/leetcode/3331-find-subtree-sizes-after-changes.c
---

## Key idea

All parent changes happen simultaneously, so each new parent must be chosen using the original tree. First traverse that tree to record the closest matching ancestor for every node. Then build the final tree and use another DFS to count subtree sizes.

During the first DFS, keep the most recent node for each character on the current ancestor path. Restore the previous entry when returning from a node, so nodes from a different branch cannot be mistaken for ancestors.

## Solution

{% solution solutions %}

This preserves my Python solution. LeetCode supplies the `List` typing name.

The C version follows the same two phases with explicit stacks. Its first DFS stores the previous matching ancestor for each node and restores it on exit. The adjacency arrays store the first child and next sibling; the first traversal consumes the child cursors, then rebuilds them using the final parents. The second traversal records parents before children, then processes that order backwards to accumulate subtree sizes.

The C function leaves the input unchanged, frees its workspace, and returns a dynamically allocated result for the caller to free.

## Finding the new parents

Let $n$ be the number of nodes. Initially, $\mathrm{new\_parent}$ is a copy of the original parent array, so a node without a matching ancestor keeps its parent.

Before visiting a node $u$, $\mathrm{last\_seen}[c]$ stores the closest ancestor of $u$ whose character is $c$, if one exists. Check this entry before inserting $u$ itself; otherwise the node would incorrectly select itself as its parent.

Save the previous entry, make $u$ the most recent node for its character, and visit its original children. After those recursive calls, restore the saved entry or remove the character if it was previously absent.

This restoration is essential. Without it, a node visited in an earlier sibling branch could remain in the dictionary even though it is not an ancestor of the next node.

## Counting the final subtrees

After every new parent is known, construct $\mathrm{new\_adj}$ from those choices. For each node $u$, the second DFS computes

$$
\mathrm{ans}[u] = 1 + \sum_{v\text{ is a final child of }u} \mathrm{ans}[v].
$$

The extra $1$ counts the node itself. A leaf therefore has subtree size $1$.

## Why it works

The first DFS maintains the ancestor-path invariant: entering a node adds it to the path, and leaving restores exactly the state from before that visit. The most recent matching entry is therefore the nearest matching original ancestor. If no entry exists, retaining the original parent follows the rule directly.

Every final parent is still an original ancestor. Each parent edge leads to a smaller original depth, so the changes cannot introduce a cycle, and every node still reaches the root. The rebuilt structure is thus a rooted tree.

Finally, the second DFS finishes every child before adding its size to the parent. Since child subtrees are disjoint, adding their sizes and the node itself gives precisely the final subtree size for every node.

## Complexity

- **Time:** $O(n)$. Building the two adjacency lists and traversing each tree visits each node and edge a constant number of times. The dictionary contains at most $26$ character entries.
- **Extra space:** $O(n)$ for the adjacency lists, copied parents, result, and recursive call stacks. The recursion depth is $O(h)$ for tree height $h$, which can be $O(n)$.

Both implementations use $O(n)$ time and extra space. The C stacks and traversal order are stored in dynamically allocated arrays.

The Python implementation uses recursion. A very deep tree can exceed Python’s recursion limit; an explicit stack can implement the same enter/exit traversal without relying on recursive calls.

## Example

For $\mathrm{parent}=[-1,0,0,1,1,1]$ and $s=\texttt{abaabc}$, node $3$ has character $\texttt{a}$. Its parent, node $1$, has character $\texttt{b}$, while its next ancestor, node $0$, has character $\texttt{a}$. Node $3$ therefore moves from node $1$ to node $0$.

Node $1$ retains nodes $4$ and $5$ as children, so its final subtree size is $3$. The root still contains all six nodes, and the remaining nodes are leaves. The result is $[6,3,1,1,1,1]$.

## Takeaway

A dictionary used during tree DFS can represent the current path rather than the whole traversal history. Saving and restoring its entries makes nearest-ancestor queries efficient while keeping sibling branches independent.

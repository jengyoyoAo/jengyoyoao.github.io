---
layout: solution.njk
tags: [solution]
platform: leetcode
problem_id: 3789
title: Minimum Cost to Acquire Required Items
date: "2026-11-11"
daily: "2026-11-11"
difficulty: medium
topic: Greedy & cost comparison
summary: Split requirements into shared units and a one-sided remainder, choosing the cheapest option for each. Includes my constant-time Python solution and an equivalent C version.
lead: Meet both item requirements at minimum cost, allowing contributions to exceed the requested amounts.
problem_url: https://leetcode.com/problems/minimum-cost-to-acquire-required-items/
permalink: online-judge/leetcode/problem-3789.html
solutions:
  - label: Python
    path: solutions/leetcode/3789-minimum-cost-to-acquire-required-items.py
  - label: C
    path: solutions/leetcode/3789-minimum-cost-to-acquire-required-items.c
---

## Key idea

First pair as many required units as possible: $\mathrm{same}=\min(\mathrm{need1},\mathrm{need2})$. Each pair needs one contribution to both requirements. Meet it with either one combined item or two separate items, choosing the smaller cost.

After those pairs, at most one requirement has a positive remainder. For each remaining unit, compare a dedicated item with a combined item. A combined item may still be cheaper even though its other contribution is no longer needed.

## Solution

{% solution solutions %}

This preserves the Python implementation from my screenshot. It does not enumerate purchases or loop over the potentially large requirements.

The C version uses the same formula and returns `long long`. Under the problem bounds, individual costs, their pairwise sum, and requirement counts fit in a 32-bit `int`, but the total can reach $10^{15}$. Each product is cast to `long long` **before** multiplication so the intermediate calculation does not overflow a 32-bit integer. Both versions use constant extra space.

## Cost formula

The effective unit costs are:

$$
c=\min(\mathrm{cost1}+\mathrm{cost2},\mathrm{costBoth}),
$$

$$
c_1=\min(\mathrm{cost1},\mathrm{costBoth}),\qquad
c_2=\min(\mathrm{cost2},\mathrm{costBoth}).
$$

Let $s=\min(\mathrm{need1},\mathrm{need2})$, $r_1=\mathrm{need1}-s$, and $r_2=\mathrm{need2}-s$. Then the minimum total is:

$$
cs+c_1r_1+c_2r_2.
$$

In the code, these quantities are named `same`, `rem1`, and `rem2`. At least one remainder is zero, so there is no remaining pair of unmet contributions to combine.

## Why excess contributions matter

The requirements are lower bounds, not exact purchase counts. Once one requirement is satisfied, buying additional combined items is still allowed.

For example, take $\mathrm{cost1}=3$, $\mathrm{cost2}=2$, $\mathrm{costBoth}=1$, and requirements $(3,2)$. Buy two combined items for the shared part, then one more combined item for the remaining type-1 contribution. The total is $3$, even though the type-2 contribution also reaches $3$.

Charging the leftover unit at `cost1` without comparing it with `costBoth` would miss this cheaper solution. The same reasoning applies when one requirement is zero from the beginning.

## Why it works

Assume $\mathrm{need1}\ge\mathrm{need2}$; the other case is symmetric. If we buy $k$ combined items, the cheapest way to complete the purchase costs:

$$
f(k)=k\,\mathrm{costBoth}
+\max(\mathrm{need1}-k,0)\,\mathrm{cost1}
+\max(\mathrm{need2}-k,0)\,\mathrm{cost2}.
$$

For the first $\mathrm{need2}$ combined items, each replaces one dedicated item of both types. Its net cost change is $\mathrm{costBoth}-\mathrm{cost1}-\mathrm{cost2}$. This gives the shared-unit comparison used by $c$.

After that, another combined item replaces only a type-1 item. Its net cost change becomes $\mathrm{costBoth}-\mathrm{cost1}$, giving the remainder comparison used by $c_1$. The second change is no smaller than the first because costs are positive. Therefore, if buying combined items for the remainder is beneficial, buying them for the shared part is beneficial too. The two comparisons cannot produce conflicting decisions.

Past $k=\mathrm{need1}$, every additional combined item adds positive cost without satisfying any unmet requirement, so it cannot improve the answer. The formula selects the cheapest choices in both useful ranges and is therefore optimal.

## Complexity

- **Time:** $O(1)$, using a fixed number of comparisons and arithmetic operations.
- **Extra space:** $O(1)$, using a fixed number of variables.

These bounds use the usual unit-cost integer arithmetic model. Python integers handle the large products without fixed-width overflow.

## Example

With $\mathrm{cost1}=5$, $\mathrm{cost2}=4$, $\mathrm{costBoth}=15$, and requirements $(2,3)$:

- The shared unit cost is $c=\min(5+4,15)=9$.
- There are $2$ shared units and $1$ remaining type-2 unit.
- The remaining unit costs $c_2=\min(4,15)=4$.

The total is $2\cdot9+1\cdot4=22$. If both requirements are zero, all unit counts are zero and the result is $0$.

## Takeaway

Before choosing a greedy purchase rule, check whether extra contributions are allowed. Splitting shared demand from leftover demand turns large quantities into a few unit-cost comparisons.

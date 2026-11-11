---
layout: mathematics-section.njk
tags: [math-section]
title: "§1.3 Subspaces"
summary: "The subspace test, examples from coordinates and calculus, and the geometry of subspaces."
topic: Mathematics
date: 2026-11-11
updated: 2026-11-11
draft: false
permalink: notes/linear-algebra/subspaces/index.html
---

Throughout this section, $V$ is a vector space over $\mathbb F$, where $\mathbb F=\R$ or $\C$.

::: definition [1.3.1] Subspace
A subset $U\subseteq V$ is a **subspace** of $V$ if it is a vector space with the same addition, scalar multiplication, and additive identity as $V$.
:::

## The subspace test

::: proposition [1.3.1] Conditions for a subspace
A subset $U\subseteq V$ is a subspace $\iff$ the following three conditions hold.

**Contains zero**

<div class="math-example-indented">

$$0\in U.$$

</div>

**Closed under addition**

<div class="math-example-indented">

$$u+w\in U\qquad\forall u,w\in U.$$

</div>

**Closed under scalar multiplication**

<div class="math-example-indented">

$$au\in U\qquad\forall a\in\mathbb F,\ \forall u\in U.$$

</div>
:::

<details class="note-proof">
<summary>Proof</summary>

$(\Rightarrow)$ These conditions follow from the vector-space axioms on $U$.

$(\Leftarrow)$ Closure makes the inherited operations well-defined on $U$. Moreover,

$$u\in U\implies -u=(-1)u\in U.$$

Thus $U$ contains zero and additive inverses. All remaining axioms are inherited from $V$, so $U$ is a vector space. $\blacksquare$

</details>

::: remark [1.3.1] Nonempty is enough, with closure
Under scalar closure, $U\ne\varnothing$ implies $0\in U$: choose $u\in U$, then $0u=0\in U$. In practice, checking $0\in U$ is usually quickest.
:::

## Examples and nonexamples

### A coordinate constraint

For $b\in\mathbb F$, let

$$U_b=\{(x_1,x_2,x_3,x_4)\in\mathbb F^4:x_3=5x_4+b\}.$$

Then $U_b$ is a subspace $\iff b=0$.

<details class="note-proof">
<summary>Verification</summary>

If $U_b$ is a subspace, $0\in U_b\implies 0=5\cdot0+b\implies b=0$.

Conversely, if $b=0$, then $0\in U_0$, and for $u,w\in U_0$, $a\in\mathbb F$,

$$
\begin{aligned}
(u+w)_3&=u_3+w_3=5(u_4+w_4)=5(u+w)_4,\\
(au)_3&=au_3=5au_4=5(au)_4.
\end{aligned}
$$

Hence $u+w,au\in U_0$. $\blacksquare$

</details>

### Function spaces

The following are subspaces with pointwise operations:

- $C([0,1],\R)\subseteq\R^{[0,1]}$: continuous real-valued functions on $[0,1]$.
- $\{f:\R\to\R:f\text{ is differentiable}\}\subseteq\R^{\R}$.

Both contain the zero function. Sums and scalar multiples preserve continuity or differentiability.

For a derivative constraint, let

$$D_b=\{f:(0,3)\to\R:f\text{ is differentiable and }f'(2)=b\}.$$

Again, $D_b$ is a subspace $\iff b=0$: the zero function requires $b=0$, while

$$f,g\in D_0\implies (af+cg)'(2)=af'(2)+cg'(2)=0\qquad\forall a,c\in\R.$$

### Sequences converging to zero

$$c_0=\{(z_1,z_2,\ldots)\in\C^\infty:\lim_{k\to\infty}z_k=0\}$$

is a subspace of $\C^\infty$. Indeed, the zero sequence belongs to $c_0$, and

$$z_k\to0,\ w_k\to0\implies az_k+bw_k\to0\qquad\forall a,b\in\C.$$

## Geometric picture

The smallest subspace of $V$ is $\{0\}$; the largest is $V$. The empty set is never a subspace because it contains no zero vector.

| Ambient space | All possible subspaces |
| --- | --- |
| $\R^2$ | $\{0\}$, lines through the origin, $\R^2$ |
| $\R^3$ | $\{0\}$, lines through the origin, planes through the origin, $\R^3$ |

The requirement “through the origin” is essential. Proving that this list is exhaustive will be easier after introducing dimension.

## Continue §1.3

<a class="notebook-section-card" href="/notes/linear-algebra/sums-of-subspaces/"><span class="eyebrow-small">§1.3.1</span><strong>Sums of Subspaces</strong><span>Build the smallest subspace containing several given subspaces.</span><span class="text-link">Read subsection →</span></a>

<a class="notebook-section-card" href="/notes/linear-algebra/direct-sums/"><span class="eyebrow-small">§1.3.2</span><strong>Direct Sums</strong><span>Unique decompositions, the zero test, and intersections.</span><span class="text-link">Read subsection →</span></a>

<a class="notebook-section-card" href="/notes/linear-algebra/exercises-1-3/"><span class="eyebrow-small">Practice · §1.3</span><strong>Exercises for §1.3</strong><span>24 problems with collapsible solutions on subspaces, sums, and direct sums.</span><span class="text-link">Read exercises →</span></a>

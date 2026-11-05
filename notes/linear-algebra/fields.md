---
layout: mathematics-section.njk
tags: [math-section]
title: "§1.1.4 Digression on Fields"
summary: "Optional background: the scalar systems behind vector spaces."
topic: Mathematics
date: 2026-11-06
draft: false
permalink: notes/linear-algebra/fields/index.html
---

## Do I need this now?

**This is optional background for a first reading.** For this book, continue using $\mathbb F=\R$ or $\C$. The main idea is that vector-space calculations depend on the arithmetic rules of the scalars, not necessarily on their being real or complex numbers.

::: definition [1.1.4.1] Field
A **field** is a set $K$ with addition and multiplication defined within $K$, and distinct elements $0$ and $1$, satisfying these rules:

- Both operations are associative and commutative.
- $0$ is the additive identity, and $1$ is the multiplicative identity.
- Every element has an additive inverse.
- Every nonzero element has a multiplicative inverse.
- Multiplication distributes over addition.

Thus subtraction and division by a nonzero element are available within the same scalar system.
:::

## Examples and a non-example

- $\Q$, $\R$, and $\C$ are fields under their usual arithmetic.
- $\Z$ is not a field: the reciprocal of $2$ is not an integer.
- The **two-element field**, written $\mathbb F_2=\{0,1\}$, uses arithmetic modulo $2$.

In $\mathbb F_2$, the operation tables are

<div class="math-example-indented">

$$
\begin{array}{c|cc}
+&0&1\\\hline
0&0&1\\
1&1&0
\end{array}
\qquad
\begin{array}{c|cc}
\cdot&0&1\\\hline
0&0&0\\
1&0&1
\end{array}.
$$

</div>

In particular, $1+1=0$. This is consistent field arithmetic, not ordinary integer addition.

## What carries over to linear algebra?

Coordinate lists $K^n$, coordinatewise addition, and scalar multiplication can be defined over any field $K$. Many vector-space definitions and proofs only use the field rules and therefore carry over unchanged.

::: remark [1.1.4.1] Check additional hypotheses
Not every theorem about real or complex vector spaces automatically holds over every field. Inner products need extra care, and some results depend on conditions such as $1+1\ne0$. Always retain the hypotheses used in a proof.
:::

<details class="note-proof">
<summary>Optional terminology: algebraically closed</summary>

A field $K$ is **algebraically closed** when every nonconstant polynomial with coefficients in $K$ has a root in $K$. The field $\C$ has this property; $\R$ does not, because $t^2+1$ has no real root.

This condition explains some theorems that specifically assume complex scalars. It does not justify replacing every complex-number hypothesis without checking the proof.

</details>

## What to remember

For now: **$\mathbb F$ is the field of scalars, and this book mainly uses $\R$ and $\C$.** Learn the full generalization when studying abstract algebra or when a proof needs a different field.

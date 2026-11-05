---
layout: mathematics-section.njk
tags: [math-section]
title: "§1.1.2 Lists"
summary: "Ordered entries, list equality, and the difference between lists and sets."
topic: Mathematics
date: 2026-11-06
draft: false
permalink: notes/linear-algebra/lists/index.html
---

## Starting with $\R^2$ and $\R^3$

Real pairs describe points in a plane; real triples describe points in ordinary three-dimensional space:

<div class="math-example-indented">

$$
\begin{aligned}
&\R^2=\{(x,y):x,y\in\R\},\\
&\R^3=\{(x,y,z):x,y,z\in\R\}.
\end{aligned}
$$

</div>

Lists provide the notation needed to extend this idea to any finite dimension.

::: definition [1.1.2.1] List and length
For a nonnegative integer $n$, a **list of length $n$** has $n$ entries arranged in a specified order. Entries may be numbers or other mathematical objects.

**Equality of lists** requires equal lengths and equal entries at every corresponding position:

$$
(x_1,\ldots,x_n)=(y_1,\ldots,y_n)
\quad\Longleftrightarrow\quad
x_j=y_j\text{ for every }j\in\{1,\ldots,n\}.
$$
:::

## Notation and boundary cases

- An **$n$-tuple** is another name for a list of length $n$.
- Write lists with parentheses: $(z_1,\ldots,z_n)$.
- Length two gives an **ordered pair**; length three gives an **ordered triple**.
- The **empty list** $()$ has length $0$.
- In this terminology, lists are finite. An infinite sequence $(x_1,x_2,\ldots)$ is not a list.

::: remark [1.1.2.1] Lists versus sets
Lists retain both position and repeated entries. Sets disregard order and repeated occurrences.
:::

## Examples: order and repetition

**Order matters for lists**

<div class="math-example-indented">

$$
\begin{aligned}
&(3,5)\ne(5,3),\\
&\{3,5\}=\{5,3\}.
\end{aligned}
$$

</div>

**Repetitions affect list length**

<div class="math-example-indented">

$$
\begin{aligned}
&(4,4)\ne(4,4,4),\\
&\{4,4\}=\{4,4,4\}=\{4\}.
\end{aligned}
$$

</div>

The first lists differ in their positions; the second lists differ in length. Neither distinction changes the corresponding sets.

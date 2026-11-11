---
layout: mathematics-section.njk
tags: [math-section]
title: "§1.3.2 Direct Sums"
summary: "Unique decompositions, a test using zero, and the intersection criterion for two subspaces."
topic: Mathematics
date: 2026-11-11
updated: 2026-11-11
draft: false
permalink: notes/linear-algebra/direct-sums/index.html
---

## Unique decomposition

::: definition [1.3.2.1] Direct sum
The sum $V_1+\cdots+V_m$ is a **direct sum** if each vector in it has exactly one representation

$$v=v_1+\cdots+v_m,\qquad v_k\in V_k\quad(1\le k\le m).$$

In this case we write $V_1\oplus\cdots\oplus V_m$. The symbol $\oplus$ records uniqueness, in addition to being a sum.
:::

### A plane and an axis

Let

$$U=\{(x,y,0):x,y\in\mathbb F\},\qquad W=\{(0,0,z):z\in\mathbb F\}.$$

Then $\mathbb F^3=U\oplus W$, since

$$(x,y,z)=(x,y,0)+(0,0,z)$$

and the coordinates uniquely determine both summands.

More generally, if $V_k$ is the $k$th coordinate axis of $\mathbb F^n$, then

$$\mathbb F^n=V_1\oplus\cdots\oplus V_n,$$

with the unique decomposition $(x_1,\ldots,x_n)=x_1e_1+\cdots+x_ne_n$.

## It suffices to test zero

::: proposition [1.3.2.1] Zero-decomposition criterion
The sum $V_1+\cdots+V_m$ is direct $\iff$

$$v_1+\cdots+v_m=0,\quad v_k\in V_k\implies v_1=\cdots=v_m=0.$$
:::

<details class="note-proof">
<summary>Proof</summary>

$(\Rightarrow)$ Since $0=0+\cdots+0$, uniqueness forces every decomposition of zero to be this one.

$(\Leftarrow)$ Suppose

$$v=v_1+\cdots+v_m=u_1+\cdots+u_m,\qquad v_k,u_k\in V_k.$$

Subtracting gives

$$0=(v_1-u_1)+\cdots+(v_m-u_m),\qquad v_k-u_k\in V_k.$$

The assumed condition yields $v_k-u_k=0\ \forall k$, hence $v_k=u_k\ \forall k$. $\blacksquare$

</details>

## Two subspaces: an intersection test

::: proposition [1.3.2.2] Direct sum of two subspaces
For subspaces $U,W\subseteq V$,

$$U+W\text{ is direct}\iff U\cap W=\{0\}.$$
:::

<details class="note-proof">
<summary>Proof</summary>

$(\Rightarrow)$ If $v\in U\cap W$, then

$$0=\underbrace{v}_{\in U}+\underbrace{(-v)}_{\in W}.$$

The zero-decomposition criterion gives $v=0$. Thus $U\cap W=\{0\}$.

$(\Leftarrow)$ If $u+w=0$ with $u\in U$, $w\in W$, then

$$u=-w\in U\cap W=\{0\}\implies u=w=0.$$

Apply the zero-decomposition criterion. $\blacksquare$

</details>

Writing $V=U\oplus W$ requires **both** $V=U+W$ and $U\cap W=\{0\}$.

## A sum that is not direct

In $\mathbb F^3$, let

$$
\begin{aligned}
V_1&=\{(x,y,0):x,y\in\mathbb F\},\\
V_2&=\{(0,0,z):z\in\mathbb F\},\\
V_3&=\{(0,t,t):t\in\mathbb F\}.
\end{aligned}
$$

Their sum is $\mathbb F^3$, because

$$(x,y,z)=(x,y,0)+(0,0,z)+(0,0,0).$$

However, zero has two different decompositions:

$$
\begin{aligned}
0&=(0,0,0)+(0,0,0)+(0,0,0),\\
0&=(0,1,0)+(0,0,1)+(0,-1,-1).
\end{aligned}
$$

Each summand belongs to its corresponding $V_k$, so the sum is **not direct**.

::: remark [1.3.2.1] Pairwise intersections are insufficient
In this same example,

$$V_1\cap V_2=V_1\cap V_3=V_2\cap V_3=\{0\}.$$

Thus pairwise trivial intersections do not guarantee a direct sum when there are three or more subspaces. Use the zero-decomposition criterion to test all summands together.
:::

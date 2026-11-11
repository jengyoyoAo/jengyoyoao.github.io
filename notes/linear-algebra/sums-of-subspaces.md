---
layout: mathematics-section.njk
tags: [math-section]
title: "§1.3.1 Sums of Subspaces"
summary: "Adding subspaces, computing examples, and the smallest containing subspace."
topic: Mathematics
date: 2026-11-11
updated: 2026-11-11
draft: false
permalink: notes/linear-algebra/sums-of-subspaces/index.html
---

## Definition

::: definition [1.3.1.1] Sum of subspaces
For subspaces $V_1,\ldots,V_m\subseteq V$, their **sum** is

$$V_1+\cdots+V_m=\{v_1+\cdots+v_m:v_k\in V_k,\ 1\le k\le m\}.$$

Thus an element of the sum is obtained by choosing one vector from each subspace and adding them.
:::

## Examples

### Two coordinate axes

In $\mathbb F^3$, let

$$U=\{(x,0,0):x\in\mathbb F\},\qquad W=\{(0,y,0):y\in\mathbb F\}.$$

Then

$$U+W=\{(x,y,0):x,y\in\mathbb F\},$$

because $(x,y,0)=(x,0,0)+(0,y,0)$.

::: remark [1.3.1.1] Sum versus union
Usually $U\cup W$ is not a subspace. Here $(1,0,0),(0,1,0)\in U\cup W$, but

$$(1,1,0)\notin U\cup W,\qquad (1,1,0)\in U+W.$$

The union contains the two axes; the sum contains the entire coordinate plane.
:::

### A sum in four coordinates

Let

$$U=\{(a,a,b,b):a,b\in\mathbb F\},\qquad W=\{(c,c,c,d):c,d\in\mathbb F\}.$$

Then

$$U+W=\{(x,x,y,z):x,y,z\in\mathbb F\}.$$

<details class="note-proof">
<summary>Verification by two inclusions</summary>

For $u=(a,a,b,b)\in U$, $w=(c,c,c,d)\in W$,

$$u+w=(a+c,a+c,b+c,b+d).$$

Hence the first two coordinates of $u+w$ agree, proving $\subseteq$.

Conversely,

$$(x,x,y,z)=\underbrace{(x,x,y,y)}_{\in U}+\underbrace{(0,0,0,z-y)}_{\in W},$$

which proves $\supseteq$. $\blacksquare$

</details>

## The smallest containing subspace

::: proposition [1.3.1.1] Minimality of the sum
$S=V_1+\cdots+V_m$ is the **smallest subspace** of $V$ containing $V_1,\ldots,V_m$. Precisely,

$$V_k\subseteq S\quad(1\le k\le m),$$

and for any subspace $T\subseteq V$,

$$V_k\subseteq T\ \forall k\implies S\subseteq T.$$
:::

<details class="note-proof">
<summary>Proof</summary>

First, $0=0+\cdots+0\in S$. For $u_k,v_k\in V_k$ and $a\in\mathbb F$,

$$
\begin{aligned}
(u_1+\cdots+u_m)+(v_1+\cdots+v_m)&=(u_1+v_1)+\cdots+(u_m+v_m)\in S,\\
a(v_1+\cdots+v_m)&=av_1+\cdots+av_m\in S.
\end{aligned}
$$

The subspace test gives that $S$ is a subspace.

For $v_k\in V_k$, inserting zeros in the other positions shows $v_k\in S$. Thus $V_k\subseteq S$.

Finally, if a subspace $T$ contains each $V_k$, then

$$v_k\in V_k\subseteq T\ \forall k\implies v_1+\cdots+v_m\in T.$$

Hence $S\subseteq T$. $\blacksquare$

</details>

A sum plays the role of a union within vector spaces: it is the smallest **subspace** containing all the given subspaces.

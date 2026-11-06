---
layout: mathematics-section.njk
tags: [math-section]
title: "§1.2 Definition of Vector Space"
summary: "Vector-space axioms, sequence and function spaces, and the first consequences of the axioms."
topic: Mathematics
date: 2026-11-06
updated: 2026-11-06
draft: false
permalink: notes/linear-algebra/vector-spaces/index.html
---

## From coordinate lists to abstract vectors

The operations on $\mathbb F^n$ suggest rules that make sense without coordinates. A vector space keeps these rules while allowing its elements to be lists, sequences, functions, or other objects. Here $\mathbb F=\R$ or $\C$.

::: definition [1.2.1] Addition and scalar multiplication
An **addition** on a set $V$ is a map

$$
+:V\times V\to V,\qquad (u,v)\mapsto u+v.
$$

A **scalar multiplication** is a map

$$
\mathbb F\times V\to V,\qquad(a,v)\mapsto av.
$$

Both operations return elements of $V$: closure is already part of these map definitions.
:::

::: definition [1.2.2] Vector space
A **vector space over $\mathbb F$** is a set $V$ with these two operations satisfying the following axioms.

**Commutativity of addition**

<div class="math-example-indented">

$$
u+v=v+u\qquad\forall u,v\in V.
$$

</div>

**Associativity**

<div class="math-example-indented">

$$
\begin{aligned}
&(u+v)+w=u+(v+w)\qquad\forall u,v,w\in V,\\
&(ab)v=a(bv)\qquad\forall a,b\in\mathbb F,\ \forall v\in V.
\end{aligned}
$$

</div>

**Additive identity**

<div class="math-example-indented">

$$
\exists 0_V\in V\quad\forall v\in V:\quad v+0_V=v.
$$

</div>

**Additive inverses**

<div class="math-example-indented">

$$
\forall v\in V\quad\exists w\in V:\quad v+w=0_V.
$$

</div>

**Scalar identity**

<div class="math-example-indented">

$$
1v=v\qquad\forall v\in V.
$$

</div>

**Distributivity**

<div class="math-example-indented">

$$
\begin{aligned}
&a(u+v)=au+av,\\
&(a+b)v=av+bv,
\end{aligned}
\qquad\forall a,b\in\mathbb F,\ \forall u,v\in V.
$$

</div>
:::

::: definition [1.2.3] Vectors, real spaces, and complex spaces
Elements of $V$ are called **vectors** or **points**. A vector space over $\R$ is a **real vector space**; one over $\C$ is a **complex vector space**.
:::

The scalar field is part of the structure, not merely a label. For example, $\C$ can be viewed over $\C$, or over $\R$ by restricting the allowed scalars. Unless otherwise stated, $V$ denotes a vector space over $\mathbb F$.

## Examples beyond finite coordinate lists

### The zero space and coordinate spaces

- $\{0\}$ is a vector space with just one vector.
- $\mathbb F^n$ is a vector space with coordinatewise operations.

### Infinite sequences

Let

$$
\mathbb F^\infty=\{(x_1,x_2,\ldots):x_k\in\mathbb F\ \forall k\ge1\}.
$$

Define the operations coordinatewise:

<div class="math-example-indented">

$$
\begin{aligned}
&(x_1,x_2,\ldots)+(y_1,y_2,\ldots)=(x_1+y_1,x_2+y_2,\ldots),\\
&a(x_1,x_2,\ldots)=(ax_1,ax_2,\ldots).
\end{aligned}
$$

</div>

Every axiom follows from the corresponding scalar identity in each coordinate. The zero vector is $(0,0,\ldots)$, and the inverse of $(x_k)$ is $(-x_k)$. These are **infinite sequences**, not finite lists in the terminology of §1.1.2. No convergence condition is imposed.

::: definition [1.2.4] Function space
For a set $S$, write

$$
\mathbb F^S=\{f:S\to\mathbb F\}.
$$

Its operations are **pointwise**:

<div class="math-example-indented">

$$
\begin{aligned}
&(f+g)(x)=f(x)+g(x),\\
&(af)(x)=a\,f(x),
\end{aligned}
\qquad\forall x\in S.
$$

</div>
:::

For nonempty $S$, these operations make $\mathbb F^S$ a vector space. Its zero and inverse are the functions satisfying

<div class="math-example-indented">

$$
\begin{aligned}
&0_S(x)=0,\\
&(-f)(x)=-f(x),
\end{aligned}
\qquad\forall x\in S.
$$

</div>

<details class="note-proof">
<summary>Verification: transfer the scalar rules pointwise</summary>

For instance, $\forall x\in S$,

$$
\begin{aligned}
((f+g)+h)(x)&=(f(x)+g(x))+h(x)\\
&=f(x)+(g(x)+h(x))=(f+(g+h))(x),\\
(a(f+g))(x)&=a(f(x)+g(x))\\
&=af(x)+ag(x)=(af+ag)(x).
\end{aligned}
$$

The remaining axioms follow the same way. Equality at every input means equality of functions. $\blacksquare$

</details>

For example, $\R^{[0,1]}$ consists of **all** real-valued functions on $[0,1]$; continuity is not required. Finite coordinate lists and sequences can be identified with function spaces:

<div class="math-example-indented">

$$
\begin{aligned}
&\mathbb F^n\ \longleftrightarrow\ \mathbb F^{\{1,\ldots,n\}},\\
&\mathbb F^\infty\ \longleftrightarrow\ \mathbb F^{\{1,2,\ldots\}},
\end{aligned}
$$

</div>

using $x(k)=x_k$.

## Uniqueness comes from the axioms

::: proposition [1.2.1] Unique additive identity
There is exactly one additive identity in $V$.
:::

<details class="note-proof">
<summary>Proof</summary>

If $0$ and $0'$ are additive identities, then

$$
0'=0'+0=0+0'=0.
$$

Here the first and last equalities use the identity properties; the middle equality uses commutativity. $\blacksquare$

</details>

::: proposition [1.2.2] Unique additive inverse
Each $v\in V$ has exactly one additive inverse.
:::

<details class="note-proof">
<summary>Proof</summary>

Existence is an axiom. If $v+w=0$ and $v+w'=0$, then

$$
\begin{aligned}
w&=w+0=w+(v+w')\\
&=(w+v)+w'=0+w'=w'.
\end{aligned}
$$

Thus the inverse is unique. $\blacksquare$

</details>

::: definition [1.2.5] Negation and subtraction
Write **$-v$** for the unique additive inverse of $v$, and define **subtraction** by

$$
w-v=w+(-v).
$$
:::

## Zero scalars and zero vectors

::: proposition [1.2.3] Zero scalar times a vector

$$
0_{\mathbb F}v=0_V\qquad\forall v\in V.
$$
:::

<details class="note-proof">
<summary>Proof</summary>

Let $q=0_{\mathbb F}v$. Distributivity gives

$$
q=(0_{\mathbb F}+0_{\mathbb F})v=q+q.
$$

Add $-q$ to both sides:

$$
0_V=(-q)+q=(-q)+(q+q)=((-q)+q)+q=q.
$$

Therefore $0_{\mathbb F}v=0_V$. $\blacksquare$

</details>

::: proposition [1.2.4] A scalar times the zero vector

$$
a0_V=0_V\qquad\forall a\in\mathbb F.
$$
:::

<details class="note-proof">
<summary>Proof</summary>

Let $q=a0_V$. By the other distributive law,

$$
q=a(0_V+0_V)=a0_V+a0_V=q+q.
$$

Adding $-q$ to both sides gives $0_V=q$. Hence $a0_V=0_V$. $\blacksquare$

</details>

::: remark [1.2.1] Two distinct zero identities
In $0_{\mathbb F}v=0_V$, the input zero is a scalar. In $a0_V=0_V$, it is a vector. Both statements need proof: the vector-space axioms connect scalar and vector addition through the distributive laws.
:::

::: proposition [1.2.5] Multiplication by minus one

$$
(-1)v=-v\qquad\forall v\in V.
$$
:::

<details class="note-proof">
<summary>Proof</summary>

$$
\begin{aligned}
v+(-1)v&=1v+(-1)v\\
&=(1+(-1))v=0_{\mathbb F}v=0_V.
\end{aligned}
$$

Thus $(-1)v$ is an additive inverse of $v$. Uniqueness gives $(-1)v=-v$. $\blacksquare$

</details>

## What to remember

The vectors need not be arrows or lists. What matters is the set together with its scalar field and operations. Use only the axioms and previously proved results; familiar-looking zero and minus-sign rules must first be derived.

---
layout: mathematics-section.njk
tags: [math-section]
title: "Exercises for §1.2"
summary: "Eight problems on vector-space axioms, function spaces, and complexification."
topic: Mathematics
date: 2026-11-06
updated: 2026-11-06
draft: false
permalink: notes/linear-algebra/exercises-1-2/index.html
---

These problems follow Exercises 1B in the reference book (printed pages 16–17), with wording adapted for these notes. Here $V$ is a vector space over $\mathbb F\in\{\R,\C\}$ unless specified otherwise. Try each problem before expanding its solution.

<section class="note-exercise" aria-labelledby="exercise-1">
<h3 id="exercise-1">Exercise 1.2.1 · Negating twice</h3>

Prove $-(-v)=v\quad\forall v\in V$.

<details class="note-proof">
<summary>Solution</summary>

Since $v+(-v)=0$, commutativity gives

$$
(-v)+v=0.
$$

Thus $v$ is an additive inverse of $-v$. By uniqueness, $-(-v)=v$. $\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-2">
<h3 id="exercise-2">Exercise 1.2.2 · A zero scalar product</h3>

For $a\in\mathbb F$ and $v\in V$, suppose $av=0$. Prove $a=0$ or $v=0$.

<details class="note-proof">
<summary>Solution</summary>

If $a=0$, the conclusion holds. If $a\ne0$, its scalar inverse exists, so

$$
v=1v=(a^{-1}a)v=a^{-1}(av)=a^{-1}0=0.
$$

Hence $av=0\implies a=0\text{ or }v=0$. $\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-3">
<h3 id="exercise-3">Exercise 1.2.3 · A unique solution</h3>

Given $v,w\in V$, show that $v+3x=w$ has exactly one solution $x\in V$.

<details class="note-proof">
<summary>Solution</summary>

Over $\mathbb F=\R$ or $\C$, the scalar $3$ is nonzero. Define

$$
x=\frac13(w-v).
$$

Then $v+3x=v+(w-v)=w$, proving existence. Conversely,

$$
v+3x=w\implies 3x=w-v\implies x=\frac13(w-v),
$$

so every solution has this form. $\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-4">
<h3 id="exercise-4">Exercise 1.2.4 · Why the empty set fails</h3>

Which single vector-space axiom fails for the empty set, with the unique possible operations on it?

<details class="note-proof">
<summary>Solution</summary>

The additive identity axiom requires

$$
\exists 0_V\in V\quad\forall v\in V:\quad v+0_V=v.
$$

This is impossible for $V=\varnothing$. The other axioms quantify over vectors in $V$, so they hold vacuously. The maps $V\times V\to V$ and $\mathbb F\times V\to V$ both have empty domains and exist as empty functions. $\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-5">
<h3 id="exercise-5">Exercise 1.2.5 · Replacing the inverse axiom</h3>

Keep the other vector-space axioms. Show that the additive inverse axiom can be replaced by $0_{\mathbb F}v=0_V\quad\forall v\in V$, without changing the class of structures defined.

<details class="note-proof">
<summary>Solution</summary>

**Original axioms $\Rightarrow$ replacement.** Write $q=0_{\mathbb F}v$. Distributivity gives $q=q+q$; adding an additive inverse of $q$ gives $q=0_V$.

**Replacement $\Rightarrow$ additive inverses.** Assume the remaining axioms and $0_{\mathbb F}v=0_V$. For $v\in V$, scalar multiplication already defines $w=(-1)v$. Then

$$
v+w=1v+(-1)v=(1+(-1))v=0_{\mathbb F}v=0_V.
$$

Thus $w$ is an additive inverse. This step does not assume that $-v$ already exists. $\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-6">
<h3 id="exercise-6">Exercise 1.2.6 · Adding two infinity symbols</h3>

Let $W=\R\cup\{\infty,-\infty\}$, where the two new symbols are distinct and are not real numbers. Real arithmetic is unchanged. For $t\in\R$, define

$$
\begin{aligned}
&t\infty=\begin{cases}-\infty,&t<0,\\0,&t=0,\\\infty,&t>0,\end{cases}\\
&t(-\infty)=\begin{cases}\infty,&t<0,\\0,&t=0,\\-\infty,&t>0.\end{cases}
\end{aligned}
$$

Addition involving the new symbols is

$$
\begin{aligned}
&t+\infty=\infty+t=\infty+\infty=\infty,\\
&t+(-\infty)=(-\infty)+t=(-\infty)+(-\infty)=-\infty,\\
&\infty+(-\infty)=(-\infty)+\infty=0.
\end{aligned}
$$

Is $W$ a real vector space under these operations?

<details class="note-proof">
<summary>Solution</summary>

**No:** addition is not associative. For example,

$$
\begin{aligned}
(\infty+(-\infty))+1&=0+1=1,\\
\infty+((-\infty)+1)&=\infty+(-\infty)=0.
\end{aligned}
$$

Since $1\ne0$, one required axiom fails. That alone rules out a vector space. $\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-7">
<h3 id="exercise-7">Exercise 1.2.7 · Functions with vector values</h3>

Let $S\ne\varnothing$, and let $V^S$ be all functions $S\to V$. Define addition and scalar multiplication on $V^S$ and prove it is a vector space over the same field as $V$.

<details class="note-proof">
<summary>Solution</summary>

Define the operations pointwise, $\forall s\in S$:

$$
(f+g)(s)=f(s)+g(s),\qquad(af)(s)=a\,f(s).
$$

The zero function is $0_S(s)=0_V$, and $(-f)(s)=-f(s)$. Hence

$$
(f+0_S)(s)=f(s),\qquad(f+(-f))(s)=0_V.
$$

The remaining axioms follow by evaluation in $V$. For example,

$$
\begin{aligned}
((f+g)+h)(s)&=(f(s)+g(s))+h(s)\\
&=f(s)+(g(s)+h(s))=(f+(g+h))(s),\\
(a(f+g))(s)&=a(f(s)+g(s))=(af+ag)(s),\\
((ab)f)(s)&=(ab)f(s)=a(bf(s))=(a(bf))(s).
\end{aligned}
$$

Commutativity, the scalar identity, and the other distributive law hold pointwise in the same manner. Equality at every input gives equality of functions. $\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-8">
<h3 id="exercise-8">Exercise 1.2.8 · Complexification of a real vector space</h3>

Let $V$ be a real vector space. Its **complexification** is $V_{\C}=V\times V$, with the pair $(u,v)$ denoted formally by $u+iv$. Define

$$
\begin{aligned}
&(u_1+iv_1)+(u_2+iv_2)=(u_1+u_2)+i(v_1+v_2),\\
&(a+bi)(u+iv)=(au-bv)+i(av+bu),
\end{aligned}
$$

for real $a,b$ and vectors $u,v,u_1,v_1,u_2,v_2\in V$. Show that this defines a complex vector space. Identify $u\in V$ with $u+i0$.

<details class="note-proof">
<summary>Solution</summary>

Work with pairs. For $z=(u,v)$ and $\lambda=a+bi$, write

$$
T_\lambda(u,v)=(au-bv,av+bu).
$$

**Addition.** Componentwise addition inherits commutativity and associativity from $V$, with identity $(0,0)$ and inverse $(-u,-v)$.

**Scalar identity.** $T_1(u,v)=(u,v)$.

**Scalar associativity.** For $\mu=c+di$, direct expansion using real vector-space axioms gives

$$
\begin{aligned}
T_\lambda(T_\mu(u,v))
&=\bigl((ac-bd)u-(ad+bc)v,\\
&\qquad (ad+bc)u+(ac-bd)v\bigr)\\
&=T_{\lambda\mu}(u,v).
\end{aligned}
$$

Thus $\lambda(\mu z)=(\lambda\mu)z$.

**Distributivity.** Expanding the pair coordinates also gives

$$
T_\lambda(z+z')=T_\lambda z+T_\lambda z',
\qquad
T_{\lambda+\mu}z=T_\lambda z+T_\mu z.
$$

All complex vector-space axioms hold. The map $j:V\to V_{\C}$, $j(u)=(u,0)$, is injective and real-linear. In particular,

$$
i(u,0)=(0,u),\qquad i(0,u)=(-u,0),
$$

consistent with $i^2=-1$. The notation $u+iv$ represents a pair; it does not assume multiplication by $i$ existed in the original real space. $\blacksquare$

</details>
</section>


---
layout: mathematics-section.njk
tags: [math-section]
title: "§1.1.5 Exercises for §1.1"
summary: "Fifteen practice problems on complex arithmetic and operations in 𝔽ⁿ."
topic: Mathematics
date: 2026-11-06
draft: false
permalink: notes/linear-algebra/exercises-1-1/index.html
---

These problems follow Exercises 1A in the reference book (printed pages 10–11), with wording adapted for these notes. Exercise numbers 1–15 match the book. Here, $\mathbb F$ means $\R$ or $\C$, and $n$ is a positive integer.

Try each problem before opening its solution. The proofs below use real arithmetic and the coordinate definitions of complex and vector operations.

## Complex arithmetic

<section class="note-exercise" aria-labelledby="exercise-1">
<h3 id="exercise-1">Exercise 1.1.5.1 · Commutativity of complex addition</h3>

Prove that $\alpha+\beta=\beta+\alpha$ for every $\alpha,\beta\in\C$.


<details class="note-proof">
<summary>Solution</summary>

Write $\alpha=a+bi$ and $\beta=c+di$, with real $a,b,c,d$. Then

$$
\begin{aligned}
\alpha+\beta&=(a+c)+(b+d)i\\
&=(c+a)+(d+b)i=\beta+\alpha.
\end{aligned}
$$

The middle equality uses commutativity in $\R$. $\blacksquare$

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-2">
<h3 id="exercise-2">Exercise 1.1.5.2 · Associativity of complex addition</h3>

For $\alpha,\beta,\lambda\in\C$, prove $(\alpha+\beta)+\lambda=\alpha+(\beta+\lambda)$.


<details class="note-proof">
<summary>Solution</summary>

Write $\alpha=a+bi$, $\beta=c+di$, and $\lambda=e+fi$. By the definition of complex addition,

$$
\begin{aligned}
(\alpha+\beta)+\lambda&=((a+c)+e)+((b+d)+f)i,\\
\alpha+(\beta+\lambda)&=(a+(c+e))+(b+(d+f))i.
\end{aligned}
$$

Real addition is associative, so the corresponding parts agree. $\blacksquare$

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-3">
<h3 id="exercise-3">Exercise 1.1.5.3 · Associativity of complex multiplication</h3>

For $\alpha,\beta,\lambda\in\C$, prove $(\alpha\beta)\lambda=\alpha(\beta\lambda)$.


<details class="note-proof">
<summary>Solution</summary>

Let $\alpha=a+bi$, $\beta=c+di$, and $\lambda=e+fi$. Expanding twice with the definition of complex multiplication gives

$$
\begin{aligned}
(\alpha\beta)\lambda
&=(ace-bde-adf-bcf)\\
&\quad +(acf-bdf+ade+bce)i,\\
\alpha(\beta\lambda)
&=(ace-adf-bcf-bde)\\
&\quad +(acf+ade+bce-bdf)i.
\end{aligned}
$$

Reordering the real terms makes the real and imaginary parts identical. This argument uses real associativity and distributivity rather than assuming complex associativity. $\blacksquare$

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-4">
<h3 id="exercise-4">Exercise 1.1.5.4 · Distributivity over complex addition</h3>

Prove $\lambda(\alpha+\beta)=\lambda\alpha+\lambda\beta$ for all $\lambda,\alpha,\beta\in\C$.


<details class="note-proof">
<summary>Solution</summary>

Write $\lambda=e+fi$, $\alpha=a+bi$, and $\beta=c+di$. Direct expansion gives

$$
\begin{aligned}
\lambda(\alpha+\beta)
&=[e(a+c)-f(b+d)]\\
&\quad+[e(b+d)+f(a+c)]i\\
&=(ea-fb+ec-fd)\\
&\quad+(eb+fa+ed+fc)i.
\end{aligned}
$$

Also,

$$
\begin{aligned}
\lambda\alpha+\lambda\beta
&=[(ea-fb)+(ec-fd)]\\
&\quad+[(eb+fa)+(ed+fc)]i.
\end{aligned}
$$

These expressions agree by real arithmetic. $\blacksquare$

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-5">
<h3 id="exercise-5">Exercise 1.1.5.5 · Existence and uniqueness of additive inverses</h3>

Given $\alpha\in\C$, show that exactly one $\beta\in\C$ satisfies $\alpha+\beta=0$.


<details class="note-proof">
<summary>Solution</summary>

Let $\alpha=a+bi$. The choice $\beta=-a-bi$ gives $\alpha+\beta=0$, proving existence.

For uniqueness, if $\beta=c+di$ and $\alpha+\beta=0+0i$, equality of complex numbers implies

$$
a+c=0,\qquad b+d=0.
$$

Thus $c=-a$ and $d=-b$, forcing the same value of $\beta$. $\blacksquare$

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-6">
<h3 id="exercise-6">Exercise 1.1.5.6 · Existence and uniqueness of multiplicative inverses</h3>

Given a nonzero $\alpha\in\C$, show that exactly one $\beta\in\C$ satisfies $\alpha\beta=1$.


<details class="note-proof">
<summary>Solution</summary>

Write $\alpha=a+bi\ne0$. Then $D=a^2+b^2>0$. Define

$$
\beta=\frac{a}{D}-\frac{b}{D}i.
$$

The product has real part $(a^2+b^2)/D=1$ and imaginary part $(-ab+ba)/D=0$, so $\alpha\beta=1$.

If $\gamma$ is another inverse, associativity and commutativity of complex multiplication give

$$
\gamma=\gamma(\alpha\beta)=(\gamma\alpha)\beta=1\beta=\beta.
$$

Hence the inverse exists and is unique. $\blacksquare$

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-7">
<h3 id="exercise-7">Exercise 1.1.5.7 · A cube root of one</h3>

Verify that $z^3=1$ for

$$
z=\frac{-1+\sqrt{3}\,i}{2}.
$$


<details class="note-proof">
<summary>Solution</summary>

Set $z=(-1+\sqrt3\,i)/2$. Squaring first gives

$$
z^2=\frac{1-2\sqrt3\,i-3}{4}
=\frac{-1-\sqrt3\,i}{2}.
$$

Therefore

$$
z^3=\frac{(-1-\sqrt3\,i)(-1+\sqrt3\,i)}{4}
=\frac{1+3}{4}=1.
$$

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-8">
<h3 id="exercise-8">Exercise 1.1.5.8 · Square roots of the imaginary unit</h3>

Find two different complex numbers whose square is $i$.


<details class="note-proof">
<summary>Solution</summary>

Let $z=a+bi$ with real $a,b$. The condition $z^2=i$ gives

$$
a^2-b^2=0,\qquad 2ab=1.
$$

The second equation requires $a$ and $b$ to have the same sign. Together with $a^2=b^2$, this gives $a=b$ and $2a^2=1$. Thus the two roots are

$$
\boxed{\frac{1+i}{\sqrt2}\quad\text{and}\quad-\frac{1+i}{\sqrt2}}.
$$

Both square to $i$ because $(1+i)^2/2=2i/2=i$.

</details>

</section>

## Vector equations

<section class="note-exercise" aria-labelledby="exercise-9">
<h3 id="exercise-9">Exercise 1.1.5.9 · Solving a vector equation</h3>

Find $x\in\R^4$ satisfying

$$
(4,-3,1,7)+2x=(5,9,-6,8).
$$


<details class="note-proof">
<summary>Solution</summary>

Subtract corresponding coordinates and divide by $2$:

$$
\begin{aligned}
2x&=(5,9,-6,8)-(4,-3,1,7)\\
&=(1,12,-7,1),\\
x&=\boxed{\left(\frac12,6,-\frac72,\frac12\right)}.
\end{aligned}
$$

Adding twice this vector to $(4,-3,1,7)$ returns $(5,9,-6,8)$.

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-10">
<h3 id="exercise-10">Exercise 1.1.5.10 · When no common scalar exists</h3>

Explain why no $\lambda\in\C$ can satisfy

$$
\lambda(2-3i,\,5+4i,\,-6+7i)=(12-5i,\,7+22i,\,-32-9i).
$$


<details class="note-proof">
<summary>Solution</summary>

The first coordinate would force

$$
\lambda=\frac{12-5i}{2-3i}
=\frac{(12-5i)(2+3i)}{13}
=3+2i.
$$

This value matches the second coordinate, since $(3+2i)(5+4i)=7+22i$. But in the third coordinate,

$$
(3+2i)(-6+7i)=-32+9i\ne-32-9i.
$$

A common scalar must satisfy all coordinates, so no such $\lambda$ exists. $\blacksquare$

</details>

</section>

## Operations in $\mathbb F^n$

<section class="note-exercise" aria-labelledby="exercise-11">
<h3 id="exercise-11">Exercise 1.1.5.11 · Associativity of vector addition</h3>

For $x,y,z\in\mathbb F^n$, prove $(x+y)+z=x+(y+z)$.


<details class="note-proof">
<summary>Solution</summary>

For every coordinate $k\in\{1,\ldots,n\}$,

$$
\begin{aligned}
((x+y)+z)_k&=(x_k+y_k)+z_k\\
&=x_k+(y_k+z_k)=(x+(y+z))_k.
\end{aligned}
$$

Scalar addition is associative in both $\R$ and $\C$. Equal corresponding coordinates give equal vectors. $\blacksquare$

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-12">
<h3 id="exercise-12">Exercise 1.1.5.12 · Compatibility of scalar multiplication</h3>

For $x\in\mathbb F^n$ and $a,b\in\mathbb F$, prove $(ab)x=a(bx)$.


<details class="note-proof">
<summary>Solution</summary>

For each coordinate $k$,

$$
((ab)x)_k=(ab)x_k=a(bx_k)=(a(bx))_k.
$$

The middle equality is scalar associativity; hence $(ab)x=a(bx)$. $\blacksquare$

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-13">
<h3 id="exercise-13">Exercise 1.1.5.13 · Multiplicative identity acting on a vector</h3>

Prove $1x=x$ for every $x\in\mathbb F^n$.


<details class="note-proof">
<summary>Solution</summary>

For each coordinate $k$,

$$
(1x)_k=1x_k=x_k.
$$

The scalar identity acts as the identity in every coordinate, so $1x=x$. $\blacksquare$

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-14">
<h3 id="exercise-14">Exercise 1.1.5.14 · Distributivity over vector addition</h3>

For $\lambda\in\mathbb F$ and $x,y\in\mathbb F^n$, prove $\lambda(x+y)=\lambda x+\lambda y$.


<details class="note-proof">
<summary>Solution</summary>

For each coordinate $k$, scalar distributivity gives

$$
\begin{aligned}
(\lambda(x+y))_k&=\lambda(x_k+y_k)\\
&=\lambda x_k+\lambda y_k=(\lambda x+\lambda y)_k.
\end{aligned}
$$

Therefore $\lambda(x+y)=\lambda x+\lambda y$. $\blacksquare$

</details>

</section>

<section class="note-exercise" aria-labelledby="exercise-15">
<h3 id="exercise-15">Exercise 1.1.5.15 · Distributivity over scalar addition</h3>

For $a,b\in\mathbb F$ and $x\in\mathbb F^n$, prove $(a+b)x=ax+bx$.


<details class="note-proof">
<summary>Solution</summary>

For each coordinate $k$,

$$
\begin{aligned}
((a+b)x)_k&=(a+b)x_k\\
&=ax_k+bx_k=(ax+bx)_k.
\end{aligned}
$$

Thus $(a+b)x=ax+bx$. $\blacksquare$

</details>

</section>


---
layout: geometry-section.njk
tags: [math-section]
title: "Exercises for §1.2"
summary: "Five problems on parametrization, distance, velocity, and orthogonality."
topic: Mathematics
date: 2026-11-06
updated: 2026-11-06
draft: false
permalink: notes/geometry/exercises-1-2/index.html
---

These are the five exercises following §1.2 in the reference book, reworded for these notes. Try each question before opening its solution. Unless stated otherwise, parameter domains are open intervals and curves are smooth.

<section class="note-exercise" aria-labelledby="exercise-1">
<h3 id="exercise-1">Exercise 1.2.1 · A clockwise unit circle</h3>

Find a smooth parametrization of the circle $x^2+y^2=1$ that moves clockwise and satisfies $\alpha(0)=(0,1)$.

<details class="note-proof">
<summary>Solution</summary>

Take $\alpha(t)=(\sin t,\cos t)$ for $t\in\R$. Then

$$
\|\alpha(t)\|^2=\sin^2t+\cos^2t=1,
\qquad \alpha(0)=(0,1).
$$

Writing $\alpha(t)=(\cos\theta(t),\sin\theta(t))$ gives

$$
\theta(t)=\frac\pi2-t
\quad\Longrightarrow\quad \theta'(t)=-1<0.
$$

Thus the entire unit circle is traced clockwise. $\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-2">
<h3 id="exercise-2">Exercise 1.2.2 · A nearest point and its tangent</h3>

Let a smooth curve $\alpha:I\to\R^3$ avoid the origin. Suppose $\alpha(t_0)$ is a point on its trace nearest to the origin and $\alpha'(t_0)\ne0$. Prove $\alpha(t_0)\cdot\alpha'(t_0)=0$.

<details class="note-proof">
<summary>Solution</summary>

Let $f(t)=\|\alpha(t)\|^2$. Since $t_0\in I$ is an interior minimum,

$$
f'(t_0)=0.
$$

By the dot-product rule,

$$
\begin{aligned}
f'(t)&=2\alpha(t)\cdot\alpha'(t),\\
0=f'(t_0)&=2\alpha(t_0)\cdot\alpha'(t_0).
\end{aligned}
$$

Hence $\alpha(t_0)\perp\alpha'(t_0)$. Both vectors are nonzero by hypothesis. $\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-3">
<h3 id="exercise-3">Exercise 1.2.3 · Zero acceleration</h3>

If $\alpha''(t)=0$ for every $t$ in the parameter interval, what form must $\alpha$ have?

<details class="note-proof">
<summary>Solution</summary>

Applying the zero-derivative criterion to each coordinate on the interval $I$,

$$
\alpha''\equiv0
\quad\Longrightarrow\quad
\alpha'(t)=v
\quad\Longrightarrow\quad
\boxed{\alpha(t)=p+tv},
$$

for fixed $p,v\in\R^3$. Therefore

$$
\begin{cases}
v\ne0 &: \text{constant-velocity motion along a line},\\
v=0 &: \text{a constant curve}.
\end{cases}
$$

For $v\ne0$, the trace is the portion $p+Iv$ of that line. $\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-4">
<h3 id="exercise-4">Exercise 1.2.4 · Remaining in a plane</h3>

Let $\alpha:I\to\R^3$ be smooth, with $0\in I$, and let $v\in\R^3$ be fixed. Assume $\alpha'(t)\cdot v=0$ for all $t\in I$ and $\alpha(0)\cdot v=0$. Show $\alpha(t)\cdot v=0$ for every $t\in I$.

<details class="note-proof">
<summary>Solution</summary>

Set $g(t)=\alpha(t)\cdot v$. Since $v$ is fixed,

$$
g'(t)=\alpha'(t)\cdot v=0\qquad(t\in I).
$$

Thus $g$ is constant on $I$, and

$$
g(t)=g(0)=\alpha(0)\cdot v=0.
$$

Therefore $\alpha(t)\in v^\perp$ for every $t\in I$. For $v\ne0$, this is a plane through the origin; for $v=0$, the conclusion is automatic. $\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-5">
<h3 id="exercise-5">Exercise 1.2.5 · Constant distance from the origin</h3>

Let $\alpha:I\to\R^3$ be smooth with $\alpha'(t)\ne0$ for every $t\in I$. Prove that $\|\alpha(t)\|$ is a positive constant if and only if $\alpha(t)\cdot\alpha'(t)=0$ for every $t\in I$.

<details class="note-proof">
<summary>Solution</summary>

**$(\Rightarrow)$** If $\|\alpha(t)\|=r>0$, then

$$
0=(r^2)'=\frac{d}{dt}\|\alpha(t)\|^2
=2\alpha(t)\cdot\alpha'(t).
$$

**$(\Leftarrow)$** If $\alpha(t)\cdot\alpha'(t)=0$ on $I$, then

$$
\frac{d}{dt}\|\alpha(t)\|^2=0
\quad\Longrightarrow\quad
\|\alpha(t)\|^2=c\ge0.
$$

The case $c=0$ would imply

$$
\alpha\equiv0\quad\Longrightarrow\quad\alpha'\equiv0,
$$

contrary to the hypothesis. Hence $c>0$ and $\|\alpha(t)\|=\sqrt c$ is a positive constant. $\blacksquare$

Using the squared norm avoids division by $\|\alpha(t)\|$ before establishing that it is nonzero.

</details>
</section>


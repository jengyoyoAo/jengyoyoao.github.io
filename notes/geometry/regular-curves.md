---
layout: geometry-section.njk
tags: [math-section]
title: "§1.3 Regular Curves; Arc Length"
summary: "Nonzero velocity, tangent lines, arc-length parameters, and reversal of orientation."
topic: Mathematics
date: 2026-11-06
updated: 2026-11-06
draft: false
permalink: notes/geometry/regular-curves/index.html
---

## Tangent lines and singular parameters

For a smooth curve $\alpha:I\to\R^3$, if $\alpha'(t)\ne0$, its **tangent line at parameter $t$** is

$$
\ell_t=\{\alpha(t)+r\alpha'(t):r\in\R\}.
$$

The position $\alpha(t)$ fixes a point on the line, and the nonzero vector $\alpha'(t)$ fixes its direction.

::: definition [1.3.1] Regular curve
A parametrized smooth curve is **regular** if

$$
\alpha'(t)\ne0\qquad\forall t\in I.
$$

A parameter value $t_0$ with $\alpha'(t_0)=0$ is a **singular parameter** (called a singular point of the parametrized curve in the book).
:::

Regularity guarantees a tangent direction $\forall t\in I$. From this section onward, the book restricts attention to regular curves unless otherwise indicated.

### Examples

<div class="math-example-indented">

$$
\begin{aligned}
&\alpha(t)=(\cos t,\sin t):
&&\|\alpha'(t)\|=1>0,\\
&\gamma(t)=(t^3,t^2):
&&\gamma'(0)=(0,0).
\end{aligned}
$$

</div>

The circle parametrization is regular; the cusp parametrization is not regular at $0$.

::: remark [1.3.1] Regularity concerns the parametrization
Zero velocity does not by itself prove that the trace has no geometric tangent. For example, $\eta(t)=(t^3,0)$ has $\eta'(0)=0$, but its trace is a straight line. What fails at $0$ is the nonzero-velocity condition for this particular map.
:::

## Arc length from a base parameter

::: definition [1.3.2] Arc-length function
Fix $t_0\in I$. For a regular curve $\alpha(t)=(x(t),y(t),z(t))$, define

$$
s(t)=\int_{t_0}^{t}\|\alpha'(u)\|\,du,
$$

where the **speed** is

$$
\|\alpha'(u)\|=\sqrt{x'(u)^2+y'(u)^2+z'(u)^2}.
$$
:::

By the fundamental theorem of calculus and regularity,

$$
\boxed{\frac{ds}{dt}=\|\alpha'(t)\|>0}.
$$

Thus $s$ is smooth and strictly increasing. Changing $t_0$ changes $s$ only by an additive constant.

::: remark [1.3.2] Signed parameter versus nonnegative length
For $t<t_0$, the function $s(t)$ is negative. It is an oriented arc-length coordinate, not a negative physical length. The nonnegative length along the curve between parameters $t_1$ and $t_2$ is

$$
L=\int_{\min(t_1,t_2)}^{\max(t_1,t_2)}\|\alpha'(u)\|\,du
=|s(t_2)-s(t_1)|.
$$

This measures the traversed curve segment, including repeated traversal if the map revisits its trace.
:::

## Unit-speed parametrization

::: definition [1.3.3] Unit speed
A curve is **unit speed** if

$$
\|\alpha'(t)\|=1\qquad\forall t\in I.
$$

For such a curve, the parameter agrees with arc length up to an additive constant.
:::

::: proposition [1.3.1] Arc length and unit speed
The parameter satisfies $s(t)=t-t_0$ if and only if $\|\alpha'(t)\|=1\;\forall t\in I$.
:::

<details class="note-proof">
<summary>Proof</summary>

**$(\Rightarrow)$** Differentiate:

$$
1=s'(t)=\|\alpha'(t)\|.
$$

**$(\Leftarrow)$** Integrate:

$$
s(t)=\int_{t_0}^{t}1\,du=t-t_0.
$$

Hence unit speed is precisely the arc-length condition with this choice of origin. $\blacksquare$

</details>

### Example: a helix

For $\alpha(t)=(a\cos t,a\sin t,bt)$ with $a>0$,

<div class="math-example-indented">

$$
\begin{aligned}
&\alpha'(t)=(-a\sin t,a\cos t,b),\\
&\|\alpha'(t)\|=\sqrt{a^2+b^2}=:c>0,\\
&s(t)=c(t-t_0).
\end{aligned}
$$

</div>

Taking $t_0=0$ and writing $t=s/c$ gives the unit-speed curve

$$
\widetilde\alpha(s)=\left(a\cos\frac{s}{c},\ a\sin\frac{s}{c},\ \frac{bs}{c}\right),
\qquad\|\widetilde\alpha'(s)\|=1.
$$

The trace is unchanged; only the parameter is rescaled. General arc-length reparametrization is justified later in the book.

## Reversing orientation

Let $\alpha:(a,b)\to\R^3$ be parametrized by arc length. Define

$$
\beta:(-b,-a)\to\R^3,\qquad\beta(u)=\alpha(-u).
$$

Then

<div class="math-example-indented">

$$
\begin{aligned}
&\beta((-b,-a))=\alpha((a,b)),\\
&\beta'(u)=-\alpha'(-u),\\
&\|\beta'(u)\|=1.
\end{aligned}
$$

</div>

The two curves have the same trace and remain unit speed, but traverse corresponding points in opposite directions. This is a **change of orientation**.

## What to remember

Regular means nonzero velocity. Arc length satisfies $ds/dt=\|\alpha'(t)\|$; using it as the parameter gives unit speed. A change of orientation reverses the direction of traversal without changing the trace.

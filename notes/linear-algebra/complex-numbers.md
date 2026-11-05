---
layout: mathematics-section.njk
tags: [math-section]
title: "§1.1.1 Complex Numbers"
summary: "Complex arithmetic, inverses, and scalar notation."
topic: Mathematics
date: 2026-11-06
draft: false
permalink: notes/linear-algebra/complex-numbers/index.html
---

### Reference

Adapted and reworded from Sheldon Axler, [*Linear Algebra Done Right*, fourth edition](https://linear.axler.net/LADR4e.pdf), Chapter 1, §1A, Definition 1.1 and results 1.3–1.6 (printed pages 2–4). The subsection is labeled 1.1 in these notes. Source licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).

::: definition [1.1.1.1] Complex numbers
A **complex number** is specified by real coordinates $(a,b)$ and written $a+bi$, with $i^2=-1$. We use **$\C$** for their collection:

$$
\C=\{a+bi:a,b\in\R\}.
$$

For $a,b,c,d\in\R$, define **addition** and **multiplication** by

<div class="math-example-indented">

$$
\begin{aligned}
&(a+bi)+(c+di)=(a+c)+(b+d)i,\\
&(a+bi)(c+di)=(ac-bd)+(ad+bc)i.
\end{aligned}
$$

</div>
:::

## Example

<div class="math-example-indented">

$$
\begin{aligned}
&(2+3i)+(4+5i)=(2+4)+(3+5)i=6+8i,\\
&(2+3i)(4+5i)=(2\cdot4-3\cdot5)+(2\cdot5+3\cdot4)i=-7+22i.
\end{aligned}
$$

</div>


::: proposition [1.1.1.1] Properties of complex arithmetic
For $\alpha,\beta,\lambda\in\C$:

**Commutativity**

<div class="math-example-indented">

$$
\begin{aligned}
&\alpha+\beta=\beta+\alpha,\\
&\alpha\beta=\beta\alpha.
\end{aligned}
$$

</div>

**Associativity**

<div class="math-example-indented">

$$
\begin{aligned}
&(\alpha+\beta)+\lambda=\alpha+(\beta+\lambda),\\
&(\alpha\beta)\lambda=\alpha(\beta\lambda).
\end{aligned}
$$

</div>

**Identity elements**

<div class="math-example-indented">

$$
\begin{aligned}
&\lambda+0=\lambda,\\
&\lambda\cdot1=\lambda.
\end{aligned}
$$

</div>

**Additive inverse**

<div class="math-example-indented">

Each $\alpha\in\C$ has exactly one $\beta\in\C$ satisfying $\alpha+\beta=0$.

</div>

**Multiplicative inverse**

<div class="math-example-indented">

Each nonzero $\alpha\in\C$ has exactly one $\beta\in\C$ satisfying $\alpha\beta=1$.

</div>

**Distributivity**

<div class="math-example-indented">

$$
\lambda(\alpha+\beta)=\lambda\alpha+\lambda\beta.
$$

</div>
:::

<details class="note-proof">
<summary>Proof: multiplication is commutative</summary>


Write $\alpha=a+bi$ and $\beta=c+di$, where $a,b,c,d\in\R$. Applying the multiplication rule in both orders gives

<div class="math-example-indented">

$$
\begin{aligned}
&\alpha\beta=(ac-bd)+(ad+bc)i,\\
&\beta\alpha=(ca-db)+(cb+da)i.
\end{aligned}
$$

</div>

Real-number commutativity makes the real parts equal and the imaginary parts equal. Hence $\alpha\beta=\beta\alpha$. $\blacksquare$

</details>

::: definition [1.1.1.2] Inverses, subtraction, and division
For $\alpha,\beta\in\C$, the **additive inverse** of $\alpha$ is denoted $-\alpha$. It is characterized by $\alpha+(-\alpha)=0$.

**Subtraction** means adding the additive inverse:

$$
\beta-\alpha=\beta+(-\alpha).
$$

When $\alpha\ne0$, its **multiplicative inverse** is written $\alpha^{-1}$ or $1/\alpha$, with $\alpha\alpha^{-1}=1$. **Division** by a nonzero number means multiplying by its inverse:

$$
\frac{\beta}{\alpha}=\beta\alpha^{-1}.
$$
:::

::: remark [1.1.1.1] Computing the inverses
For $\alpha=a+bi$, its additive inverse is $-a-bi$. If $\alpha\ne0$, then $a^2+b^2>0$ and

$$
\alpha^{-1}=\frac{a-bi}{a^2+b^2}.
$$

Indeed, $(a+bi)(a-bi)=a^2+b^2$, so multiplying by the displayed inverse gives $1$. Zero has no multiplicative inverse.
:::

::: definition [1.1.1.3] The scalar field
Use $\mathbb F$ to mean either $\R$ or $\C$. Members of $\mathbb F$ are called **scalars**. This lets statements cover real and complex scalars with the same notation.
:::

## Positive integer powers

For $\alpha\in\mathbb F$ and an integer $m\ge1$, set

$$
\alpha^m=\underbrace{\alpha\cdots\alpha}_{m\text{ factors}}.
$$

Associativity and commutativity give, for positive integers $m,n$,

<div class="math-example-indented">

$$
\begin{aligned}
&(\alpha^m)^n=\alpha^{mn},\\
&(\alpha\beta)^m=\alpha^m\beta^m.
\end{aligned}
$$

</div>

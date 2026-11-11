---
layout: mathematics-section.njk
tags: [math-section]
title: "Exercises for §1.3"
summary: "24 problems on subspaces, intersections, sums, complements, and direct sums."
topic: Mathematics
date: 2026-11-11
updated: 2026-11-11
draft: false
permalink: notes/linear-algebra/exercises-1-3/index.html
---

These problems follow Exercises 1C in the reference book (printed pages 24–26), with wording adapted for these notes. Unless specified otherwise, $V$ is a vector space over $\mathbb F\in\{\R,\C\}$. Try each problem before expanding its solution.

<section class="note-exercise" aria-labelledby="exercise-1">
<h3 id="exercise-1">Exercise 1.3.1 · Subsets of coordinate space</h3>

Determine which subsets of $\mathbb F^3$ are subspaces:

$$
\begin{aligned}
\text{(a)}\quad&A=\{x:x_1+2x_2+3x_3=0\},\\
\text{(b)}\quad&B=\{x:x_1+2x_2+3x_3=4\},\\
\text{(c)}\quad&C=\{x:x_1x_2x_3=0\},\\
\text{(d)}\quad&D=\{x:x_1=5x_3\}.
\end{aligned}
$$

<details class="note-proof">
<summary>Solution</summary>

**(a) Yes.** Put $L(x)=x_1+2x_2+3x_3$. Then $L(0)=0$, and

$$L(au+bv)=aL(u)+bL(v)=0\qquad\forall u,v\in A,\ a,b\in\mathbb F.$$

**(b) No:** $0\notin B$.

**(c) No:** $u=(1,0,1)$ and $v=(0,1,0)$ belong to $C$, but $u+v=(1,1,1)\notin C$.

**(d) Yes.** For $u,v\in D$,

$$(au+bv)_1=5(au+bv)_3\qquad\forall a,b\in\mathbb F,$$

and $0\in D$.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-2">
<h3 id="exercise-2">Exercise 1.3.2 · Verifying the examples</h3>

Verify the five subspace assertions in the examples of [§1.3](/notes/linear-algebra/subspaces/): the coordinate constraint, continuous functions, differentiable functions, the derivative constraint, and sequences converging to zero.

<details class="note-proof">
<summary>Solution</summary>

**(a)** For $U_b=\{x\in\mathbb F^4:x_3=5x_4+b\}$,

$$0\in U_b\iff b=0.$$

If $b=0$, $u,v\in U_0$ implies $(au+cv)_3=5(au+cv)_4$ for all scalars $a,c$. Thus $U_b$ is a subspace $\iff b=0$.

**(b)** The zero function is continuous, and $af+cg$ is continuous whenever $f,g\in C([0,1],\R)$ and $a,c\in\R$.

**(c)** The zero function is differentiable, and

$$(af+cg)'=af'+cg'\qquad\forall a,c\in\R.$$

**(d)** The zero function satisfies $f'(2)=b$ only if $b=0$. If $f'(2)=g'(2)=0$, then $(af+cg)'(2)=0$, so the set is a subspace exactly when $b=0$.

**(e)** The zero sequence converges to zero, and

$$z_k,w_k\to0\implies az_k+cw_k\to0\qquad\forall a,c\in\C.$$

Apply the subspace test in each case.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-3">
<h3 id="exercise-3">Exercise 1.3.3 · A derivative and evaluation constraint</h3>

Show that

$$U=\{f:(-4,4)\to\R:f\text{ is differentiable},\ f'(-1)=3f(2)\}$$

is a subspace of $\R^{(-4,4)}$.

<details class="note-proof">
<summary>Solution</summary>

The zero function belongs to $U$. For $f,g\in U$ and $a,b\in\R$, $h=af+bg$ is differentiable and

$$h'(-1)=af'(-1)+bg'(-1)=3af(2)+3bg(2)=3h(2).$$

Thus $af+bg\in U$, proving the claim.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-4">
<h3 id="exercise-4">Exercise 1.3.4 · An integral constraint</h3>

For $b\in\R$, show that

$$U_b=\left\{f\in C([0,1],\R):\int_0^1 f(x)\,dx=b\right\}$$

is a subspace of $\R^{[0,1]}$ $\iff b=0$.

<details class="note-proof">
<summary>Solution</summary>

If $U_b$ is a subspace, its zero function gives $b=\int_0^1 0\,dx=0$.

Conversely, $0\in U_0$, and for $f,g\in U_0$, $a,c\in\R$, $af+cg$ is continuous with

$$\int_0^1(af+cg)\,dx=a\int_0^1f\,dx+c\int_0^1g\,dx=0.$$

Hence $U_0$ is a subspace.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-5">
<h3 id="exercise-5">Exercise 1.3.5 · The scalar field matters</h3>

Is $\R^2$ a subspace of the complex vector space $\C^2$?

<details class="note-proof">
<summary>Solution</summary>

**No.** Complex scalar closure fails:

$$(1,0)\in\R^2,\qquad i(1,0)=(i,0)\notin\R^2.$$

It is a real subspace if $\C^2$ is instead regarded as a vector space over $\R$.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-6">
<h3 id="exercise-6">Exercise 1.3.6 · Equal cubes over different fields</h3>

Is $\{(a,b,c):a^3=b^3\}$ a subspace of **(a)** $\R^3$? **(b)** $\C^3$?

<details class="note-proof">
<summary>Solution</summary>

**(a) Yes.** Over $\R$, $a^3=b^3\iff a=b$. Thus the set is $\{(a,a,c):a,c\in\R\}$, a subspace.

**(b) No.** Let $\omega=(-1+i\sqrt3)/2$, so $\omega^3=1$ and $1+\omega=-\omega^2$. The vectors

$$u=(1,1,0),\qquad v=(1,\omega,0)$$

satisfy the condition, but for $u+v=(2,1+\omega,0)$,

$$2^3=8\ne-1=(1+\omega)^3.$$

Addition is not closed.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-7">
<h3 id="exercise-7">Exercise 1.3.7 · Addition and inverses are not enough</h3>

Prove or disprove: a nonempty subset $U\subseteq\R^2$ closed under addition and additive inverses must be a subspace.

<details class="note-proof">
<summary>Solution</summary>

**False.** Take $U=\Z^2$. It is nonempty and closed under addition and negation, but

$$(1,0)\in U,\qquad \tfrac12(1,0)\notin U.$$

Real scalar closure fails.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-8">
<h3 id="exercise-8">Exercise 1.3.8 · Scalar closure is not enough</h3>

Find a nonempty subset of $\R^2$ closed under scalar multiplication that is not a subspace.

<details class="note-proof">
<summary>Solution</summary>

Take the union of the coordinate axes:

$$U=\{(x,y)\in\R^2:xy=0\}.$$

If $xy=0$, then $(ax)(ay)=a^2xy=0\ \forall a\in\R$. However,

$$(1,0),(0,1)\in U,\qquad(1,1)\notin U.$$

Thus addition is not closed.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-9">
<h3 id="exercise-9">Exercise 1.3.9 · Periodic functions</h3>

A function $f:\R\to\R$ is periodic if $\exists p>0$ such that $f(x+p)=f(x)\ \forall x\in\R$. Is the set of periodic functions a subspace of $\R^{\R}$?

<details class="note-proof">
<summary>Solution</summary>

**No.** For $A\subseteq\R$, let $\mathbf1_A(x)$ be $1$ on $A$ and $0$ elsewhere. Set

$$f=\mathbf1_{\Z},\qquad g=\mathbf1_{\sqrt2\Z}.$$

Then $f$ has period $1$ and $g$ has period $\sqrt2$. Since $\Z\cap\sqrt2\Z=\{0\}$,

$$(f+g)(x)=2\iff x=0.$$

A positive period $p$ would imply $(f+g)(p)=(f+g)(0)=2$, forcing $p=0$, a contradiction. Thus $f+g$ is not periodic.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-10">
<h3 id="exercise-10">Exercise 1.3.10 · Intersection of two subspaces</h3>

For subspaces $V_1,V_2\subseteq V$, prove that $V_1\cap V_2$ is a subspace.

<details class="note-proof">
<summary>Solution</summary>

Put $U=V_1\cap V_2$. Then $0\in U$. For $u,v\in U$ and $a,b\in\mathbb F$,

$$au+bv\in V_1\quad\text{and}\quad au+bv\in V_2.$$

Hence $au+bv\in U$, so $U$ is a subspace.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-11">
<h3 id="exercise-11">Exercise 1.3.11 · Arbitrary intersections</h3>

Prove that the intersection of any collection of subspaces of $V$ is a subspace of $V$.

<details class="note-proof">
<summary>Solution</summary>

For a nonempty indexed family $(U_j)_{j\in J}$, put $U=\bigcap_{j\in J}U_j$. Each $U_j$ contains zero, so $0\in U$. Moreover,

$$u,v\in U\implies au+bv\in U_j\ \forall j\in J\implies au+bv\in U.$$

This holds for all scalars $a,b$. For the empty family, the intersection within $V$ is $V$ itself, also a subspace.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-12">
<h3 id="exercise-12">Exercise 1.3.12 · Union of two subspaces</h3>

Prove that $U\cup W$ is a subspace $\iff U\subseteq W$ or $W\subseteq U$.

<details class="note-proof">
<summary>Solution</summary>

$(\Leftarrow)$ The union equals the larger subspace.

$(\Rightarrow)$ Otherwise choose $u\in U\setminus W$ and $w\in W\setminus U$. If the union were a subspace, $u+w\in U\cup W$. But

$$
\begin{aligned}
u+w\in U&\implies w=(u+w)-u\in U,\\
u+w\in W&\implies u=(u+w)-w\in W,
\end{aligned}
$$

both contradictions.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-13">
<h3 id="exercise-13">Exercise 1.3.13 · Union of three subspaces</h3>

For subspaces $A,B,C$ over $\mathbb F\in\{\R,\C\}$, prove that $A\cup B\cup C$ is a subspace $\iff$ one of them contains the other two.

<details class="note-proof">
<summary>Solution</summary>

$(\Leftarrow)$ The union equals that containing subspace.

$(\Rightarrow)$ Suppose the union is a subspace. If one of $A,B,C$ is contained in another, remove it and apply Exercise 1.3.12 to the remaining two.

Otherwise the three subspaces are pairwise incomparable. There exists

$$a\in A\setminus(B\cup C).$$

Indeed, if $A\subseteq B\cup C$, then $A=(A\cap B)\cup(A\cap C)$; Exercise 1.3.12 implies $A\subseteq B$ or $A\subseteq C$, a contradiction. Similarly choose $b\in B\setminus(A\cup C)$.

For any nonzero scalar $t$, closure gives $a+tb\in A\cup B\cup C$. Yet

$$a+tb\in A\implies b\in A,\qquad a+tb\in B\implies a\in B.$$

Thus $a+b,a+2b\in C$, so $b=(a+2b)-(a+b)\in C$, a contradiction.

The use of distinct nonzero scalars $1,2$ explains the field restriction: over the two-element field, the three lines in $\mathbb F_2^2$ cover the plane although none contains the others.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-14">
<h3 id="exercise-14">Exercise 1.3.14 · Computing a sum</h3>

Let $U=\{(t,-t,2t):t\in\mathbb F\}$ and $W=\{(s,s,2s):s\in\mathbb F\}$. Describe $U+W$ symbolically and in words.

<details class="note-proof">
<summary>Solution</summary>

A typical sum is

$$(t,-t,2t)+(s,s,2s)=(t+s,-t+s,2(t+s)).$$

Conversely, for any $x,y\in\mathbb F$, choose $t=(x-y)/2$ and $s=(x+y)/2$. Hence

$$U+W=\{(x,y,2x):x,y\in\mathbb F\}.$$

In words: all triples whose third coordinate is twice their first coordinate.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-15">
<h3 id="exercise-15">Exercise 1.3.15 · Adding a subspace to itself</h3>

For a subspace $U\subseteq V$, determine $U+U$.

<details class="note-proof">
<summary>Solution</summary>

$$U+U=U.$$

Closure gives $U+U\subseteq U$, while $u=u+0$ gives $U\subseteq U+U$.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-16">
<h3 id="exercise-16">Exercise 1.3.16 · Commutativity of subspace sums</h3>

Is $U+W=W+U$ for all subspaces $U,W\subseteq V$?

<details class="note-proof">
<summary>Solution</summary>

**Yes**, because vector addition is commutative:

$$U+W=\{u+w:u\in U,w\in W\}=\{w+u:w\in W,u\in U\}=W+U.$$

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-17">
<h3 id="exercise-17">Exercise 1.3.17 · Associativity of subspace sums</h3>

For subspaces $V_1,V_2,V_3\subseteq V$, is $(V_1+V_2)+V_3=V_1+(V_2+V_3)$?

<details class="note-proof">
<summary>Solution</summary>

**Yes.** Both sides consist of exactly the vectors

$$(v_1+v_2)+v_3=v_1+(v_2+v_3),\qquad v_k\in V_k.$$

Therefore parentheses can be omitted from finite sums of subspaces.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-18">
<h3 id="exercise-18">Exercise 1.3.18 · Identity and inverses for subspace addition</h3>

Does addition of subspaces have an identity? Which subspaces have additive inverses?

<details class="note-proof">
<summary>Solution</summary>

The identity is $\{0\}$, since $U+\{0\}=U$ for every subspace $U$.

If $U+W=\{0\}$, then

$$U\subseteq U+W=\{0\},\qquad W\subseteq U+W=\{0\}.$$

Thus $U=W=\{0\}$. Only the zero subspace has an additive inverse.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-19">
<h3 id="exercise-19">Exercise 1.3.19 · Cancellation can fail</h3>

Prove or disprove: $V_1+U=V_2+U\implies V_1=V_2$.

<details class="note-proof">
<summary>Solution</summary>

**False.** In $V=\mathbb F^2$, set

$$U=\{(t,0):t\in\mathbb F\},\quad V_1=\{(0,t):t\in\mathbb F\},\quad V_2=\{(t,t):t\in\mathbb F\}.$$

Then $V_1\ne V_2$, but $V_1+U=V_2+U=\mathbb F^2$. Indeed,

$$(x,y)=(0,y)+(x,0)=(y,y)+(x-y,0).$$

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-20">
<h3 id="exercise-20">Exercise 1.3.20 · A complement in four coordinates</h3>

For $U=\{(x,x,y,y):x,y\in\mathbb F\}$, find a subspace $W$ such that $\mathbb F^4=U\oplus W$.

<details class="note-proof">
<summary>Solution</summary>

Choose $W=\{(0,a,0,b):a,b\in\mathbb F\}$. It is a subspace, and

$$(p,q,r,s)=\underbrace{(p,p,r,r)}_{\in U}+\underbrace{(0,q-p,0,s-r)}_{\in W}.$$

If $(x,x,y,y)\in W$, its first and third coordinates give $x=y=0$. Thus $U\cap W=\{0\}$ and $\mathbb F^4=U\oplus W$.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-21">
<h3 id="exercise-21">Exercise 1.3.21 · A complement in five coordinates</h3>

Let $U=\{(x,y,x+y,x-y,2x):x,y\in\mathbb F\}$. Find $W$ such that $\mathbb F^5=U\oplus W$.

<details class="note-proof">
<summary>Solution</summary>

Take $W=\{(0,0,a,b,c):a,b,c\in\mathbb F\}$. Then

$$
\begin{aligned}
(p,q,r,s,t)={}&(p,q,p+q,p-q,2p)\\
&+(0,0,r-p-q,s-p+q,t-2p).
\end{aligned}
$$

The first summand lies in $U$, the second in $W$. If a vector in $U$ lies in $W$, its first two coordinates force $x=y=0$. Hence $U\cap W=\{0\}$, proving the direct sum.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-22">
<h3 id="exercise-22">Exercise 1.3.22 · Three nonzero complementary summands</h3>

For the same $U$ as Exercise 1.3.21, find nonzero subspaces $W_1,W_2,W_3$ such that $\mathbb F^5=U\oplus W_1\oplus W_2\oplus W_3$.

<details class="note-proof">
<summary>Solution</summary>

Take the third, fourth, and fifth coordinate axes:

$$W_1=\{ae_3:a\in\mathbb F\},\quad W_2=\{be_4:b\in\mathbb F\},\quad W_3=\{ce_5:c\in\mathbb F\}.$$

Each is nonzero, and

$$
\begin{aligned}
(p,q,r,s,t)={}&(p,q,p+q,p-q,2p)\\
&+(r-p-q)e_3+(s-p+q)e_4+(t-2p)e_5.
\end{aligned}
$$

For uniqueness, a zero sum first forces the two parameters of the $U$ component to vanish, by the first two coordinates. The last three coordinates then force the three axis components to vanish. Apply the zero-decomposition criterion.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-23">
<h3 id="exercise-23">Exercise 1.3.23 · Complements need not be unique</h3>

Prove or disprove: if $V=V_1\oplus U=V_2\oplus U$, then $V_1=V_2$.

<details class="note-proof">
<summary>Solution</summary>

**False.** Use the three lines from Exercise 1.3.19. Both $V_1+U$ and $V_2+U$ equal $\mathbb F^2$, and

$$V_1\cap U=V_2\cap U=\{0\}.$$

Thus $\mathbb F^2=V_1\oplus U=V_2\oplus U$, even though the vertical and diagonal lines are distinct.

$\blacksquare$

</details>
</section>

<section class="note-exercise" aria-labelledby="exercise-24">
<h3 id="exercise-24">Exercise 1.3.24 · Even and odd functions</h3>

Let

$$
\begin{aligned}
V_e&=\{f:\R\to\R:f(-x)=f(x)\ \forall x\in\R\},\\
V_o&=\{f:\R\to\R:f(-x)=-f(x)\ \forall x\in\R\}.
\end{aligned}
$$

Prove $\R^{\R}=V_e\oplus V_o$.

<details class="note-proof">
<summary>Solution</summary>

Both sets contain the zero function. For $f,g$ in either set and $a,b\in\R$,

$$(af+bg)(-x)=\begin{cases}(af+bg)(x),&f,g\in V_e,\\-(af+bg)(x),&f,g\in V_o.\end{cases}$$

Hence both are subspaces. For an arbitrary $f:\R\to\R$, define

$$f_e(x)=\frac{f(x)+f(-x)}2,\qquad f_o(x)=\frac{f(x)-f(-x)}2.$$

Then $f_e\in V_e$, $f_o\in V_o$, and $f=f_e+f_o$. Thus $\R^{\R}=V_e+V_o$.

Finally, if $h\in V_e\cap V_o$, then

$$h(x)=h(-x)=-h(x)\implies h(x)=0\quad\forall x\in\R.$$

Therefore $V_e\cap V_o=\{0\}$, giving the direct sum and uniqueness of the decomposition.

$\blacksquare$

</details>
</section>


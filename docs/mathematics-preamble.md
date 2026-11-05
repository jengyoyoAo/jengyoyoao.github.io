# Mathematics preamble

Shared configuration: `scripts/math-preamble.js`. Every note using the existing Markdown renderer can use these environments; no per-note imports are needed. KaTeX renders formulas at build time.

Use `topic: Mathematics` and `layout: note.njk` in your note's front matter.

## Statement environments

```markdown
::: definition Vector space
A vector space over $\R$ satisfies the vector space axioms.
:::

::: lemma
If $x = 0$, then $\norm{x} = 0$.
:::

::: proposition
For $x \in \R$, we have $x^2 \ge 0$.
:::

::: theorem Triangle inequality
For real numbers $x,y$,
$$
|x+y| \le |x|+|y|.
$$
:::

::: remark
The title after the environment name is optional. You can use **Markdown**, lists, and inline or display math inside each block.
:::
```

Each kind has its own counter (Definition 1, Lemma 1, etc.). Counters restart for each document. Titles are rendered as plain text. These are website Markdown environments, not native KaTeX `\begin{theorem}` commands; GitHub will show the delimiter text rather than the styled blocks.

## Shared math macros

- `\R`, `\N`, `\Z`, `\Q`, `\C`: number sets.
- `\vect{x}`: bold vector notation.
- `\norm{x}`: norm with matching delimiters.

Example: `$\vect{x} \in \R^n$` and `$\norm{\vect{x}}$`.

These custom macros are available on this website; GitHub Markdown does not inherit them automatically.

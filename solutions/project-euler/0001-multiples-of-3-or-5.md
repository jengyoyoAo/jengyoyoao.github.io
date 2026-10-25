# Project Euler 1: Multiples of 3 or 5

- **Platform / ID:** Project Euler, Problem 1
- **Problem:** [Multiples of 3 or 5](https://projecteuler.net/problem=1)
- **Languages:** Python, C
- **Website write-up:** [Read the solution](../../online-judge/project-euler/problem-1.html)

## Key idea

Check every integer below 1,000. Add it to the running total when it is divisible by 3 or 5. A single OR condition counts a number divisible by both only once.

## Correctness

Each number below the limit is checked exactly once. The condition selects precisely the multiples of 3 or 5, and each selected value is added once. Thus, the final total is the required sum.

## Complexity

- **Time:** O(n), where n is the upper limit, because each value below n is checked once.
- **Extra space:** O(1), because only a fixed number of variables is used.

## Result

Both implementations print `233168`.

The C loop starts at zero while the Python loop starts at one; this does not change the result because zero contributes nothing.

## Takeaway

A direct scan is simple to verify. Using OR rather than adding separate sums prevents multiples of 15 from being counted twice.

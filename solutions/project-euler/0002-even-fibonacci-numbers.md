# Project Euler 2: Even Fibonacci Numbers

- **Platform / ID:** Project Euler, Problem 2
- **Problem:** [Even Fibonacci Numbers](https://projecteuler.net/problem=2)
- **Languages:** Python, C (C99 or later)
- **Website write-up:** [Read the solution](../../online-judge/project-euler/problem-2.html)

## Key idea

Generate the Fibonacci sequence using only its previous two terms. Add each even-valued term while it is below four million.

## Correctness

The initial values produce the sequence 1, 1, 2. Each iteration advances to the next Fibonacci number using the recurrence `F(k) = F(k - 1) + F(k - 2)`, so every term below the limit is visited once. The parity check adds exactly the even terms. The loop stops when the next term reaches or exceeds the limit, so no out-of-range term is included. The accumulated value is therefore the requested sum.

## Complexity

- **Time:** O(log n) iterations, where n is the limit, because Fibonacci values grow exponentially. For Python's arbitrary-precision integers, counting the cost of additions by bit length gives O((log n)^2) bit operations.
- **Extra space:** O(1) stored values in the usual word model; the arbitrary-precision integers require O(log n) bits.

## Result

Both implementations print `4613732`.

The original C snippet used `400000` instead of `4000000`, which solves a different limit. This version corrects the bound and uses `long long` for the sequence and sum. The code follows C99-or-later syntax with `int main(void)` and a matching `%lld` format specifier.

## Takeaway

Keeping only two previous terms is enough to generate a sequence iteratively. Carefully checking constants across language versions can prevent a correct-looking program from solving a different problem.

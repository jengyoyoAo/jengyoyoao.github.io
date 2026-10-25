# Project Euler 3: Largest Prime Factor

- **Platform / ID:** Project Euler, Problem 3
- **Problem:** [Largest Prime Factor](https://projecteuler.net/problem=3)
- **Languages:** Python, C99 or later
- **Website write-up:** [Read the solution](../../online-judge/project-euler/problem-3.html)

## Key idea

Try factors in increasing order. If a factor divides the number, divide it out and run the function again on the smaller value. Once no odd factor up to the square root divides the remaining value, that value is prime.

## Correctness

For this input, both programs print `6857`. They check factors from small to large and divide out a factor before checking the smaller quotient. The Python function recurses until no factor is found; the C program uses nested loops to do the same.

## Complexity

- **Time:** O(√n) trial divisions in the worst case, where n is the input value.
- **Extra space:** O(log n) for the Python recursion stack in the worst case; O(1) for the C implementation.

## Result

Both implementations print `6857`.

This page keeps the code close to the versions I wrote. The Python even-factor branch recurses without setting `answer` to 2. That does not change the result for this odd input, but would make the function incomplete for inputs whose largest prime factor is 2. In the C version, I changed the entry point to `int main(void)` and parenthesized the `MAX` macro. The loop condition `i * i <= n` is fine for this input size with `long long`; for larger values, the multiplication could overflow.

## Takeaway

Removing factors reduces the remaining number and therefore the search. The two implementations express the same trial-division idea in the styles I used at the time.

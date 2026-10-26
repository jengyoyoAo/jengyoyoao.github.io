# Project Euler 4: Largest Palindrome Product

- **Platform / ID:** Project Euler, Problem 4
- **Problem:** [Largest Palindrome Product](https://projecteuler.net/problem=4)
- **Languages:** Python 3, C99 or later
- **Website write-up:** [Read the solution](../../online-judge/project-euler/problem-4.html)
- **Source:** [Python solution](0004-largest-palindrome-product.py), [C solution](0004-largest-palindrome-product.c)

## Key idea

Check products of two three-digit numbers and reverse the digits to test whether each product is a palindrome. Keep the largest palindrome found instead of returning at the first match.

Both implementations reverse digits arithmetically using modulo 10 and integer division. Starting `j` at `i` avoids duplicate factor pairs. For a fixed `i`, products decrease as `j` decreases, so `num <= ans` safely ends only the inner loop. The next outer iteration still needs to be searched.

## Correctness

Every unordered pair of three-digit factors appears with 100 ≤ j ≤ i ≤ 999. Reversing the decimal digits identifies palindromes, and ans stores the largest one seen. For a fixed i, products decrease as j decreases, so once a product is no larger than ans, the remaining products in that inner loop cannot improve it. The final ans is therefore the largest palindrome product.

## Complexity

- **Time:** O(n² log n), where n is the upper factor bound; each digit reversal takes O(log n).
- **Extra space:** O(1).

## Result

Both the Python and C programs print `906609`, which is `993 × 913`.

## A faster approach: mirror a prefix

Generate six-digit palindromes in descending order by mirroring a three-digit prefix. For example, prefix 906 becomes 906609. Instead of testing whether every product is a palindrome, test whether each palindrome has two three-digit factors.

Every six-digit palindrome is divisible by 11 because its alternating digit sum is zero. Since 11 is prime, at least one factor must be divisible by 11. The inner loop therefore checks three-digit multiples of 11 and verifies that the quotient is also a three-digit integer. Palindromes are generated from largest to smallest, so the first valid factorization gives the maximum.

```python
ans = -1

for prefix in range(999, 99, -1):
    num = prefix
    n = prefix

    while n != 0:
        num = num * 10 + n % 10
        n //= 10

    for i in range(110, 1000, 11):
        if num % i == 0:
            j = num // i
            if 100 <= j <= 999:
                ans = num
                break

    if ans != -1:
        break

print(ans)
```

This implementation searches only six-digit palindromes. It finds 906609 = 993 × 913, so shorter palindromes cannot improve the result for this problem. A general solver must also search shorter palindromes if no six-digit candidate has a valid factorization.

### Complexity

Let n be the upper factor bound for a generalized search over d-digit factors. There are O(n) mirrored candidates, each requiring O(log n) digit operations to construct and at most O(n) trial divisions. The total is O(n log n + n²) = O(n²) time and O(1) extra integer variables under the same unit-cost arithmetic model used above. The factor-of-11 shortcut reduces constant work, not the Big O.

### Pair-search pruning

The outer loop may stop when `i * i <= ans`, because all remaining pairs have a product no larger than this bound. This does not change the stated O(n² log n) upper bound.

## Takeaway

Descending loop variables do not guarantee descending products. Track the maximum and only prune candidates that cannot improve it.

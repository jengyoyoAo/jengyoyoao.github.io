# LeetCode 1: Two Sum

- **Problem:** [Two Sum](https://leetcode.com/problems/two-sum/)
- **Difficulty:** Easy
- **Languages:** Python 3, C99 or later
- **Website:** [Read solution](../../online-judge/leetcode/problem-1.html)
- **Source:** [Python](0001-two-sum.py), [C](0001-two-sum.c)

## Key idea

Use a hash table $h$ to remember each previously visited value and its index. For the current value $\mathrm{num}$, the required partner is $\mathrm{complement} = \mathrm{target} - \mathrm{num}$. If the partner is already in the table, return its stored index together with the current index $i$.

## Why it works

Before each iteration, every index stored in $h$ is smaller than $i$. If the complement is found, its value plus the current value equals $\mathrm{target}$, and the two indices are distinct.

If it is not found, storing the current value makes it available to later elements. For the valid pair, the earlier element is therefore present when the later element is processed. Since the problem guarantees exactly one solution, the function returns that pair. Repeated values are handled correctly: with $\mathrm{nums} = [3,3]$ and $\mathrm{target} = 6$, the second element finds the first and returns $[0,1]$.

## Complexity

Let $n = |\mathrm{nums}|$. Under the usual expected constant-time hash-table lookup and insertion model:

Expected time: $O(n)$, using one pass.

Extra space: $O(n)$, for stored values and indices.

The time bound is expected rather than a strict worst-case guarantee. If hash-table operations degrade to linear time because of collisions, the worst-case total can be $O(n^2)$.

## Example

For $\mathrm{nums} = [2,7,11,15]$ and $\mathrm{target} = 9$, first store $h[2] = 0$. At index $i = 1$, the complement is $9 - 7 = 2$, which is already in the table. Return $[0,1]$.

## Takeaway

Check for the complement before inserting the current element. This prevents the same index from being used twice, while still allowing two equal values at different indices. The table stores indices because the required result is a pair of positions.


## C implementation

The C version uses a hash table with linear probing and a separate occupancy flag, supporting zero and negative keys. It searches before insertion, just like the Python version. The table uses $O(n)$ space. Expected $O(n)$ total time assumes well-distributed keys; the fixed hash function can have a worst-case total of $O(n^2)$. The returned array is allocated with `malloc` for the caller to free.

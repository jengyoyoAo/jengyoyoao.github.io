# LeetCode 2: Add Two Numbers

- **Problem:** [Add Two Numbers](https://leetcode.com/problems/add-two-numbers/)
- **Difficulty:** Medium
- **Languages:** Python 3, C99 or later
- **Website:** [Read solution](../../online-judge/leetcode/problem-2.html)
- **Source:** [Python](0002-add-two-numbers.py), [C](0002-add-two-numbers.c)

## Key idea

The lists store the least significant digit first, so traversing from the head follows the same order as ordinary addition. Add the current digits and $\mathrm{carry}$, append the ones digit, and carry the tens digit into the next iteration.

A dummy node gives the result a fixed starting point. The pointer $\mathrm{current}$ tracks the last output node, so every digit is appended in constant time. Return $\mathrm{dummy.next}$ to skip the placeholder.

## Why it works

Before each iteration, the output contains the correct lower-order digits already processed, and $\mathrm{carry}$ is the carry into the next position. The variable $\mathrm{val}$ starts with that carry; the code adds a digit from each list if present, treating a missing digit as zero.

The next carry is $\lfloor \mathrm{val}/10 \rfloor$, and the appended digit is $\mathrm{val} \bmod 10$. This preserves the invariant for the next position. The condition `while l1 or l2 or carry` also processes a final carry after both lists end. When the loop stops, all digits and the final carry have been handled, so the result represents the sum.

## Complexity

Let $n$ and $m$ be the lengths of the two input lists.

Time: $O(\max(n,m))$. Each input node is visited once, with at most one extra iteration for the final carry.

Auxiliary space: $O(1)$ excluding the returned list, using a fixed number of pointers and integers.

Output space: $O(\max(n,m))$, with at most $\max(n,m)+1$ result nodes.

## Example

For $l_1=[2,4,3]$ and $l_2=[5,6,4]$, the represented numbers are $342$ and $465$.

Ones: $2+5=7$; append $7$, carry $0$.

Tens: $4+6=10$; append $0$, carry $1$.

Hundreds: $3+4+1=8$; append $8$, carry $0$.

The result is $[7,0,8]$, representing $807$.

## Takeaway

Linked-list addition can work directly on digits without converting the inputs into whole integers. The dummy node avoids a special case for the first result node, while checking $\mathrm{carry}$ in the loop condition handles a result longer than either input.

LeetCode supplies the `ListNode` definition; the commented definition is retained from my submitted code. The code advances local pointers without changing the input nodes.


## C implementation

The C solution uses the same dummy-node and carry approach. LeetCode provides `struct ListNode`. Result nodes are allocated with `malloc`; the caller owns the returned list. If allocation fails, the partial result is freed. Time and space bounds are the same as the Python solution.

# LeetCode 3: Longest Substring Without Repeating Characters

- **Problem:** [LeetCode 3](https://leetcode.com/problems/longest-substring-without-repeating-characters/)
- **Difficulty:** Medium
- **Languages:** Python 3, C99 or later
- **Website:** [Read solution](../../online-judge/leetcode/problem-3.html)
- **Source:** [Python](0003-longest-substring-without-repeating-characters.py), [C](0003-longest-substring-without-repeating-characters.c)

## Key idea

Maintain a contiguous window from $\mathrm{start}$ to $\mathrm{end}$ with no repeated characters. The dictionary $d$ records the latest index of each character. When the current character already occurs inside the window, jump the left boundary just past its previous occurrence.

After updating the dictionary, compare the window length $\mathrm{end}-\mathrm{start}+1$ with $\mathrm{longest}$. No substring copies are needed.

## Why it works

Before processing each new character, the previous window contains no duplicates. Adding the next character can create only a repetition of that character. If its latest occurrence is inside the window, moving $\mathrm{start}$ to $d[\mathrm{char}]+1$ removes that repetition. Otherwise, the existing left boundary remains valid.

The condition $d[\mathrm{char}] \ge \mathrm{start}$ matters: an occurrence before the window must not move the left boundary backward. Each updated window is the longest valid substring ending at the current index. Taking the maximum over all ending indices therefore gives the global maximum. An empty string leaves $\mathrm{longest}=0$.

## Complexity

Let $n=|s|$ and let $k$ be the number of distinct characters in the input. Assume expected constant-time dictionary lookup and update.

Expected time: $O(n)$, since each index is processed once.

Extra space: $O(k)$, bounded by $O(\min(n,|\Sigma|))$ for character alphabet $\Sigma$.

For a fixed finite alphabet, the dictionary space is bounded independently of input length. Dictionary operations can degrade under collisions, giving a worst-case time bound of $O(n^2)$ under the usual hash-table model.

## Why the boundary check matters

Consider `abba`. After processing the second `b`, the left boundary is $\mathrm{start}=2$. At the final `a`, its previous index is $0$, which is outside the current window. The condition prevents the boundary from moving backward to $1$, which would incorrectly admit `bba`. The final valid window is `ba`, and the result is $2$.

## Takeaway

A last-seen index lets the left boundary jump directly past a duplicate. Always check that the duplicate belongs to the current window. The window boundaries move forward, and the dictionary stores the most recent occurrence even for characters no longer in the window.

The problem asks for a contiguous substring, not a subsequence. The algorithm returns its length rather than constructing the substring itself.


## C implementation

The C solution uses a fixed table of last-seen byte positions initialized to −1. Casting input bytes to `unsigned char` avoids negative table indices. Worst-case time is $O(n)$ and extra space is $O(1)$ for the fixed byte alphabet. It supports the problem’s English letters, digits, symbols, and spaces; it does not decode UTF-8 characters.

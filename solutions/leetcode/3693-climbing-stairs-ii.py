class Solution:
    def climbStairs(self, n: int, costs: list[int]) -> int:
        a = b = c = 0

        for i in range(n):
            a, b, c = b, c, costs[i] + min(c + 1, b + 4, a + 9)

        return c

class Solution:
    def canAliceWin(self, n: int) -> bool:
        k = 10
        win = 0
        while n >= k:
            n -= k
            win = (win + 1) % 2
            k -= 1
        return bool(win)

class Solution:
    def numOfSubarrays(self, arr: list[int]) -> int:
        MOD = 10**9 + 7
        n = len(arr)
        ans = 0

        prefix = [0] * (n + 1)
        for i in range(n):
            prefix[i + 1] = (prefix[i] + arr[i]) % 2

        for size in range(1, n + 1):
            for i in range(n - size + 1):
                ans += (prefix[i + size] - prefix[i]) % 2

        return ans % MOD

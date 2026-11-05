class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        d = dict()
        start = 0
        longest = 0

        for end in range(len(s)):
            char = s[end]

            if char in d and d[char] >= start:
                start = d[char] + 1

            d[char] = end
            longest = max(longest, end - start + 1)

        return longest

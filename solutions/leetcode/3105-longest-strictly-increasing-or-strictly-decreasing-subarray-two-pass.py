class Solution:
    def longestMonotonicSubarray(self, nums: List[int]) -> int:
        longest1 = 1
        longest2 = 1
        start = 0
        for i in range(1, len(nums)):
            if nums[i] <= nums[i-1]:
                longest1 = max(i - start, longest1)
                start = i
        longest1 = max(len(nums) - start, longest1)

        nums = nums[::-1]
        start = 0
        for i in range(1, len(nums)):
            if nums[i] <= nums[i-1]:
                longest2 = max(i - start, longest2)
                start = i
        longest2 = max(len(nums) - start, longest2)

        return max(longest1, longest2)

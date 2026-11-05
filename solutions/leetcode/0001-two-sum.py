class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        h = {}
        for i, num in enumerate(nums):
            complement = target - num
            if complement in h:
                return [h[complement], i]
            else:
                h[num] = i

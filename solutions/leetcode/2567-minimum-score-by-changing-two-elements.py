class Solution:
    def minimizeSum(self, nums: List[int]) -> int:
        nums.sort()
        case1 = nums[-1] - nums[2]
        case2 = nums[-3] - nums[0]
        case3 = nums[-2] - nums[1]

        return min(case1, case2, case3)

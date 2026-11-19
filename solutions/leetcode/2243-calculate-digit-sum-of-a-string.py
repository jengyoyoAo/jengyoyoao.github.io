class Solution:
    def digitSum(self, s: str, k: int) -> str:
        while len(s) > k:
            temp = ''
            for i in range(0, len(s), k):
                group_sum = sum(int(x) for x in s[i: i+k])
                temp += str(group_sum)
            s = temp
        return s

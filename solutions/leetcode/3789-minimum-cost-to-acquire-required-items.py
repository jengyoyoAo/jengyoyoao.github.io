class Solution:
    def minimumCost(self, cost1: int, cost2: int, costBoth: int, need1: int, need2: int) -> int:
        c1 = min(cost1, costBoth)
        c2 = min(cost2, costBoth)
        c = min(cost1 + cost2, costBoth)

        same = min(need1, need2)
        rem1 = need1 - same
        rem2 = need2 - same

        total = c * same + c1 * rem1 + c2 * rem2
        return total

class Solution:
    def findTheDistanceValue(self, arr1: list[int], arr2: list[int], d: int) -> int:
        count = 0
        arr2.sort()

        for num in arr1:
            is_vaild = 1
            l, r = 0, len(arr2) - 1

            while l <= r:
                mid = (l + r) // 2
                if abs(num - arr2[mid]) <= d:
                    is_vaild = 0
                    break
                elif num > arr2[mid]:
                    l = mid + 1
                else:
                    r = mid - 1
            count += is_vaild
        return count

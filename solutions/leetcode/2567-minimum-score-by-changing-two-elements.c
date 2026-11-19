#include <stdlib.h>

static int compare(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return (x > y) - (x < y);
}

int minimizeSum(int *nums, int numsSize) {
    qsort(nums, (size_t)numsSize, sizeof(*nums), compare);

    int case1 = nums[numsSize - 1] - nums[2];
    int case2 = nums[numsSize - 3] - nums[0];
    int case3 = nums[numsSize - 2] - nums[1];

    int ans = case1 < case2 ? case1 : case2;
    return ans < case3 ? ans : case3;
}

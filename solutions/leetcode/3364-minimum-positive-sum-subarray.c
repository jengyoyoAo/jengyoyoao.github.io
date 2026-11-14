#include <limits.h>
#include <stdlib.h>

int minimumSumSubarray(int *nums, int numsSize, int l, int r) {
    int n = numsSize;
    int ans = INT_MAX;
    int *prefix = malloc(((size_t)n + 1) * sizeof(*prefix));
    if (prefix == NULL) {
        return -1;
    }

    prefix[0] = 0;
    for (int i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    for (int size = l; size <= r; size++) {
        for (int i = 0; i <= n - size; i++) {
            int s = prefix[i + size] - prefix[i];
            if (s > 0 && s < ans) {
                ans = s;
            }
        }
    }

    free(prefix);
    return ans == INT_MAX ? -1 : ans;
}

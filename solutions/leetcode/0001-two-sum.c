#include <stdlib.h>

typedef struct {
    int key;
    int index;
    int used;
} Entry;

static unsigned int hash(int key) {
    return (unsigned int)key * 2654435761u;
}

int *twoSum(int *nums, int numsSize, int target, int *returnSize) {
    *returnSize = 0;
    int capacity = 2 * numsSize + 1;
    Entry *h = calloc((size_t)capacity, sizeof(Entry));
    if (h == NULL) {
        return NULL;
    }

    for (int i = 0; i < numsSize; i++) {
        int num = nums[i];
        int complement = target - num;
        unsigned int pos = hash(complement) % (unsigned int)capacity;

        while (h[pos].used) {
            if (h[pos].key == complement) {
                int *ans = malloc(2 * sizeof(int));
                if (ans != NULL) {
                    ans[0] = h[pos].index;
                    ans[1] = i;
                    *returnSize = 2;
                }
                free(h);
                return ans;
            }
            pos = (pos + 1) % (unsigned int)capacity;
        }

        pos = hash(num) % (unsigned int)capacity;
        while (h[pos].used && h[pos].key != num) {
            pos = (pos + 1) % (unsigned int)capacity;
        }
        h[pos].key = num;
        h[pos].index = i;
        h[pos].used = 1;
    }

    free(h);
    return NULL;
}

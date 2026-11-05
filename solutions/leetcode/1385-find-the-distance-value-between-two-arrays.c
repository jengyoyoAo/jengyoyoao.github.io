#include <stdlib.h>

int compare(const void *a, const void *b) {
    int x = *(const int *)a;
    int y = *(const int *)b;
    return (x > y) - (x < y);
}

int findTheDistanceValue(int *arr1, int arr1Size,
                         int *arr2, int arr2Size, int d) {
    int count = 0;
    qsort(arr2, arr2Size, sizeof(int), compare);

    for (int i = 0; i < arr1Size; i++) {
        int num = arr1[i];
        int is_valid = 1;
        int l = 0, r = arr2Size - 1;

        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (abs(num - arr2[mid]) <= d) {
                is_valid = 0;
                break;
            } else if (num > arr2[mid]) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }
        count += is_valid;
    }
    return count;
}

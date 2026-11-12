int longestMonotonicSubarray(int *nums, int numsSize) {
    int inc = 1, dec = 1, max_len = 1;
    for (int i = 1; i < numsSize; i++) {
        if (nums[i] > nums[i - 1]) {
            inc++;
            dec = 1;
        } else if (nums[i] < nums[i - 1]) {
            dec++;
            inc = 1;
        } else {
            inc = dec = 1;
        }
        if (inc > max_len) {
            max_len = inc;
        }
        if (dec > max_len) {
            max_len = dec;
        }
    }
    return max_len;
}

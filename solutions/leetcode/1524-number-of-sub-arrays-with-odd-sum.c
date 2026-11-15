int numOfSubarrays(int *arr, int arrSize) {
    const int MOD = 1000000007;
    long long ans = 0;
    int curr_parity = 0;
    int even_count = 1;
    int odd_count = 0;

    for (int i = 0; i < arrSize; i++) {
        curr_parity = (curr_parity + arr[i]) % 2;
        if (curr_parity == 1) {
            ans += even_count;
            odd_count++;
        } else {
            ans += odd_count;
            even_count++;
        }
    }

    return (int)(ans % MOD);
}

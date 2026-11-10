int climbStairs(int n, int *costs, int costsSize) {
    (void)costsSize;
    int a = 0, b = 0, c = 0;

    for (int i = 0; i < n; i++) {
        int best = c + 1;
        if (b + 4 < best) {
            best = b + 4;
        }
        if (a + 9 < best) {
            best = a + 9;
        }

        int next = costs[i] + best;
        a = b;
        b = c;
        c = next;
    }

    return c;
}

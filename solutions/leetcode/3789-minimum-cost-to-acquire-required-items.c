static int min(int a, int b) {
    return a < b ? a : b;
}

long long minimumCost(int cost1, int cost2, int costBoth,
                      int need1, int need2) {
    int c1 = min(cost1, costBoth);
    int c2 = min(cost2, costBoth);
    int c = min(cost1 + cost2, costBoth);

    int same = min(need1, need2);
    int rem1 = need1 - same;
    int rem2 = need2 - same;

    long long total = (long long)c * same
                   + (long long)c1 * rem1
                   + (long long)c2 * rem2;
    return total;
}

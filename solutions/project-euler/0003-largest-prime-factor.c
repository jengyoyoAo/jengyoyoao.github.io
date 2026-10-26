#include <stdio.h>
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void){
    long long n = 600851475143LL;
    long long ans = -1;

    while (n % 2 == 0) {
        ans = MAX(ans, 2);
        n /= 2;
    }

    for (long long i = 3; i * i <= n; i += 2) {
        while (n % i == 0) {
            ans = MAX(ans, i);
            n /= i;
        }
    }

    ans = MAX(ans, n);

    printf("%lld\n", ans);
    return 0;
}

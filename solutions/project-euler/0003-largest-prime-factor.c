#include <stdio.h>
#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main(void){
    long long n = 600851475143LL;
    long long answer = -1;

    while (n % 2 == 0) {
        answer = MAX(answer, 2);
        n /= 2;
    }

    for (long long i = 3; i * i <= n; i += 2) {
        while (n % i == 0) {
            answer = MAX(answer, i);
            n /= i;
        }
    }

    answer = MAX(answer, n);

    printf("%lld\n", answer);
    return 0;
}

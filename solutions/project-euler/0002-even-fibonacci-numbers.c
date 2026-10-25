#include <stdio.h>

int main(void)
{
    long long n = 4000000;
    long long a = 1, b = 1;
    long long c = a + b;
    long long total = 0;

    while (c < n) {
        if (c % 2 == 0) {
            total += c;
        }
        a = b;
        b = c;
        c = a + b;
    }

    printf("%lld\n", total);
    return 0;
}

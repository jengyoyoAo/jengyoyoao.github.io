#include <stdio.h>

int main(void)
{
    int n = 1000;
    int total = 0;
    int i;

    for (i = 0; i < n; i++) {
        if (i % 3 == 0 || i % 5 == 0) {
            total += i;
        }
    }

    printf("%d\n", total);
    return 0;
}

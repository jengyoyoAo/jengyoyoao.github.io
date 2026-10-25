#include <stdio.h>
#define MAX(a, b) (a > b ? a : b)

int is_palindrome(long long num){
    int n = num, m = 0;
    while (num != 0){
        m = m * 10 + num % 10;;
        num /= 10;
    }
    return m == n;
}

int main(void) {
    long long num;
    long long ans = -1;
    for (int i = 999; i >= 100; i--){
        for (int j = i; j >= 100; j--){
            num = i * j;
            if (num <= ans) {
                break;
            }
            if (is_palindrome(num)) {
                ans = num;
            }
        }
    }
    printf("%lld\n", ans);
    return 0;
}

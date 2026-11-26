#include <stdbool.h>

bool canAliceWin(int n) {
    int k = 10;
    int win = 0;
    while (n >= k) {
        n -= k;
        win = (win + 1) % 2;
        k--;
    }
    return (bool)win;
}

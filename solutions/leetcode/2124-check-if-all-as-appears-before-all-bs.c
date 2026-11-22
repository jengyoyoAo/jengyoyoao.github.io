#include <stdbool.h>

bool checkString(char *s) {
    for (int i = 1; s[i] != '\0'; i++) {
        if (s[i - 1] == 'b' && s[i] == 'a') {
            return false;
        }
    }
    return true;
}

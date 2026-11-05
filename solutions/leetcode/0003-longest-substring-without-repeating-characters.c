#include <limits.h>

int lengthOfLongestSubstring(char *s) {
    int d[UCHAR_MAX + 1];
    for (int i = 0; i <= UCHAR_MAX; i++) {
        d[i] = -1;
    }

    int start = 0;
    int longest = 0;

    for (int end = 0; s[end] != '\0'; end++) {
        unsigned char c = (unsigned char)s[end];

        if (d[c] >= start) {
            start = d[c] + 1;
        }

        d[c] = end;
        int length = end - start + 1;
        if (length > longest) {
            longest = length;
        }
    }

    return longest;
}

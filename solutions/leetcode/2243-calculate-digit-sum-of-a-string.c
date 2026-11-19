#include <stdlib.h>
#include <string.h>

char *digitSum(char *s, int k) {
    int length = (int)strlen(s);
    char *current = malloc((size_t)length + 1);
    char *next = malloc((size_t)length + 1);
    if (current == NULL || next == NULL) {
        free(current);
        free(next);
        return NULL;
    }
    memcpy(current, s, (size_t)length + 1);

    while (length > k) {
        int write = 0;
        for (int i = 0; i < length; i += k) {
            int group_sum = 0;
            for (int j = i; j < length && j < i + k; j++) {
                group_sum += current[j] - '0';
            }

            char digits[12];
            int count = 0;
            do {
                digits[count++] = (char)('0' + group_sum % 10);
                group_sum /= 10;
            } while (group_sum > 0);

            while (count > 0) {
                next[write++] = digits[--count];
            }
        }
        next[write] = '\0';

        char *temp = current;
        current = next;
        next = temp;
        length = write;
    }

    free(next);
    return current;
}

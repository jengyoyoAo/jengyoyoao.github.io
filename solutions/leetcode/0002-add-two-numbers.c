#include <stdlib.h>

/**
 * Definition for singly-linked list (provided by LeetCode).
 * struct ListNode {
 *     int val;
 *     struct ListNode *next;
 * };
 */
struct ListNode *addTwoNumbers(struct ListNode *l1, struct ListNode *l2) {
    struct ListNode dummy = {0, NULL};
    struct ListNode *current = &dummy;
    int carry = 0;

    while (l1 != NULL || l2 != NULL || carry != 0) {
        int val = carry;
        if (l1 != NULL) {
            val += l1->val;
            l1 = l1->next;
        }
        if (l2 != NULL) {
            val += l2->val;
            l2 = l2->next;
        }

        carry = val / 10;
        val %= 10;

        struct ListNode *node = malloc(sizeof(*node));
        if (node == NULL) {
            current = dummy.next;
            while (current != NULL) {
                struct ListNode *next = current->next;
                free(current);
                current = next;
            }
            return NULL;
        }
        node->val = val;
        node->next = NULL;
        current->next = node;
        current = current->next;
    }

    return dummy.next;
}

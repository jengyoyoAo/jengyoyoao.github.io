#include <stdlib.h>

int *findSubtreeSizes(int *parent, int parentSize, char *s, int *returnSize) {
    int n = parentSize;
    *returnSize = 0;
    int *workspace = malloc((size_t)n * 6 * sizeof(int));
    int *ans = malloc((size_t)n * sizeof(int));
    if (workspace == NULL || ans == NULL) {
        free(workspace);
        free(ans);
        return NULL;
    }

    int *head = workspace;
    int *next = head + n;
    int *new_parent = next + n;
    int *stack = new_parent + n;
    int *prev = stack + n;
    int *order = prev + n;
    int last_seen[26];

    for (int c = 0; c < 26; c++) {
        last_seen[c] = -1;
    }
    for (int i = 0; i < n; i++) {
        head[i] = -1;
        new_parent[i] = parent[i];
        ans[i] = 1;
    }
    for (int i = 1; i < n; i++) {
        next[i] = head[parent[i]];
        head[parent[i]] = i;
    }

    int top = 0;
    stack[top++] = 0;
    prev[0] = -1;
    last_seen[s[0] - 'a'] = 0;

    while (top > 0) {
        int node = stack[top - 1];
        int child = head[node];
        if (child == -1) {
            last_seen[s[node] - 'a'] = prev[node];
            top--;
        } else {
            head[node] = next[child];
            int c = s[child] - 'a';
            prev[child] = last_seen[c];
            if (last_seen[c] != -1) {
                new_parent[child] = last_seen[c];
            }
            last_seen[c] = child;
            stack[top++] = child;
        }
    }

    for (int i = 0; i < n; i++) {
        head[i] = -1;
    }
    for (int i = 1; i < n; i++) {
        next[i] = head[new_parent[i]];
        head[new_parent[i]] = i;
    }

    int count = 0;
    stack[top++] = 0;
    while (top > 0) {
        int node = stack[--top];
        order[count++] = node;
        for (int child = head[node]; child != -1; child = next[child]) {
            stack[top++] = child;
        }
    }
    for (int i = count - 1; i > 0; i--) {
        int node = order[i];
        ans[new_parent[node]] += ans[node];
    }

    free(workspace);
    *returnSize = n;
    return ans;
}

#include <stdlib.h>

struct Query {
    int index;
    int time;
};

static int compareLogs(const void *a, const void *b) {
    const int *left = *(const int *const *)a;
    const int *right = *(const int *const *)b;
    return (left[1] > right[1]) - (left[1] < right[1]);
}

static int compareQueries(const void *a, const void *b) {
    const struct Query *left = a;
    const struct Query *right = b;
    return (left->time > right->time) - (left->time < right->time);
}

int *countServers(int n, int **logs, int logsSize, int *logsColSize,
                  int x, int *queries, int queriesSize, int *returnSize) {
    (void)logsColSize;
    *returnSize = 0;
    if (queriesSize == 0) {
        return NULL;
    }

    int *answer = malloc((size_t)queriesSize * sizeof(*answer));
    struct Query *sorted_queries = malloc((size_t)queriesSize * sizeof(*sorted_queries));
    int *server_counts = calloc((size_t)n + 1, sizeof(*server_counts));
    if (answer == NULL || sorted_queries == NULL || server_counts == NULL) {
        free(answer);
        free(sorted_queries);
        free(server_counts);
        return NULL;
    }

    qsort(logs, (size_t)logsSize, sizeof(*logs), compareLogs);
    for (int i = 0; i < queriesSize; i++) {
        sorted_queries[i].index = i;
        sorted_queries[i].time = queries[i];
    }
    qsort(sorted_queries, (size_t)queriesSize, sizeof(*sorted_queries), compareQueries);

    int active_servers_count = 0;
    int left = 0, right = 0;
    for (int i = 0; i < queriesSize; i++) {
        int window_end = sorted_queries[i].time;
        int window_start = window_end - x;

        while (right < logsSize && logs[right][1] <= window_end) {
            int server_id = logs[right][0];
            if (server_counts[server_id] == 0) {
                active_servers_count++;
            }
            server_counts[server_id]++;
            right++;
        }

        while (left < right && logs[left][1] < window_start) {
            int server_id = logs[left][0];
            server_counts[server_id]--;
            if (server_counts[server_id] == 0) {
                active_servers_count--;
            }
            left++;
        }

        answer[sorted_queries[i].index] = n - active_servers_count;
    }

    free(sorted_queries);
    free(server_counts);
    *returnSize = queriesSize;
    return answer;
}

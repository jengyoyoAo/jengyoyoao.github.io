#include <stdlib.h>

typedef struct {
    long long free_time;
    int weight;
    int index;
} Server;

typedef struct {
    Server *data;
    int size;
    int working;
} Heap;

static int less(Server a, Server b, int working) {
    if (working && a.free_time != b.free_time) {
        return a.free_time < b.free_time;
    }
    if (a.weight != b.weight) {
        return a.weight < b.weight;
    }
    return a.index < b.index;
}

static void siftDown(Heap *heap, int pos) {
    Server server = heap->data[pos];
    while (2 * pos + 1 < heap->size) {
        int child = 2 * pos + 1;
        if (child + 1 < heap->size &&
            less(heap->data[child + 1], heap->data[child], heap->working)) {
            child++;
        }
        if (!less(heap->data[child], server, heap->working)) {
            break;
        }
        heap->data[pos] = heap->data[child];
        pos = child;
    }
    heap->data[pos] = server;
}

static void push(Heap *heap, Server server) {
    int pos = heap->size++;
    while (pos > 0) {
        int parent = (pos - 1) / 2;
        if (!less(server, heap->data[parent], heap->working)) {
            break;
        }
        heap->data[pos] = heap->data[parent];
        pos = parent;
    }
    heap->data[pos] = server;
}

static Server pop(Heap *heap) {
    Server server = heap->data[0];
    heap->size--;
    if (heap->size > 0) {
        heap->data[0] = heap->data[heap->size];
        siftDown(heap, 0);
    }
    return server;
}

int *assignTasks(int *servers, int serversSize, int *tasks,
                 int tasksSize, int *returnSize) {
    *returnSize = 0;
    if (serversSize <= 0 || tasksSize <= 0) {
        return NULL;
    }

    int *ans = malloc((size_t)tasksSize * sizeof(*ans));
    Heap available = {malloc((size_t)serversSize * sizeof(Server)), serversSize, 0};
    Heap working = {malloc((size_t)serversSize * sizeof(Server)), 0, 1};
    if (ans == NULL || available.data == NULL || working.data == NULL) {
        free(ans);
        free(available.data);
        free(working.data);
        return NULL;
    }

    for (int i = 0; i < serversSize; i++) {
        available.data[i] = (Server){0, servers[i], i};
    }
    for (int i = serversSize / 2; i > 0; i--) {
        siftDown(&available, i - 1);
    }

    long long time = 0;
    for (int i = 0; i < tasksSize; i++) {
        if (time < i) {
            time = i;
        }
        if (available.size == 0 && time < working.data[0].free_time) {
            time = working.data[0].free_time;
        }

        while (working.size > 0 && working.data[0].free_time <= time) {
            push(&available, pop(&working));
        }

        Server server = pop(&available);
        ans[i] = server.index;
        server.free_time = time + tasks[i];
        push(&working, server);
    }

    free(available.data);
    free(working.data);
    *returnSize = tasksSize;
    return ans;
}

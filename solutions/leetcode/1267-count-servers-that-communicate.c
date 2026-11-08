#include <stdlib.h>

int countServers(int **grid, int gridSize, int *gridColSize) {
    int m = gridSize;
    int n = gridColSize[0];
    int *row_count = calloc((size_t)m, sizeof(*row_count));
    int *col_count = calloc((size_t)n, sizeof(*col_count));
    if (row_count == NULL || col_count == NULL) {
        free(row_count);
        free(col_count);
        return -1;
    }

    int count = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1) {
                row_count[i]++;
                col_count[j]++;
            }
        }
    }

    for (int i = 0; i < m; i++) {
        if (row_count[i] == 0) {
            continue;
        }
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == 1 &&
                (row_count[i] > 1 || col_count[j] > 1)) {
                count++;
            }
        }
    }

    free(row_count);
    free(col_count);
    return count;
}

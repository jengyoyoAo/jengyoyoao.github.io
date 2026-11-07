import heapq

class Solution:
    def assignTasks(self, servers: list[int], tasks: list[int]) -> list[int]:
        available = [(w, i) for i, w in enumerate(servers)]
        heapq.heapify(available)

        working = []
        ans = []
        time = 0

        for i, task_time in enumerate(tasks):
            time = max(time, i)

            if not available:
                time = max(time, working[0][0])

            while working and working[0][0] <= time:
                free_time, weight, index = heapq.heappop(working)
                heapq.heappush(available, (weight, index))

            weight, index = heapq.heappop(available)
            ans.append(index)

            heapq.heappush(working, (time + task_time, weight, index))

        return ans

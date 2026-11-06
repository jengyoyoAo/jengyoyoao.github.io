class Solution:
    def countServers(self, n: int, logs: List[List[int]], x: int, queries: List[int]) -> List[int]:
        logs.sort(key = lambda item: item[1])
        sorted_queries = sorted(enumerate(queries), key = lambda item: item[1])
        answer = [0] * len(queries)
        server_counts = dict()
        active_servers_count = 0
        num_logs = len(logs)

        left, right = 0, 0
        for idx, q_time in sorted_queries:
            window_start = q_time - x
            window_end = q_time

            while right < num_logs and logs[right][1] <= window_end:
                server_id = logs[right][0]
                if server_counts.get(server_id, 0) == 0:
                    active_servers_count += 1
                server_counts[server_id] = server_counts.get(server_id, 0) + 1
                right += 1

            while left < num_logs and logs[left][1] < window_start:
                server_id = logs[left][0]
                server_counts[server_id] -= 1
                if server_counts[server_id] == 0:
                    active_servers_count -= 1
                left += 1

            answer[idx] = n - active_servers_count
        return answer

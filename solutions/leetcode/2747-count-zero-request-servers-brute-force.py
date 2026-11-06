class Solution:
    def countServers(self, n: int, logs: List[List[int]], x: int, queries: List[int]) -> List[int]:
        answer = []
        for i in range(len(queries)):
            duration = [queries[i]-x, queries[i]]
            count = 0
            is_requested = {i+1: 0 for i in range(n)}
            for server_id, time in logs:
                if is_requested[server_id] == 0 and duration[0] <= time and time <= duration[1]:
                    count += 1
                    is_requested[server_id] = 1

            answer.append(n - count)
        return answer

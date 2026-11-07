import queue

class Server:
    def __init__(self, index, weight, available=1):
        self.index = index
        self.weight = weight

class Task:
    def __init__(self, process_time, start_time=-1):
        self.start_time = start_time
        self.process_time = process_time

class Solution:
    def assignTasks(self, servers: list[int], tasks: list[int]) -> list[int]:
        n = len(servers)
        m = len(tasks)
        answer = []
        q = queue.Queue()

        available_servers = [Server(index, weight) for index, weight in enumerate(servers)]
        available_servers.sort(key=lambda server: (server.weight, server.index))
        working = [] # (Task, Server)

        my_tasks = [Task(processing_time) for processing_time in tasks]

        time = 0
        task_index = 0

        while task_index < len(my_tasks) or not q.empty():

            while task_index < len(my_tasks) and task_index <= time:
                q.put(my_tasks[task_index])
                task_index += 1

            for i in range(len(working) - 1, -1, -1):
                task, server = working[i]
                if time - task.start_time == task.process_time:
                    del working[i]
                    available_servers.append(server)

            available_servers.sort(key=lambda server: (server.weight, server.index))

            if not available_servers and working:
                min_remaining = min(t.process_time - (time - t.start_time) for t, s in working)
                time += min_remaining
                continue

            while not q.empty() and available_servers:
                task = q.get()
                task.start_time = time
                server = available_servers.pop(0)
                working.append((task, server))
                answer.append(server.index)

            time += 1

        return answer

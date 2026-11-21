class Solution:
    def findSubtreeSizes(self, parent: List[int], s: str) -> List[int]:
        n = len(parent)

        adj = [[] for _ in range(n)]
        for i in range(1, n):
            adj[parent[i]].append(i)

        new_parent = list(parent)
        last_seen = {}

        def find_parents(node: int):
            char = s[node]

            if char in last_seen:
                new_parent[node] = last_seen[char]

            prev_node = last_seen.get(char, None)
            last_seen[char] = node

            for child in adj[node]:
                find_parents(child)

            if prev_node is None:
                del last_seen[char]
            else:
                last_seen[char] = prev_node

        find_parents(0)

        new_adj = [[] for _ in range(n)]
        for i in range(1, n):
            new_adj[new_parent[i]].append(i)

        ans = [0] * n

        def count_sizes(node: int) -> int:
            size = 1
            for child in new_adj[node]:
                size += count_sizes(child)
            ans[node] = size
            return size

        count_sizes(0)
        return ans

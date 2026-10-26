n = 600851475143
ans = -1

def factorization(n):
    global ans
    if n % 2 == 0: return factorization(n//2)
    for i in range(3, int(n**0.5)+1, 2):
        if n % i == 0:
            ans = max(ans, i)
            return factorization(n//i)
    ans = max(ans, n)

factorization(n)
print(ans)

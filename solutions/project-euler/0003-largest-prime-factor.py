n = 600851475143
answer = -1

def factorization(n):
    global answer
    if n % 2 == 0: return factorization(n//2)
    for i in range(3, int(n**0.5)+1, 2):
        if n % i == 0:
            answer = max(answer, i)
            return factorization(n//i)
    answer = max(answer, n)

factorization(n)
print(answer)

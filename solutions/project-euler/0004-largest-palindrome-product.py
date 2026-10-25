def is_palindrome(num):
    n, m = num, 0
    while num != 0:
        m = m * 10 + num % 10
        num //= 10
    return m == n


ans = -1
for i in range(999, 99, -1):
    for j in range(i, 99, -1):
        num = i * j
        if num <= ans:
            break
        if is_palindrome(num):
            ans = num
print(ans)

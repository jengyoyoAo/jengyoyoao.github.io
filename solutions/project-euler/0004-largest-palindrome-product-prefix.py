ans = -1

for prefix in range(999, 99, -1):
    num = prefix
    n = prefix

    while n != 0:
        num = num * 10 + n % 10
        n //= 10

    for i in range(110, 1000, 11):
        if num % i == 0:
            j = num // i
            if 100 <= j <= 999:
                ans = num
                break

    if ans != -1:
        break

print(ans)

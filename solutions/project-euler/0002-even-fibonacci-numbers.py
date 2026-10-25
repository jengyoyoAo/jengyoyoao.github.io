n = 4_000_000
a = 1
b = 1
c = a + b
total = 0

while c < n:
    if c % 2 == 0:
        total += c
    a = b
    b = c
    c = a + b

print(total)

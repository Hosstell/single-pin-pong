data = open("20ms.txt", 'r').read()

data = data.split("\n")
data = list([x.split(" ") for x in data])
data = [[float(x), float(y), float(z), float(t)] for x, y, z, t in data]

s = 0
v = 0
for i in range(1, len(data)):
    a = data[i][0]
    t = (data[i][3] - data[i-1][3]) / 1000

    s += v * t + a * t * t
    v += a * t

print(s)
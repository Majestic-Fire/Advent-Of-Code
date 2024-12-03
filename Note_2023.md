#### Day 1
---
- last occurence
  - `re.search("(?s:.*)pattern", "target_text")`

#### Day 2
---
- Used Class Approach (could be just dataclass[struct])

#### Day 3
---
- simplify naming
- loop
``` python
for cr in [row-1, row, row+1]:
    for cc in [col-1, col, col+1]:
```

#### Day 4
---
- match 2 list
```
count = sum(n in winNum for n in num)
```

#### Day5
---
- use map to iterate string to int
```
seeds = list(map(seeds.split(': ')[1].split()))
```

- enumerate doesnt work
- get the min from last map, and derive back
- get dest + len that falls in upper map
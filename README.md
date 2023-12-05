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
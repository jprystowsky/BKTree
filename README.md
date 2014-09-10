BKTree
------

A very simple illustration of a Burkhard-Keller tree in node. BK trees are ideal for applications involving O(log n) searches of values defined by a metric space -- e.g., fuzzy image matching, word predictions, or typo correction.

This instance creates a BK tree of words using the Levenshtein distance. It uses a hard-coded corpus that could easily be exchanged for one that isn't.

```
node index.js --term something --distance x
```

License
-------
MIT
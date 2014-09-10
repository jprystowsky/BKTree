BKTree
------

A very simple illustration of a Burkhard-Keller tree in node. BK trees are ideal for applications involving O(log n) searches of values defined by a metric space -- e.g., fuzzy image matching, word predictions, or typo correction.

This instance creates a BK tree of words using the Levenshtein distance. It uses a hard-coded corpus that could easily be exchanged for one that isn't.

```
node index.js --term something --distance x
```

Thanks To
---------

[This blog post](http://nullwords.wordpress.com/2013/03/13/the-bk-tree-a-data-structure-for-spell-checking/) is great.

See also [here](http://blog.notdot.net/2007/4/Damn-Cool-Algorithms-Part-1-BK-Trees) and [here](https://stackoverflow.com/questions/6389841/efficiently-find-binary-strings-with-low-hamming-distance-in-large-set).

Initial inspiration [is this thing on images](http://hackerlabs.org/blog/2012/07/30/organizing-photos-with-duplicate-and-similarity-checking/).

License
-------
MIT
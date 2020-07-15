# edit-distance-search

Compute the edit distance between strings by approximate matching.

Algorithm described here:
https://www.youtube.com/watch?v=NjfNZzJiu8o

This is **not** a direct implementation of the Levenshtein algorithm. For a good one of those, see: https://github.com/hiddentao/fast-levenshtein

The difference is that this version performs a fuzzy (with gaps) sub-string search, returning the distance to a complete match.

## Examples

```js
// Exact match, returns 0.
editDistanceForClosestMatch("alphabet", "alphabet");

// Near match: one insert required, returns 1.
editDistanceForClosestMatch("alphabet", "lphabet");
```

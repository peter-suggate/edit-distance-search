/**
 * Very basic tests using no dependencies.
 */

const editDistanceForClosestMatch = require("../src/index")
  .editDistanceForClosestMatch;

function assert(cond, message) {
  if (!cond) {
    throw Error(message ? "Test failed on: " + message : "Test failed!");
  }
}

assert(editDistanceForClosestMatch("", "") === 0, "empty input");
assert(editDistanceForClosestMatch("alphabet", "") === 0, "empty pattern");
assert(editDistanceForClosestMatch("", "value") === 0, "empty text");
assert(
  editDistanceForClosestMatch("alphabet", "alphabet") === 0,
  "exact match"
);
assert(
  editDistanceForClosestMatch("alphabet", "lphabet") === 0,
  "exact partial match"
);
assert(
  editDistanceForClosestMatch("c", "abc") === 2,
  "pattern longer than text (suffix)"
);
assert(
  editDistanceForClosestMatch("phabet", "alphabet") === 2,
  "pattern longer than text (prefix)"
);
assert(
  editDistanceForClosestMatch("betabet", "alphabet") === 4,
  "substring match"
);
assert(editDistanceForClosestMatch("roar", "rr") === 1, "substring match 2");
assert(
  editDistanceForClosestMatch("TATTGGCTATACGGTT", "GCGTATGC") === 2,
  "example from https://www.youtube.com/watch?v=NjfNZzJiu8o"
);

console.log("All tests passed.");

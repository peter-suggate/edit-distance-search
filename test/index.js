/**
 * Very basic tests using no dependencies.
 */

const editDistanceForClosestMatch = require("../src/index")
  .editDistanceForClosestMatch;

function assert(cond) {
  if (!cond) {
    throw Error("Assertion failed");
  }
}

assert(editDistanceForClosestMatch("", "") === 0);
assert(editDistanceForClosestMatch("alphabet", "") === 0);
assert(editDistanceForClosestMatch("alphabet", "alphabet") === 0);
assert(editDistanceForClosestMatch("alphabet", "lphabet") === 0);
assert(editDistanceForClosestMatch("phabet", "alphabet") === 2);
assert(editDistanceForClosestMatch("betabet", "alphabet") === 3);

console.log("All tests passed.");

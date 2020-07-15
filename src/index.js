/**
 * Calculates the smallest edit distance required to exact match candiate string
 * within the text string.
 *
 * @example
 *  // Exact match, returns 0.
 *  editDistanceForClosestMatch('alphabet', 'alphabet')
 *
 *  // Exact (substring) match: returns 0.
 *  editDistanceForClosestMatch('alphabet', 'lphabet')
 *
 *  // Near match: one delete required, returns 1.
 *  editDistanceForClosestMatch('lphabet', 'alphabet')
 *
 * @param {string} text The text to search within.
 * @param {string} candidate The text to approximate-search for.
 *
 * @returns the minimum edit distance for any approximate (or exact in which
 * case this will be 0) match.
 */
function editDistanceForClosestMatch(text, candidate) {
  const M = text.length;
  const N = candidate.length;

  if (!M || !N) return 0;

  // Initialize a 2d grid that holds edit distance values for any prefix of text
  // vs any prefix of candidate.
  const grid = new Array(M);
  for (let m = 0; m < M; m++) {
    grid[m] = new Array(N);

    // Initialize top row with zeroes.
    grid[m][0] = 0;
  }

  // Initialize first column with ascending integers.
  for (let n = 0; n < N; n++) {
    grid[0][n] = n;
  }

  for (let n = 1; n < N; n++) {
    for (let m = 1; m < M; m++) {
      const curCellDist = text[m] === candidate[n] ? 0 : 1;

      const aboveLeftDistance = grid[m - 1][n - 1] + curCellDist;
      const leftDistance = grid[m - 1][n] + 1;
      const aboveDistance = grid[m][n - 1] + 1;

      grid[m][n] = Math.min(
        aboveDistance,
        Math.min(aboveLeftDistance, leftDistance)
      );
    }
  }

  return grid[M - 1][N - 1];
}

module.exports = {
  editDistanceForClosestMatch,
};

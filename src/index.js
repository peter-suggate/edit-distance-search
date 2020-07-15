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
 * @param {string} pattern The text to approximate-search for.
 *
 * @returns the minimum edit distance for any approximate (or exact in which
 * case this will be 0) match.
 */
function editDistanceForClosestMatch(textIn, pattern) {
  if (!textIn || !pattern) return 0;

  // Allow pattern to be longer than text.
  let text = textIn.padEnd(pattern.length);

  const M = pattern.length + 1;
  const N = text.length + 1;

  // Initialize a 2d grid that holds edit distance values for any prefix of text
  // vs any prefix of candidate.
  const grid = new Array(M);
  for (let m = 0; m < M; m++) {
    grid[m] = new Array(N);

    // Initialize first column with ascending integers.
    grid[m][0] = m;
  }

  // Initialize top row with zeroes.
  for (let n = 0; n < N; n++) {
    grid[0][n] = 0;
  }

  // Populate the grid.
  for (let m = 1; m < M; m++) {
    for (let n = 1; n < N; n++) {
      const curCellDist = text[n - 1] === pattern[m - 1] ? 0 : 1;

      const aboveLeftDistance = grid[m - 1][n - 1] + curCellDist;
      const leftDistance = grid[m - 1][n] + 1;
      const aboveDistance = grid[m][n - 1] + 1;

      grid[m][n] = Math.min(
        aboveDistance,
        Math.min(aboveLeftDistance, leftDistance)
      );
    }
  }

  // For debugging.
  // for (let n = 0; n < M; n++) {
  //   let row = "";
  //   for (let m = 0; m < N; m++) {
  //     row += grid[n][m] + ", ";
  //   }
  //   console.log(row);
  // }

  // Minimum edit distance is found on the bottom row.
  return Math.min(...grid[M - 1]);
}

module.exports = {
  editDistanceForClosestMatch,
};

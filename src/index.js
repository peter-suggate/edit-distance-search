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
 * @param optional memoization of the grid that holds state created for the
 * edit distance algorithm. Can be used to perform next steps, for example,
 * a trace back algorithm.
 *
 * @returns the minimum edit distance for any approximate (or exact in which
 * case this will be 0) match.
 */
function editDistanceForClosestMatch(
  textIn,
  pattern,
  infoOut = { grid: undefined }
) {
  if (!textIn || !pattern) return 0;

  // Allow pattern to be longer than text.
  let text = textIn.padEnd(pattern.length);

  const M = pattern.length + 1;
  const N = text.length + 1;

  // Initialize a 2d grid that holds edit distance values for any prefix of text
  // vs any prefix of candidate.
  infoOut.grid = new Array(M);
  const grid = infoOut.grid;
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

/**
 * Given a text string, a pattern string, an edit distance and the grid that was used to
 * generate edit distance, find the list of deletions, insertions and substitutions that
 * transform pattern to text.
 *
 * This is a linear time algorithm which simply traces back through the grid.
 *
 * @param {string} text The text that was searched within.
 * @param {string} pattern The text that was approximate-searched for.
 * @param {number} distance The distance returned from editDistanceForClosestMatch
 * @param {[][]} grid The edit distance grid obtained from editDistanceForClosestMatch
 */
function editDistanceBacktrack(text, pattern, distance, grid) {
  if (!text || !pattern || !grid)
    return {
      startIndex: 0,
      alignment: [],
    };

  const bottomRowIndex = grid.length - 1;
  const bottomRow = grid[bottomRowIndex];
  for (
    startColumnIndex = bottomRow.length - 1;
    startColumnIndex >= 0;
    startColumnIndex--
  ) {
    if (bottomRow[startColumnIndex] === distance) break;
  }

  if (startColumnIndex === 0)
    throw Error(
      `Invalid distance provided to trace back algorithm: ${distance}. The grid bottom row does not contain an entry having that value.`
    );

  const alignment = [];
  let r = bottomRowIndex,
    c = startColumnIndex;

  while (r > 0 && c > 0) {
    const curCellDist = grid[r][c];

    const aboveLeftDistance = grid[r - 1][c - 1];
    const p = pattern[r - 1];
    const t = text[c - 1];
    const exactMatch = p === t;

    if (!t) {
      // Handle text being shorter than pattern.
      --c;
    } else if (exactMatch) {
      r--;
      c--;
      alignment.push({ type: "match", value: t });
    } else if (aboveLeftDistance < curCellDist) {
      r--;
      c--;
      alignment.push({ type: "substitution", from: p, to: t });
    } else if (grid[r - 1][c] === curCellDist - 1) {
      alignment.push({ type: "insertion", value: t });
      c--;
    } else if (grid[r][c - 1]) {
      alignment.push({ type: "deletion", value: p });
      r--;
    } else {
      throw Error("Malformed grid");
    }
  }

  // We reached the left edge which means there may still be deletions to process.
  while (r > 0) {
    const p = pattern[r - 1];
    alignment.push({ type: "deletion", value: p });
    r--;
  }

  // We reached the top edge which means there may still be insertions.
  while (c > 0) {
    const t = text[c - 1];
    alignment.push({ type: "insertion", value: t });
    c--;
  }

  return { startIndex: c, alignment: alignment.reverse() };
}

module.exports = {
  editDistanceForClosestMatch,
  editDistanceBacktrack,
};

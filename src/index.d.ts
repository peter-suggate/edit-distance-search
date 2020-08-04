export type EditDistanceGrid<T> = T[][];

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
 * @param {string | number[]} text The text to search within.
 * @param {string | number[]} pattern The text to approximate-search for.
 * @param optional memoization of the grid that holds state created for the
 * edit distance algorithm. Can be used to perform next steps, for example,
 * a trace back algorithm.
 *
 * @returns {number} the minimum edit distance for any approximate (or exact in which
 * case this will be 0) match.
 */
export function editDistanceForClosestMatch<T>(
  textIn: ArrayLike<T>,
  pattern: ArrayLike<T>,
  infoOut: { grid: EditDistanceGrid<T> | undefined }
): number;

export type EditDistanceAlignment<T> =
  | { type: "match" }
  | { type: "substitution"; from: T; to: T }
  | { type: "insertion"; value: T }
  | { type: "deletion"; value: T };

export type BacktrackResult<T> = {
  startIndex: number;
  alignment: EditDistanceAlignment<T>;
};

/**
 * Given a text string, a pattern string, an edit distance and the grid that was used to
 * generate edit distance, find the list of deletions, insertions and substitutions that
 * transform pattern to text.
 *
 * This is a linear time algorithm which simply traces back through the grid.
 *
 * @param {string or []} text The text that was searched within.
 * @param {string or []} pattern The text that was approximate-searched for.
 * @param {number} distance The distance returned from editDistanceForClosestMatch
 * @param {number[][]} grid The edit distance grid obtained from editDistanceForClosestMatch
 */
export function editDistanceBacktrack<T>(
  text: ArrayLike<T>,
  pattern: ArrayLike<T>,
  distance: number,
  grid: EditDistanceGrid<T>
): BacktrackResult<T>;

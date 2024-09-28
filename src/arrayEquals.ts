/**
 * Compares two arrays and returns true if they are equal.
 *
 * @param a The first array to compare.
 * @param b The second array to compare.
 * @returns True if the arrays are equal, false otherwise.
 * @example
 * ```ts
 * arrayEquals([1, 2, 3], [1, 2, 3]) // true
 * arrayEquals([1, 2, 3], [1, 2, 4]) // false
 * ```
 */
export function arrayEquals<T>(a: T[], b: T[]): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }

  return true;
}

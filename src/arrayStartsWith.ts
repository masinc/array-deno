/**
 * Check if an array starts with another array
 *
 * @param source The array to search.
 * @param search The array to search for.
 * @param position The position to start searching. Default is 0.
 * @returns True if the array starts with the search array, false otherwise.
 * @example
 * ```ts
 * arrayStartsWith([1, 2, 3], [1, 2]) // true
 * arrayStartsWith([1, 2, 3], [2, 3]) // false
 * arrayStartsWith([1, 2, 3], [2, 3], 1) // true
 * ```
 */
export function arrayStartsWith<T>(
  source: T[],
  search: T[],
  position?: number
): boolean {
  if (position !== undefined && position < 0) {
    return false;
  }

  position = position || 0;

  if (source.length - position < search.length) {
    return false;
  }

  for (let i = 0; i < search.length; i++) {
    if (source[position + i] !== search[i]) {
      return false;
    }
  }

  return true;
}

/**
 * @module
 *
 * This module provides functions for working with arrays.
 *
 * @example
 * ```ts
 * import { arrayEquals, arrayStartsWith, range } from "jsr:@masinc/array";
 *
 * arrayEquals([1, 2, 3], [1, 2, 3]); // true
 * arrayStartsWith([1, 2, 3], [1, 2]); // true
 * range(5); // [0, 1, 2, 3, 4]
 * ```
 */

export { range } from "./src/range.ts";
export type { RangeError, RangeResult, RangeOptions } from "./src/range.ts";

export { arrayEquals } from "./src/arrayEquals.ts";
export { arrayStartsWith } from "./src/arrayStartsWith.ts";

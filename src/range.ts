import { type Result, ok, err } from "npm:neverthrow";

/**
 * RangeError represents an error that can occur when calling the range function.
 */
export type RangeError =
  | {
      type: "InvalidArguments";
    }
  | {
      type: "InvalidRange";
      message: string;
    };

export type RangeResult = Result<number[], RangeError>;

interface RangeOptions {
  step?: number;
  inclusive?: boolean;
}

/**
 * range generates a range of numbers.
 * @param count The number of elements in the range.
 * @returns A range of numbers from 0 to count - 1.
 * @example
 * ```ts
 * range(5) // [0, 1, 2, 3, 4]
 * ```
 */
export function range(count: number): RangeResult;

/**
 * range generates a range of numbers.
 * @param count The number of elements in the range.
 * @param options The options for the range.
 * @returns A range of numbers from 0 to count - 1.
 * @example
 * ```ts
 * range(5, { step: 2 }) // [0, 2, 4]
 * range(5, { inclusive: true }) // [0, 1, 2, 3, 4, 5]
 * ```
 */
export function range(count: number, options: RangeOptions): RangeResult;

/**
 * range generates a range of numbers.
 * @param start The start of the range.
 * @param end The end of the range.
 * @returns A range of numbers from start to end - 1.
 * @example
 * ```ts
 * range(0, 5) // [0, 1, 2, 3, 4]
 * ```
 */
export function range(start: number, end: number): RangeResult;

/**
 * range generates a range of numbers.
 * @param start The start of the range.
 * @param end The end of the range.
 * @param options The options for the range.
 * @returns A range of numbers from start to end - 1.
 * @example
 * ```ts
 * range(0, 5, { step: 2 }) // [0, 2, 4]
 * ragge(0, 5, { inclusive: true }) // [0, 1, 2, 3, 4, 5]
 * ```
 */
export function range(
  start: number,
  end: number,
  options: RangeOptions
): RangeResult;
export function range(
  ...args:
    | [number]
    | [number, RangeOptions]
    | [number, number]
    | [number, number, RangeOptions]
): RangeResult {
  // ex: range(5)
  if (args.length === 1) {
    const [count] = args;
    return rangeCore(0, count);
  }

  // ex: range(5, { step: 2 })
  if (args.length === 2 && typeof args[1] === "object") {
    const [count, options] = args;
    return rangeCore(0, count, options);
  }

  // ex: range(0, 5)
  if (args.length === 2 && typeof args[1] === "number") {
    const [start, end] = args;
    return rangeCore(start, end);
  }

  // ex: range(0, 5, { step: 2 })
  if (args.length === 3) {
    const [start, end, options] = args;
    return rangeCore(start, end, options);
  }

  return err({
    type: "InvalidArguments",
  });
}

function rangeCore(
  start: number,
  end: number,
  options?: RangeOptions
): RangeResult {
  const { step = 1, inclusive = false } = options || {};

  if (step === 0) {
    return err({
      type: "InvalidRange",
      message: "Step must be a non-zero number",
    });
  }

  if (start > end && step > 0) {
    return err({
      type: "InvalidRange",
      message: "Step must be negative when start is greater than end",
    });
  }

  if (start < end && step < 0) {
    return err({
      type: "InvalidRange",
      message: "Step must be positive when start is less than end",
    });
  }

  const endCondition = function (index: number): boolean {
    const isPositiveStep = step > 0;

    if (inclusive) {
      if (isPositiveStep) {
        return index <= end;
      } else {
        return index >= end;
      }
    }

    if (isPositiveStep) {
      return index < end;
    } else {
      return index > end;
    }
  };

  const result = [];
  for (let i = start; endCondition(i); i += step) {
    result.push(i);
  }
  return ok(result);
}

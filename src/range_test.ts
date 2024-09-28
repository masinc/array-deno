import { assertEquals } from "@std/assert";
import { range, type RangeResult } from "./range.ts";
import { ok } from "npm:neverthrow";
import { assert } from "@std/assert";

function assertRangeError(
  actual: RangeResult,
  expected: "InvalidArguments" | "InvalidRange"
) {
  assert(
    actual
      .mapErr((err) => {
        assertEquals(err.type, expected);
      })
      .isErr()
  );
}

Deno.test(function rangeTest() {
  assertRangeError(range(-1), "InvalidRange");
  assertEquals(range(0), ok([]));
  assertEquals(range(1), ok([0]));
  assertEquals(range(5), ok([0, 1, 2, 3, 4]));

  assertEquals(range(1, { step: 2 }), ok([0]));
  assertEquals(range(4, { step: 2 }), ok([0, 2]));
  assertEquals(range(5, { step: 2 }), ok([0, 2, 4]));
  assertEquals(range(6, { step: 2 }), ok([0, 2, 4]));

  assertEquals(range(1, { inclusive: true }), ok([0, 1]));
  assertEquals(range(5, { inclusive: true }), ok([0, 1, 2, 3, 4, 5]));

  assertEquals(range(1, { step: 2, inclusive: true }), ok([0]));
  assertEquals(range(4, { step: 2, inclusive: true }), ok([0, 2, 4]));
  assertEquals(range(5, { step: 2, inclusive: true }), ok([0, 2, 4]));
  assertEquals(range(6, { step: 2, inclusive: true }), ok([0, 2, 4, 6]));

  assertRangeError(range(5, 4), "InvalidRange");
  assertEquals(range(5, 5), ok([]));
  assertEquals(range(5, 6), ok([5]));
  assertEquals(range(5, 10), ok([5, 6, 7, 8, 9]));

  assertEquals(range(5, 6, { step: 2 }), ok([5]));
  assertEquals(range(5, 9, { step: 2 }), ok([5, 7]));
  assertEquals(range(5, 10, { step: 2 }), ok([5, 7, 9]));
  assertEquals(range(5, 11, { step: 2 }), ok([5, 7, 9]));

  assertEquals(range(5, 6, { inclusive: true }), ok([5, 6]));
  assertEquals(range(5, 10, { inclusive: true }), ok([5, 6, 7, 8, 9, 10]));

  assertEquals(range(5, 6, { step: 2, inclusive: true }), ok([5]));
  assertEquals(range(5, 10, { step: 2, inclusive: true }), ok([5, 7, 9]));
  assertEquals(range(5, 11, { step: 2, inclusive: true }), ok([5, 7, 9, 11]));
  assertEquals(range(5, 12, { step: 2, inclusive: true }), ok([5, 7, 9, 11]));

  // negative step

  assertEquals(range(5, -1, { step: -1 }), ok([5, 4, 3, 2, 1, 0]));
  assertEquals(range(5, 0, { step: -1 }), ok([5, 4, 3, 2, 1]));
  assertEquals(range(5, 1, { step: -1 }), ok([5, 4, 3, 2]));
  assertEquals(range(5, 5, { step: -1 }), ok([]));
  assertRangeError(range(5, 6, { step: -1 }), "InvalidRange");

  assertEquals(range(5, -1, { step: -2 }), ok([5, 3, 1]));
  assertEquals(range(5, 0, { step: -2 }), ok([5, 3, 1]));
  assertEquals(range(5, 1, { step: -2 }), ok([5, 3]));
  assertEquals(range(5, 5, { step: -2 }), ok([]));

  assertEquals(range(5, -1, { step: -2, inclusive: true }), ok([5, 3, 1, -1]));
  assertEquals(range(5, 0, { step: -2, inclusive: true }), ok([5, 3, 1]));
  assertEquals(range(5, 1, { step: -2, inclusive: true }), ok([5, 3, 1]));
});

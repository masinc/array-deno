import { assertEquals } from "@std/assert";
import { arrayStartsWith } from "./arrayStartsWith.ts";

Deno.test("arrayStartWiths", () => {
  assertEquals(arrayStartsWith([], []), true);
  assertEquals(arrayStartsWith([1], [1]), true);
  assertEquals(arrayStartsWith([1, 2, 3], [1, 2, 3]), true);
  assertEquals(arrayStartsWith([1, 2, 3], [1, 2, 4]), false);
  assertEquals(arrayStartsWith([1, 2, 3], [1, 2]), true);
  assertEquals(arrayStartsWith([1, 2], [1, 2, 3]), false);

  assertEquals(arrayStartsWith([1, 2, 3], [1, 2, 3], 0), true);
  assertEquals(arrayStartsWith([1, 2, 3], [1, 2, 3], 1), false);
  assertEquals(arrayStartsWith([1, 2, 3], [1, 2, 3], 2), false);

  assertEquals(arrayStartsWith([1, 2, 3], [1, 2], 0), true);
  assertEquals(arrayStartsWith([1, 2, 3], [1, 2], 1), false);

  assertEquals(arrayStartsWith([1, 2, 3], [2, 3], 0), false);
  assertEquals(arrayStartsWith([1, 2, 3], [2, 3], 1), true);
  assertEquals(arrayStartsWith([1, 2, 3], [2, 3], 2), false);

  assertEquals(arrayStartsWith([1, 2, 3], [3], 0), false);
  assertEquals(arrayStartsWith([1, 2, 3], [3], 1), false);
  assertEquals(arrayStartsWith([1, 2, 3], [3], 2), true);
});

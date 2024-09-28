import { assertEquals } from "@std/assert";
import { arrayEquals } from "./arrayEquals.ts";

Deno.test("arrayEquals", () => {
  assertEquals(arrayEquals([], []), true);
  assertEquals(arrayEquals([1], [1]), true);
  assertEquals(arrayEquals([1, 2, 3], [1, 2, 3]), true);
  assertEquals(arrayEquals([1, 2, 3], [1, 2, 4]), false);
  assertEquals(arrayEquals([1, 2, 3], [1, 2]), false);
  assertEquals(arrayEquals([1, 2], [1, 2, 3]), false);
});

import { assert, assertThrows } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { safe } from "./safe.ts";

describe("safe function", () => {
    it("should catch errors", () => {
        assertThrows(() => {
            safe(() => {
                throw new Error("test");
            });
        });
    });

    it("should return the result of the function", () => {
        assert(safe(() => "test") === "test");
    });
});

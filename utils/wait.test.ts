import { assertEquals } from "@std/assert";
import { wait } from "./wait.ts";

Deno.test("wait", async function (): Promise<void> {
    const duration = 500;
    const start = performance.now();
    await wait(duration);
    const end = performance.now();
    const diff = end - start;
    assertEquals(Math.round(diff / duration), 1);
});

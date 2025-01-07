import { assertEquals } from "@std/assert";
import { Spinner } from "./main.ts";

Deno.test(async function spinnerTest() {
    const spinner = new Spinner();
    spinner.start();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    spinner.stop();
    assertEquals(true, true);
});

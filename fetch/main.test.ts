// deno run test --allow-net fetch/main_test.ts
import { assertEquals } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { fetchWithCallbacks } from "./main.ts";

describe("fetchWithCallbacks function", () => {
    it("should handle successful fetch", async () => {
        const correct = {
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false,
        };

        const result = await fetchWithCallbacks<{
            userId: number;
            id: number;
            title: string;
            completed: boolean;
        }>("https://jsonplaceholder.typicode.com/todos/1", {
            onSuccess: (_response, json) => {
                return json;
            },
        });

        assertEquals(result, correct);
    });

    it("should handle fetch error", async () => {
        const correct = { message: "Not Found" };

        // Mock fetch to return a 404 error
        globalThis.fetch = (_input: string | URL | Request) => {
            return Promise.resolve(
                new Response(JSON.stringify({ message: "Not Found" }), {
                    status: 404,
                    statusText: "Not Found",
                })
            );
        };

        const result = await fetchWithCallbacks<never, { message: 404 }>(
            "https://jsonplaceholder.typicode.com/todos/1",
            {
                onError: (_response, json) => {
                    return json;
                },
            }
        );

        assertEquals(result, correct);
    });
});

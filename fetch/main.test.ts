// deno run test --allow-net fetch/main_test.ts
import { assertEquals, assertRejects } from "@std/assert";
import { describe, it } from "@std/testing/bdd";
import { mockFetch } from "../test_helpers/utils.ts";
import { fetchWithCallbacks } from "./main.ts";

type APIFetchData = {
    success: {
        message: "Success";
    };
    error: {
        message: "Not Found";
    };
};

describe("fetchWithCallbacks function", () => {
    /**
     *
     */

    it("[onSuccess] : should handle successful fetch", async () => {
        mockFetch({
            expected: "success",
            returnData: {
                message: "Success",
            },
        });
        const result = await fetchWithCallbacks<APIFetchData["success"]>("", {
            onSuccess: (_response, json) => {
                return json;
            },
        });

        assertEquals(result.response.status, 200);
        assertEquals(result.data, { message: "Success" });
    });

    /**
     *
     */

    it("[onError] : should handle fetch error 404", async () => {
        mockFetch({
            expected: "error",
            returnData: {
                message: "Not Found",
            },
        });
        // Mock fetch to return a 404 error

        const result = await fetchWithCallbacks<never, APIFetchData["error"]>("", {
            onError: (_response, json) => {
                return json;
            },
        });

        assertEquals(result.data, { message: "Not Found" });
        assertEquals(result.response.status, 404);
    });

    /**
     *
     */

    it("[before] : should handle throw error in before cb", () => {
        assertRejects(() => {
            return fetchWithCallbacks<never, never>("", {
                before: () => {
                    throw new Error("Error");
                },
            });
        });
    });

    /**
     *
     */
    it("[after] : should return the before cb return data", async () => {
        const result = await fetchWithCallbacks<{
            userId: number;
            id: number;
            title: string;
            completed: boolean;
        }>("", {
            before: () => "Hi from before",
            after: (beforeReturn) => beforeReturn,
        });

        assertEquals(result.afterData, "Hi from before");
    });
});

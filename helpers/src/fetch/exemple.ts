import { fetchWithCallbacks } from "./main.ts";

// Example Usage
type Post = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

type ErrorPost = {
    message: string;
};

/**
 * - Test data from:
 * https://jsonplaceholder.typicode.com/posts/1
 * - Test with latency:
 * https://dummyjson.com/todos/1?delay=3000
 */
fetchWithCallbacks<Post, ErrorPost, string>("https://dummyjson.com/todos/1?delay=3000", {
    /**
     * Handle error response.
     */
    onError: (res, data) => {
        console.error("Error:", res.status, data);
        return data;
    },
    /**
     * Handle successful response.
     */
    onSuccess: (_res, data) => {
        console.log("Success:", data);
        return data;
    },
    /**
     * Execute before request.
     */
    before: () => "Hello from before",
    /**
     * Execute after request.
     */
    after: (beforeReturn) => {
        console.log("After callback:", beforeReturn);
    },
});

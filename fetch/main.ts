import { safe } from "../utils/safe.ts";

type FetchCallbacks<JsonResponse, JsonError, BeforeReturnType> = {
    onError?: (res: Response, data: JsonError) => unknown;
    onSuccess?: (res: Response, data: JsonResponse) => unknown;
    before?: () => BeforeReturnType;
    after?: (args: BeforeReturnType) => void;
};

/**
 * Callbacks:
 * - onSuccess executed when response.ok
 * - onError executed when response.ok is false
 * - before return data === after parameter
 */
export const fetchWithCallbacks = <JR = unknown, JE = unknown, BR = unknown>(
    url: string,
    callbacks: FetchCallbacks<JR, JE, BR>
) => {
    return safe(async () => {
        const { onError, onSuccess, before, after } = callbacks;
        let beforeReturn: BR | undefined;
        let data;

        // Execute the `before` callback if provided.
        if (before) {
            beforeReturn = before();
        }

        // Perform the fetch operation and parse the JSON response.
        const { response, json } = await (async () => {
            const response = await fetch(url);
            return { response, json: (await response.json()) as JR | JE };
        })();

        // Handle success or error based on `response.ok`.
        if (response.ok) {
            data = onSuccess ? onSuccess(response, json as JR) : json;
        } else {
            data = onError ? onError(response, json as JE) : json;
        }

        // Execute the `after` callback if provided and if `before` was executed.
        if (after && beforeReturn !== undefined) {
            after(beforeReturn);
        }

        return data;
    });
};

import { safe } from "../utils/safe.ts";

type FetchCallbacks<JsonResponse, JsonError, BeforeReturnType, AfterReturnType> = {
    onError?: (res: Response, data: JsonError) => unknown;
    onSuccess?: (res: Response, data: JsonResponse) => unknown;
    before?: () => BeforeReturnType;
    after?: (args?: BeforeReturnType) => AfterReturnType;
};

/**
 * @info Callbacks:
 * - onSuccess executed when response.ok
 * - onError executed when response.ok is false
 * - before return data === after parameter
 */
export const fetchWithCallbacks = <
    JsonResponse = unknown,
    JsonError = unknown,
    BeforeReturnType = unknown,
    AfterReturnType = unknown
>(
    url: string,
    callbacks: FetchCallbacks<JsonResponse, JsonError, BeforeReturnType, AfterReturnType>
) => {
    return safe(async () => {
        const { onError, onSuccess, before, after } = callbacks;
        let data: JsonResponse | JsonError;

        // Execute the `before` callback if provided.
        const beforePayload = before ? (before() as BeforeReturnType) : undefined;

        // Perform the fetch operation and parse the JSON response.
        const { response, json } = await (async () => {
            const response = await fetch(url);
            return { response, json: (await response.json()) as JsonResponse | JsonError };
        })();

        // Handle success or error based on `response.ok`.
        if (response.ok) {
            data = onSuccess ? (onSuccess(response, json as JsonResponse) as JsonResponse) : (json as JsonResponse);
        } else {
            data = onError ? (onError(response, json as JsonError) as JsonError) : (json as JsonError);
        }

        // Execute the `after` callback if provided and if `before` was executed.
        let afterData: AfterReturnType | undefined = undefined;
        if (after) {
            afterData = after(beforePayload);
        }

        return { response, data, afterData };
    });
};

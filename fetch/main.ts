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

        let afterData: AfterReturnType | undefined = undefined;
        if (after) afterData = after(beforePayload);

        if (response.ok) {
            data = onSuccess ? (onSuccess(response, json as JsonResponse) as JsonResponse) : (json as JsonResponse);
            return { response, data, afterData } as {
                response: Response;
                data: JsonResponse;
                afterData: AfterReturnType;
            };
        }
        data = onError ? (onError(response, json as JsonError) as JsonError) : (json as JsonError);
        return { response, data, afterData } as { response: Response; data: JsonError; afterData: AfterReturnType };
    });
};

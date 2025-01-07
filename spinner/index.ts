import chalk from "chalk";
import { wait } from "./utils.ts";

type HttpServiceObjectCallbacksProps<T, P, K, J> = {
    onError?: () => Promise<T>;
    onSuccess?: (data: P) => Promise<P>;
    beforeLoad?: () => Promise<K>;
    afterLoad?: () => Promise<J>;
};

//

type Result = {
    data?: any;
    error?: any;
};

const fetchWithCallbacks = async <T, P, K, J>(
    url: string,
    { onError, onSuccess, beforeLoad, afterLoad }: HttpServiceObjectCallbacksProps<T, P, K, J>
): Promise<Result> => {
    let loading = false;

    if (loading) {
        return { data: undefined, error: undefined };
    }

    loading = true;

    if (beforeLoad) {
        await beforeLoad();
    }

    try {
        const response = await fetch(url);
        const json = (await response.json()) as P;

        if (response.ok) {
            const result = onSuccess ? await onSuccess(json) : json;
            return { data: result, error: undefined };
        } else {
            const errorResult = onError ? await onError() : undefined;
            return { data: undefined, error: errorResult };
        }
    } catch (err) {
        const errorResult = onError ? await onError() : undefined;
        return { data: undefined, error: errorResult };
    } finally {
        loading = false;
        if (afterLoad) {
            await afterLoad();
        }
    }
};

class Spinner {
    interval: ReturnType<typeof setInterval> | undefined;

    constructor(
        private asciispinner = ["▖", "▘", "▝", "▗"],
        private spinnerColor = chalk.blue,
        private spinnerText = "Loading",
        private intervalTime = 100
    ) {
        if (this.interval) {
            clearInterval(this.interval);
        }
        const i = 0;
        this.padlog(`  ${this.spinnerText}`);
        this.interval = setInterval(() => {
            this.padlog(this.spinnerColor(this.asciispinner[this.moduloIdx(i)]));
        }, this.intervalTime);
    }

    moduloIdx = (i: number) => i++ % this.asciispinner.length;

    stop = () => clearInterval(this.interval);

    padlog = (str: string) => Deno.stdout.writeSync(new TextEncoder().encode(`\r${str}`));
}

const onError = async () => {
    console.log("Error occurred");
    wait(1000);
    return "An error occurred";
};

const onSuccess = async (data: any) => {
    console.log("Data fetched successfully");
    return data;
};

// Example Usage
const { data, error } = await fetchWithCallbacks("https://dummyjson.com/todos/1?delay=3000", {
    onError: async () => {
        console.log("Error occurred");
        return "An error occurred";
    },
    onSuccess: async (data) => {
        console.log("Data fetched successfully");
        return data;
    },
});

console.log(data, error);

export {};

//const safe = <T, G, H>({
//     _try,
//     _catch,
//     _finally,
// }: {
//     _try: () => T;
//     _catch: () => G;
//     _finally: () => H;
// }): T | G | H | void => {
//     try {
//         return _try();
//     } catch (err) {
//         return _catch();
//     } finally {
//         _finally();
//     }
// };

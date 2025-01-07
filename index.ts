import chalk from "chalk";

type HttpServiceObjectCallbacksProps<T, P, K, J> = {
    onError?: () => Promise<T>;
    onSuccess?: (data: P) => Promise<P>;
    beforeLoad?: () => Promise<K>;
    afterLoad?: () => Promise<J>;
};

class HttpService {
    static loading: boolean = false;

    static async get<T, P, K, J>(
        url: string,
        { onError, onSuccess, beforeLoad, afterLoad }: HttpServiceObjectCallbacksProps<T, P, K, J>
    ): Promise<{ data?: P; error?: T }> {
        if (this.loading) {
            return { data: undefined, error: undefined };
        }

        this.loading = true;

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
            this.loading = false;
            if (afterLoad) {
                await afterLoad();
            }
        }
    }
}

const asciispinner = ["▖", "▘", "▝", "▗"];
let interval: NodeJS.Timeout;
// Example Usage
const { data, error } = await HttpService.get("https://dummyjson.com/todos/1?delay=3000", {
    onError: async () => {
        console.log("Error occurred");
        return "An error occurred";
    },
    onSuccess: async (data) => {
        console.log("Data fetched successfully");
        return data;
    },
    beforeLoad: async () => {
        let i = 0;
        process.stdout.write("  Loading");
        process.stdout.cursorTo(0);
        interval = setInterval(() => {
            process.stdout.write(chalk.blue(asciispinner[i++ % asciispinner.length]));
            process.stdout.cursorTo(0);
        }, 100);
    },
    afterLoad: async () => {
        clearInterval(interval);
    },
});

console.log(data, error);

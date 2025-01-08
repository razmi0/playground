export function safe<T>(fn: () => T): T {
    try {
        return fn();
    } catch (e) {
        throw e;
    }
}

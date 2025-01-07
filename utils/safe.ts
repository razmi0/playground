export function safe<T>(fn: () => T) {
    try {
        return fn();
    } catch (e) {
        throw e;
    }
}

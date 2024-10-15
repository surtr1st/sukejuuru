export function useResult<T>(value: T | undefined) {
    if (!value) throw new Error('Result: value undefined');
    return value;
}

export {};

declare global {
    interface Array<T> {
        empty(): boolean;
    }
}

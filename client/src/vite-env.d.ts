/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<{}, {}, any>;
    export default component;
}

declare type Getter<T> = () => T;
declare type Setter<T> = (value: T) => void;

interface String {
    is(value: string): boolean;
}
String.prototype.is = (value: string): boolean => this === value;

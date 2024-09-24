import type { Component } from 'vue';

type Callback<T> = () => T;

export type TNode = {
    id: number;
    title: string;
    createdAt: Date;
};

export type TTask = {
    id: number;
    title: string;
    description: string;
    minLength: string;
    maxLength: string;
    startDate: string;
    dueDate: string;
    priority: Partial<TPriority>;
    criterias: TCriteria[];
    status: Partial<TStatus>;
    color: Pick<TColor, 'display'>;
};

export type TCriteria = {
    id: number;
    description: string;
};

export type TPriority = {
    id: number;
    display: string;
    description: string;
    createdAt: string;
};

export type TStatus = {
    id: number;
    display: string;
    description: string;
    createdAt: string;
};

export type TColor = {
    id: number;
    display: string;
    createdAt: string;
};

export type TSize = 'sm' | 'md' | 'lg';

export type TColorVariant =
    | 'primary'
    | 'secondary'
    | 'light'
    | 'neutral'
    | 'neutral-2'
    | 'dark'
    | 'danger'
    | 'warning'
    | 'success';

export type TTrackHistoryItem = {
    taskTag: { color: TColorVariant; display: string };
    description: string;
    duration: string;
    localTime: string;
};

export type TThemePreferences = 'light' | 'dark' | 'system';

export type TListItem = {
    label: string;
    icon: Component;
    action?: Callback<void>;
    route?: string;
};

export type TSidebarItems<T extends readonly string[]> = {
    readonly [K in T[number]]: TListItem[];
};

export type TTableItem = {
    id: number;
    title: string;
    description: string;
    color: string;
};

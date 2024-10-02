import type { Component } from 'vue';

type Callback<T> = () => T;

export type TNode = {
    id: number;
    title: string;
    createdAt: Date;
};

export type TPenalty = {
    id: number;
    title: string;
    description: string;
    compensation: string;
    nodeId: number;
};

export type TTask = {
    id: number;
    title: string;
    description: string;
    minLength: string;
    maxLength: string;
    startDate: string;
    dueDate: string;
    criterias: TCriteria[];
    color: string;
    status: Partial<TStatus>;
    priority: Partial<TPriority>;
};

export type TTaskPayload = Omit<TTask, 'id' | 'priority' | 'status'> & {
    priorityId: number;
    statusId: number;
};

export type TTagTask = {
    id: number;
    title: string;
    color: string;
};

export type TCriteria = {
    id: number;
    description: string;
    taskId: number;
};

export type TPriority = {
    id: number;
    display: string;
    description: string;
    createdAt: string | null;
    color: string;
};

export type TStatus = TPriority;

export type TColor = {
    id: number;
    display: string;
    hex: string;
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
    | 'success'
    | 'semi-danger'
    | 'quarter-danger'
    | 'info';

export type TTrackHistoryItem = {
    id: number;
    taskTag: { color: string; title: string };
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
    display: string;
    description: string;
    color: string;
    createdAt: Date;
};

export type TDuration = {
    id: number;
    timeOnTask: number;
    madeOnDate: Date;
    description: string;
    taskId: number;
};

export type TAppState = {
    priorities: TPriority[];
    status: TStatus[];
    tagTasks: TTagTask[];
    trackLogs: TDuration[];
    colors: TColor[];
};

export type TItems = {
    id: number | string;
    display: string;
    description: string;
    createdAt: string | null;
    color: string;
};

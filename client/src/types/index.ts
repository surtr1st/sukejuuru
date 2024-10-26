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
    minLength: number;
    maxLength: number;
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
    timeOnTask: number;
    startFrom: string;
    endAt: string;
};

export type TTrackHistory = {
    madeOnDate: string;
    items: TTrackHistoryItem[];
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
    createdAt: string | null;
};

export type TDuration = {
    id: number;
    timeOnTask: number;
    madeOnDate: Date;
    startFrom: Date;
    endAt: Date;
    description: string;
    taskId: number;
};

export type TAppState = {
    priorities: TPriority[];
    status: TStatus[];
    tagTasks: TTagTask[];
    trackLogs: TTrackHistory[];
    colors: TColor[];
};

export type TItems = {
    id: number | string;
    display: string;
    description: string;
    createdAt: string | null;
    color: string;
};

export type TTracker = {
    madeOnDate: Date;
    durationId: number;
};

export type TBoolStateKey =
    | 'node'
    | 'priority'
    | 'status'
    | 'color'
    | 'tag-task'
    | 'task'
    | 'tracker';

declare type Nullable<T> = T | null;

declare type TNode = {
    id: number;
    title: Nullable<string>;
    createdAt: Nullable<Date>;
};

declare type TPenalty = {
    id: number;
    title: Nullable<string>;
    description: Nullable<string>;
    compensation: Nullable<string>;
    createdAt: Nullable<Date>;
    nodeId: Nullable<number>;
};

declare type TTaskPayload = {
    id: number;
    title: Nullable<string>;
    description: Nullable<string>;
    minLength: Nullable<number>;
    maxLength: Nullable<number>;
    createdAt: Nullable<Date>;
    startDate: Nullable<string>;
    dueDate: Nullable<string>;
    color: Nullable<string>;
    nodeId: Nullable<number>;
    priorityId: Nullable<number>;
    statusId: Nullable<number>;
};

declare type TTask = Omit<TTaskPayload, 'startDate' | 'dueDate'> & {
    startDate: Nullable<Date>;
    dueDate: Nullable<Date>;
};

declare type TTaskRelations = Omit<TTask, 'priorityId' | 'statusId'> & {
    priority: Nullable<Pick<TPriority, 'display' | 'description' | 'color'>>;
    status: Nullable<Pick<TStatus, 'display' | 'description' | 'color'>>;
};

declare type TServiceName =
    | 'node'
    | 'penalty'
    | 'task'
    | 'priority'
    | 'status'
    | 'duration'
    | 'criteria';

declare type TOmits<T, K extends keyof T> = Array<Omit<T, K>>;

declare type TPriority = {
    id: number;
    display: Nullable<string>;
    description: Nullable<string>;
    createdAt: Nullable<Date>;
    color: Nullable<string>;
};

declare type TStatus = TPriority;

declare type TDuration = {
    id: number;
    timeOnTask: Nullable<bigint>;
    madeOnDate: Nullable<Date>;
    description: Nullable<string>;
    taskId: Nullable<number>;
};

declare type TCriteria = {
    id: number;
    description: Nullable<string>;
    createdAt: Nullable<Date>;
    taskId: Nullable<number>;
};

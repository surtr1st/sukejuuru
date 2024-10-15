declare type Nullable<T> = T | null;

declare type TNodePayload = Omit<TNode, 'id' | 'createdAt'>;

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

declare type TTask = {
    id: number;
    title: Nullable<string>;
    description: Nullable<string>;
    minLength: Nullable<number>;
    maxLength: Nullable<number>;
    createdAt: Nullable<Date>;
    startDate: Nullable<Date>;
    dueDate: Nullable<Date>;
    color: Nullable<string>;
    nodeId: Nullable<number>;
    priorityId: Nullable<number>;
    statusId: Nullable<number>;
};

declare type TTaskPayload = Omit<TTaskPayload, 'startDate' | 'dueDate'> & {
    startDate: Nullable<string>;
    dueDate: Nullable<string>;
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
    | 'criteria'
    | 'tracker';

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
    timeOnTask: Nullable<number>;
    startFrom: Nullable<Date>;
    endAt: Nullable<Date>;
    description: Nullable<string>;
    taskId: Nullable<number>;
};

declare type TDurationPayload = Omit<TDuration, 'startFrom' | 'endAt'> & {
    startFrom: Nullable<string>;
    endAt: Nullable<string>;
};

declare type TDurationFromNode = Omit<TDuration, 'taskId'> & {
    taskTag: {
        id: Nullable<number>;
        title: Nullable<string>;
        color: Nullable<string>;
    };
};

declare type TCriteria = {
    id: number;
    description: Nullable<string>;
    createdAt: Nullable<Date>;
    taskId: Nullable<number>;
};

declare type TTracker = {
    madeOnDate: Nullable<Date>;
    durationId: Nullable<number>;
};

declare type TTrackerFromRaw = Omit<TTracker, 'madeOnDate'> & {
    madeOn: Nullable<Date>;
};

declare type TTrackerPayload = Omit<TTracker, 'madeOnDate'> & { madeOnDate: string };

declare type TTrackHistory = {
    madeOnDate: string;
    items: TDurationFromNode[];
};

declare type TColor = {
    id: number;
    display: Nullable<string>;
    hex: Nullable<string>;
    createdAt: Nullable<Date>;
};

declare type TColorPayload = Omit<TColor, 'id'>;

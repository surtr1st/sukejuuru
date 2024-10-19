declare global {
    interface Array<T> {
        empty(): boolean;
    }

    interface String {
        toTitleCase(): string;
    }

    type Nullable<T> = T | null;

    type TNodePayload = Omit<TNode, 'id' | 'createdAt'>;

    type TNode = {
        id: number;
        title: Nullable<string>;
        createdAt: Nullable<Date>;
    };

    type TPenalty = {
        id: number;
        title: Nullable<string>;
        description: Nullable<string>;
        compensation: Nullable<string>;
        createdAt: Nullable<Date>;
        nodeId: Nullable<number>;
    };

    type TTask = {
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

    type TTaskPayload = Omit<TTask, 'startDate' | 'dueDate'> & {
        startDate: Nullable<string>;
        dueDate: Nullable<string>;
    };

    type TTaskRelations = Omit<TTask, 'priorityId' | 'statusId'> & {
        priority: Nullable<Pick<TPriority, 'display' | 'description' | 'color'>>;
        status: Nullable<Pick<TStatus, 'display' | 'description' | 'color'>>;
    };

    type TServiceName =
        | 'node'
        | 'penalty'
        | 'task'
        | 'priority'
        | 'status'
        | 'duration'
        | 'criteria'
        | 'tracker';

    type TOmits<T, K extends keyof T> = Array<Omit<T, K>>;

    type TPriority = {
        id: number;
        display: Nullable<string>;
        description: Nullable<string>;
        createdAt: Nullable<Date>;
        color: Nullable<string>;
    };

    type TStatus = TPriority;

    type TDuration = {
        id: number;
        timeOnTask: Nullable<number>;
        startFrom: Nullable<Date>;
        endAt: Nullable<Date>;
        description: Nullable<string>;
        taskId: Nullable<number>;
    };

    type TDurationPayload = Omit<TDuration, 'startFrom' | 'endAt'> & {
        startFrom: Nullable<string>;
        endAt: Nullable<string>;
    };

    type TDurationFromNode = Omit<TDuration, 'taskId'> & {
        taskTag: {
            id: Nullable<number>;
            title: Nullable<string>;
            color: Nullable<string>;
        };
    };

    type TCriteria = {
        id: number;
        description: Nullable<string>;
        createdAt: Nullable<Date>;
        taskId: Nullable<number>;
    };

    type TTracker = {
        madeOnDate: Nullable<Date>;
        durationId: Nullable<number>;
    };

    type TTrackerFromRaw = Omit<TTracker, 'madeOnDate'> & {
        madeOn: Nullable<Date>;
    };

    type TTrackerPayload = Omit<TTracker, 'madeOnDate'> & { madeOnDate: string };

    type TTrackHistory = {
        madeOnDate: string;
        items: TDurationFromNode[];
    };

    type TColor = {
        id: number;
        display: Nullable<string>;
        hex: Nullable<string>;
        createdAt: Nullable<Date>;
    };

    type TColorPayload = Omit<TColor, 'id'>;
}

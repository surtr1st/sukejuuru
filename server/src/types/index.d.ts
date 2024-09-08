declare type TNode = {
    id: number;
    title: string;
    createdAt: Date;
};

declare type TPenalty = {
    id: number;
    title: string;
    description: string;
    compensation: string;
    createdAt: Date;
    nodeId: number;
};

declare type TTask = {
    id: number;
    title: string;
    description: string;
    minLength: BigInt;
    maxLength: BigInt;
    createdAt: Date;
    startDate: Date;
    dueDate: Date;
    color: string;
};

declare type TServiceName = 'node' | 'penalty' | 'task' | 'priority';

declare type TOmits<T, K extends keyof T> = Array<Omit<T, K>>;

declare type TPriority = {
    id: number;
    display: string;
    description: string;
    createdAt: Date;
    color: string;
    taskId: number;
};

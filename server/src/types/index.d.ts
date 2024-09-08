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

declare type TServiceName = 'node' | 'penalty' | 'task';

declare type TOmits<T, K extends keyof T> = Array<Omit<T, K>>;

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

declare type TOmits<T, K extends keyof T> = Array<Omit<T, K>>;

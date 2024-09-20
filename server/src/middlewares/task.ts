import { createModule, useErrorHandler } from '@bunarcane/arcane';

const { handlePayload, handleQuery } = useErrorHandler();

export const TaskMiddlewares = createModule()
    .mod('validatePayload', (requestBody: Omit<TTask, 'id'>) =>
        handlePayload({
            requestBody,
            requiredKeys: ['title'],
        }),
    )
    .mod('validateQueries', (requestQueries: { nodeId: number }) =>
        handleQuery({
            requestQueries,
            requiredKeys: ['nodeId'],
        }),
    )
    .compose();

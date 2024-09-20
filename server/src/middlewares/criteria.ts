import { createModule, useErrorHandler } from '@bunarcane/arcane';

const { handlePayload, handleQuery } = useErrorHandler();

export const CriteriaMiddlewares = createModule()
    .mod('validatePayload', (requestBody: Omit<TCriteria, 'id'>) =>
        handlePayload({
            requestBody,
            requiredKeys: ['description'],
        }),
    )
    .mod('validateQueries', (requestQueries: { taskId: number }) =>
        handleQuery({
            requestQueries,
            requiredKeys: ['taskId'],
        }),
    )
    .compose();

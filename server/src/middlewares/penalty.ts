import { createModule, useErrorHandler } from '@bunarcane/arcane';

const { handlePayload, handleQuery } = useErrorHandler();
export const PenaltyMiddlewares = createModule()
    .mod('validatePayload', (requestBody: Omit<TPenalty, 'id'>) =>
        handlePayload({
            requestBody,
            requiredKeys: ['title', 'compensation'],
        }),
    )
    .mod('validateQueries', (requestQueries: { nodeId: number }) =>
        handleQuery({
            requestQueries,
            requiredKeys: ['nodeId'],
        }),
    )
    .compose();

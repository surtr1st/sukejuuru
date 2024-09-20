import { createModule, useErrorHandler } from '@bunarcane/arcane';

export const NodeMiddlewares = createModule()
    .mod('validatePayload', (requestBody: Omit<TNode, 'id'>) => {
        useErrorHandler().handlePayload({
            requestBody,
            requiredKeys: ['title'],
        });
    })
    .compose();

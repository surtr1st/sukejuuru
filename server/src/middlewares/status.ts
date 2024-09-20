import { createModule, useErrorHandler } from '@bunarcane/arcane';

export const StatusMiddlewares = createModule()
    .mod('validatePayload', (requestBody: Omit<TStatus, 'id'>) => {
        useErrorHandler().handlePayload({
            requestBody,
            requiredKeys: ['display', 'description', 'color'],
        });
    })
    .compose();

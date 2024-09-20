import { createModule, useErrorHandler } from '@bunarcane/arcane';

export const PriorityMiddlewares = createModule()
    .mod('validatePayload', (requestBody: Omit<TPriority, 'id'>) => {
        useErrorHandler().handlePayload({
            requestBody,
            requiredKeys: ['display', 'description', 'color'],
        });
    })
    .compose();

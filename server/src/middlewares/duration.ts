import { createModule, useErrorHandler } from '@bunarcane/arcane';

export const DurationMiddlewares = createModule()
    .mod('validatePayload', (requestBody: Omit<TDuration, 'id'>) => {
        useErrorHandler().handlePayload({
            requestBody,
            requiredKeys: ['timeOnTask', 'madeOnDate', 'taskId'],
        });
    })
    .compose();

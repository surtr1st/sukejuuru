import { DurationRoute } from '@/enums';
import { body, createMiddleware, useErrorHandler } from '@bunarcane/arcane';

export const DurationMiddlewares = createMiddleware(DurationRoute.CREATE)
    .intercept(async () =>
        useErrorHandler().handlePayload({
            requestBody: await body<Omit<TDurationPayload, 'id'>>(),
            requiredKeys: ['timeOnTask', 'madeOnDate', 'taskId', 'description'],
        }),
    )
    .compose();

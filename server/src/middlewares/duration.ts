import { ErrorHandlers } from '@/handlers';
import { durationModels } from '@/models';
import Elysia from 'elysia';

export const DurationMiddlewares = new Elysia({ name: 'duration.middlewares' })
    .use(durationModels)
    .use(ErrorHandlers)
    .guard({ as: 'local', body: 'duration.dto' })
    .derive({ as: 'scoped' }, ({ validateBodyProps, body }) => ({
        validatePayload: () =>
            validateBodyProps({
                requestBody: body as Omit<TDuration, 'id'>,
                requiredKeys: ['timeOnTask', 'madeOnDate', 'description', 'taskId'],
            }),
    }));

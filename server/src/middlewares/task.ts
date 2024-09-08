import { ErrorHandlers } from '@/handlers';
import { taskModels } from '@/models';
import Elysia from 'elysia';

export const TaskMiddlewares = new Elysia({ name: 'task.middlewares' })
    .use(taskModels)
    .use(ErrorHandlers)
    .guard({ as: 'local', body: 'task.dto' })
    .derive(
        { as: 'scoped' },
        ({ validateBodyProps, validateQueries, isIntParams, body, query }) => ({
            validatePayload: () =>
                validateBodyProps({
                    requestBody: body as Omit<TTask, 'id'>,
                    requiredKeys: ['title'],
                }),
            validateTaskQueries: () =>
                validateQueries({ requestQueries: query, requiredKeys: ['nodeId'] }),
            validateParams: () => isIntParams(),
        }),
    );

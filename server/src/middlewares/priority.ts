import { ErrorHandlers } from '@/handlers';
import { priorityModels } from '@/models';
import Elysia from 'elysia';

export const PriorityMiddlewares = new Elysia({ name: 'priority.middlewares' })
    .use(priorityModels)
    .use(ErrorHandlers)
    .guard({ as: 'scoped', body: 'priority.dto' })
    .derive({ as: 'scoped' }, ({ body, validateBodyProps, isIntParams }) => ({
        validatePayload: () =>
            validateBodyProps({
                requestBody: body as Omit<TPriority, 'id'>,
                requiredKeys: ['display', 'color'],
            }),
        validateParams: () => isIntParams(),
    }));

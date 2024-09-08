import { ErrorHandlers } from '@/handlers';
import { statusModels } from '@/models';
import Elysia from 'elysia';

export const StatusMiddlewares = new Elysia({ name: 'status.middlewares' })
    .use(statusModels)
    .use(ErrorHandlers)
    .guard({ as: 'local', body: 'status.dto' })
    .derive({ as: 'scoped' }, ({ body, validateBodyProps, isIntParams }) => ({
        validatePayload: () =>
            validateBodyProps({
                requestBody: body as Omit<TStatus, 'id'>,
                requiredKeys: ['display', 'color'],
            }),
        validateParams: () => isIntParams(),
    }));

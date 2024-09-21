import { PriorityRoute } from '@/enums';
import { NotFoundError } from '@/errors';
import { body, createMiddleware, params, useErrorHandler } from '@bunarcane/arcane';

export const PriorityMiddlewares = createMiddleware(PriorityRoute.CREATE)
    .intercept(async () =>
        useErrorHandler().handlePayload({
            requestBody: await body<Omit<TPriority, 'id'>>(),
            requiredKeys: ['display', 'description', 'color'],
        }),
    )
    .compose();

export const PriorityParamMiddlewares = createMiddleware(PriorityRoute.UPDATE)
    .intercept(() => {
        const [id] = params<number[]>();
        if (!id) throw new NotFoundError('`id` is required!');
        if (isNaN(id)) throw new NotFoundError('`id` must be number!');
    })
    .compose();

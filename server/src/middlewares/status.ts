import { StatusRoute } from '@/enums';
import { NotFoundError } from '@/errors';
import { body, createMiddleware, params, useErrorHandler } from '@bunarcane/arcane';

export const StatusMiddlewares = createMiddleware(StatusRoute.CREATE)
    .intercept(async () =>
        useErrorHandler().handlePayload({
            requestBody: await body<Omit<TStatus, 'id'>>(),
            requiredKeys: ['display', 'description', 'color'],
        }),
    )
    .compose();

export const StatusParamMiddlewares = createMiddleware(StatusRoute.UPDATE)
    .intercept(() => {
        const [id] = params<number[]>();
        if (!id) throw new NotFoundError('`id` is required!');
        if (isNaN(id)) throw new NotFoundError('`id` must be number!');
    })
    .compose();

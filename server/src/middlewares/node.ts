import { NodeRoute } from '@/enums';
import { NotFoundError } from '@/errors';
import { body, createMiddleware, params, useErrorHandler } from '@bunarcane/arcane';

export const NodeMiddlewares = createMiddleware(NodeRoute.CREATE)
    .intercept(async () =>
        useErrorHandler().handlePayload({
            requestBody: await body<Omit<TNode, 'id'>>(),
            requiredKeys: ['title'],
        }),
    )
    .compose();

export const NodeParamMiddlewares = createMiddleware(NodeRoute.UPDATE)
    .intercept(() => {
        const [id] = params<number[]>();
        if (!id) throw new NotFoundError('`id` is required!');
        if (isNaN(id)) throw new NotFoundError('`id` must be number!');
    })
    .compose();

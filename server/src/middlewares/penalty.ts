import { PenaltyRoute } from '@/enums';
import { NotFoundError } from '@/errors';
import { body, createMiddleware, params, query, useErrorHandler } from '@bunarcane/arcane';

const { handlePayload, handleQuery } = useErrorHandler();

export const PenaltyMiddlewares = createMiddleware(PenaltyRoute.CREATE)
    .intercept(async () =>
        handlePayload({
            requestBody: await body<Omit<TPenalty, 'id'>>(),
            requiredKeys: ['title', 'compensation'],
        }),
    )
    .intercept(() =>
        handleQuery({
            requestQueries: query<{ nodeId: number }>(),
            requiredKeys: ['nodeId'],
        }),
    )
    .compose();

export const PenaltyParamMiddlewares = createMiddleware(PenaltyRoute.UPDATE)
    .intercept(() => {
        const [id] = params<number[]>();
        if (!id) throw new NotFoundError('`id` is required!');
        if (isNaN(id)) throw new NotFoundError('`id` must be number!');
    })
    .compose();

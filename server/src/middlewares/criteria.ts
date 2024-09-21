import { body, createMiddleware, params, query, useErrorHandler } from '@bunarcane/arcane';
import { NotFoundError } from '@/errors';
import { CriteriaRoute } from '@/enums';

const { handlePayload, handleQuery } = useErrorHandler();

export const CriteriaMiddlewares = createMiddleware(CriteriaRoute.CREATE)
    .intercept(async () =>
        handlePayload({
            requestBody: await body<Omit<TCriteria, 'id'>>(),
            requiredKeys: ['description'],
        }),
    )
    .intercept(() =>
        handleQuery({
            requestQueries: query<{ taskId: number }>(),
            requiredKeys: ['taskId'],
        }),
    )
    .compose();

export const CriteriaParamMiddlewares = createMiddleware(CriteriaRoute.UPDATE)
    .intercept(() => {
        const [id] = params<number[]>();
        if (!id) throw new NotFoundError('`id` is required!');
        if (isNaN(id)) throw new NotFoundError('`id` must be number!');
    })
    .compose();

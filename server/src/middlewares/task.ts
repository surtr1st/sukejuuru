import { TaskRoute } from '@/enums';
import { NotFoundError } from '@/errors';
import { body, createMiddleware, params, query, useErrorHandler } from '@bunarcane/arcane';

const { handlePayload, handleQuery } = useErrorHandler();

export const TaskMiddlewares = createMiddleware(TaskRoute.CREATE)
    .intercept(async () =>
        handlePayload({
            requestBody: await body<Omit<TTask, 'id'>>(),
            requiredKeys: ['title'],
        }),
    )
    .compose();

export const TaskParamMiddlewares = createMiddleware(TaskRoute.UPDATE)
    .intercept(() => {
        const [id] = params<number[]>();
        if (!id) throw new NotFoundError('`id` is required!');
        if (isNaN(id)) throw new NotFoundError('`id` must be number!');
    })
    .compose();

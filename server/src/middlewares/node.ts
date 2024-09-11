import { ErrorHandlers } from '@/handlers';
import { nodeModels } from '@/models';
import Elysia from 'elysia';

export const NodeMiddlewares = new Elysia({ name: 'node.middlewares' })
    .use(nodeModels)
    .use(ErrorHandlers)
    .derive({ as: 'scoped' }, ({ body, validateBodyProps, isIntParams }) => ({
        validatePayload: () =>
            validateBodyProps({ requestBody: body as Omit<TNode, 'id'>, requiredKeys: ['title'] }),
        validateParams: () => isIntParams(),
    }));

import { NodeError } from '@/enums';
import { ValidateError } from '@/errors';
import { nodeModels } from '@/models';
import Elysia from 'elysia';

export const NodeMiddlewares = new Elysia({ name: 'node.middlewares' })
    .use(nodeModels)
    .derive({ as: 'scoped' }, ({ body, set, params }) => ({
        validatePayload: () => {
            const { title } = body;
            if (!title) {
                set.status = 406;
                throw new ValidateError(NodeError.INPUT_PAYLOAD('title'));
            }
        },
        validateParams: () => {
            const { id } = params;
            if (isNaN(id)) {
                set.status = 406;
                throw new ValidateError(NodeError.NOT_A_NUMBER('id'));
            }
        },
    }));

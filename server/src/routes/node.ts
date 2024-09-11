import { NodeController } from '@/controllers';
import { NodeRoute } from '@/enums';
import { NodeMiddlewares } from '@/middlewares';
import Elysia from 'elysia';

export const NodeRouter = new Elysia({ name: 'node.router' })
    .use(NodeController)
    .use(NodeMiddlewares)
    .onError(({ error }) => new Response(error.message))
    .get(NodeRoute.RETRIEVE, ({ retrieveNodes }) => retrieveNodes())
    .get(NodeRoute.FIND_BY_ID, ({ findNodeById }) => findNodeById(), {
        beforeHandle: ({ validateParams }) => validateParams(),
    })
    .post(NodeRoute.CREATE, ({ createNode }) => createNode(), {
        beforeHandle: ({ validatePayload }) => validatePayload(),
    })
    .put(NodeRoute.UPDATE, ({ updateNode }) => updateNode(), {
        beforeHandle: [
            ({ validateParams }) => validateParams(),
            ({ validatePayload }) => validatePayload(),
        ],
    })
    .delete(NodeRoute.DELETE, ({ deleteNode }) => deleteNode(), {
        beforeHandle: ({ validateParams }) => validateParams(),
    });

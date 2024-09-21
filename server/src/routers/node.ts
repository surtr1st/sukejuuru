import { NodeController } from '@/controllers';
import { NodeRoute } from '@/enums';
import { NodeMiddlewares, NodeParamMiddlewares } from '@/middlewares';
import { createRouter } from '@bunarcane/arcane';

export const NodeRouter = createRouter()
    .use(NodeParamMiddlewares)
    .use(NodeMiddlewares)
    .get(NodeRoute.RETRIEVE, NodeController.retrieveNode)
    .post(NodeRoute.CREATE, NodeController.createNode)
    .put(NodeRoute.UPDATE, NodeController.updateNode)
    .delete(NodeRoute.DELETE, NodeController.deleteNode)
    .compose();

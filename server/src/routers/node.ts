import { NodeController } from '@/controllers';
import { NodeRoute } from '@/enums';
import { NodeMiddlewares, NodeParamMiddlewares } from '@/middlewares';
import { createRouter } from '@bunarcane/arcane';

export const NodeRouter = createRouter()
    .use(NodeParamMiddlewares)
    .use(NodeMiddlewares)
    .get(NodeRoute.RETRIEVE, NodeController.retrieveNode)
    .get(NodeRoute.FIND_BY_ID, NodeController.findNodeById)
    .post(NodeRoute.CREATE, NodeController.createNode)
    .compose();

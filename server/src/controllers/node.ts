import Elysia from 'elysia';
import { NodeService } from '@/services';
import { nodeModels } from '@/models';

export const NodeController = new Elysia({ name: 'node.controller' })
    .use(NodeService)
    .use(nodeModels)
    .guard({ as: 'local', body: 'node.dto' })
    .derive({ as: 'scoped' }, ({ nodeService, body, params }) => ({
        retrieveNodes: async () => await nodeService().nodes(),
        createNode: async () =>
            await nodeService().create({ title: body.title, createdAt: new Date() }),
        updateNode: async () => await nodeService().update(params.id, body),
        deleteNode: async () => await nodeService().remove(params.id),
        findNodeById: async () => await nodeService().findById(params.id),
    }));

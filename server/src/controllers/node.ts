import Elysia from 'elysia';
import { NodeService } from '@/services';
import { nodeModels } from '@/models';
import { NodeRoute } from '@/routes';

export const NodeController = new Elysia({ name: 'node.controller' })
    .use(NodeService)
    .use(nodeModels)
    .get(NodeRoute.RETRIEVE, async ({ nodeService }) => await nodeService().nodes())
    .post(
        NodeRoute.CREATE,
        async ({ nodeService, body }) => {
            const { title } = body;
            if (!title) return;
            return await nodeService().create({ title, createdAt: new Date() });
        },
        { body: 'node.dto' },
    )
    .put(NodeRoute.UPDATE, () => {})
    .delete(NodeRoute.DELETE, () => {});

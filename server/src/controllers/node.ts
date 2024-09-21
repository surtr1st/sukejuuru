import { NodeService } from '@/services';
import { createBridge, created, ok, response, params } from '@bunarcane/arcane';

const service = new NodeService();

export const NodeController = createBridge()
    .impl('retrieveNode', async () => await response(await service.list()))
    .impl('createNode', async (req) => {
        const payload = await req.json<TNode>();
        const result = await service.create(payload);
        return created(result);
    })
    .impl('updateNode', async (req) => {
        const payload = await req.json<TNode>();
        const result = await service.update(payload);
        return ok(result);
    })
    .impl('deleteNode', async () => {
        const [id] = params<number[]>();
        const result = await service.remove(id);
        return ok(result);
    })
    .compose();

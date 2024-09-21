import { PenaltyService } from '@/services';
import { body, createBridge, created, ok, params, query, response } from '@bunarcane/arcane';

const service = new PenaltyService();

export const PenaltyController = createBridge()
    .impl('retrievePenaltiesByNode', async () => {
        const q = query<{ nodeId: number }>();
        const penalties = await service.findByNode(q.nodeId);
        return response(penalties);
    })
    .impl('createPenalty', async () => {
        const payload = await body<TPenalty>();
        const result = await service.create(payload);
        return created(result);
    })
    .impl('updatePenalty', async () => {
        const [id] = params<number[]>();
        const payload = await body<TPenalty>();
        const result = await service.update(id, payload);
        return ok(result);
    })
    .impl('deletePenalty', async () => {
        const [id] = params<number[]>();
        const result = await service.remove(id);
        return ok(result);
    })
    .compose();

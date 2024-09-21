import { CriteriaService } from '@/services';
import { body, createBridge, created, ok, params, query, response } from '@bunarcane/arcane';

const service = new CriteriaService();

export const CriteriaController = createBridge()
    .impl('retrieveCriteriasByTask', async () => {
        const q = query<{ taskId: number }>();
        const criterias = await service.findAllByTask(q.taskId);
        return response(criterias);
    })
    .impl('createCriteria', async () => {
        const payload = await body<TCriteria>();
        const result = await service.create(payload);
        return created(result);
    })
    .impl('updateCriteria', async () => {
        const [id] = params<number[]>();
        const payload = await body<TCriteria>();
        const result = await service.update(id, payload);
        return ok(result);
    })
    .impl('deleteCriteria', async () => {
        const [id] = params<number[]>();
        const result = await service.remove(id);
        return ok(result);
    })
    .compose();

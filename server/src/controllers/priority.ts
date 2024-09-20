import { BaseMiddlewares, PriorityMiddlewares } from '@/middlewares';
import { PriorityService } from '@/services';
import { body, createBridge, created, ok, params, response } from '@bunarcane/arcane';

const service = new PriorityService();

export const PriorityController = createBridge()
    .impl('retrievePriorities', async () => {
        const priorities = await service.list();
        return response(priorities);
    })
    .impl('createPriority', async () => {
        const payload = await body<TPriority>();
        PriorityMiddlewares.validatePayload(payload);
        const result = await service.create(payload);
        return created(result);
    })
    .impl('updatePriority', async () => {
        const [id] = params<number[]>();
        BaseMiddlewares.validateParamId(id);
        const payload = await body<TPriority>();
        PriorityMiddlewares.validatePayload(payload);
        const result = await service.update(id, payload);
        return ok(result);
    })
    .impl('deletePriority', async () => {
        const [id] = params<number[]>();
        BaseMiddlewares.validateParamId(id);
        const result = await service.remove(id);
        return ok(result);
    })
    .compose();

import { BaseMiddlewares, StatusMiddlewares } from '@/middlewares';
import { StatusService } from '@/services';
import { body, createBridge, created, ok, params, response } from '@bunarcane/arcane';

const service = new StatusService();

export const StatusController = createBridge()
    .impl('retrieveStatus', async () => {
        const status = await service.list();
        return response(status);
    })
    .impl('createStatus', async () => {
        const payload = await body<TStatus>();
        StatusMiddlewares.validatePayload(payload);
        const result = await service.create(payload);
        return created(result);
    })
    .impl('updateStatus', async () => {
        const [id] = params<number[]>();
        BaseMiddlewares.validateParamId(id);
        const payload = await body<TStatus>();
        StatusMiddlewares.validatePayload(payload);
        const result = await service.update(id, payload);
        return ok(result);
    })
    .impl('deleteStatus', async () => {
        const [id] = params<number[]>();
        BaseMiddlewares.validateParamId(id);
        const result = await service.remove(id);
        return ok(result);
    })
    .compose();

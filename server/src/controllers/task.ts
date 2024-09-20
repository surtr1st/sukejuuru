import { BaseMiddlewares, TaskMiddlewares } from '@/middlewares';
import { TaskService } from '@/services';
import { body, createBridge, created, ok, params, query, response } from '@bunarcane/arcane';

const service = new TaskService();

export const TaskController = createBridge()
    .impl('retrieveTasksByNode', async () => {
        const q = query<{ nodeId: number }>();
        TaskMiddlewares.validateQueries(q);
        BaseMiddlewares.validateParamId(q.nodeId);
        const tasks = await service.findTaskByNode(q.nodeId);
        return response(tasks);
    })
    .impl('createTask', async () => {
        const payload = await body<TTask>();
        TaskMiddlewares.validatePayload(payload);
        const result = await service.create(payload);
        return created(result);
    })
    .impl('updateTask', async () => {
        const [id] = params<number[]>();
        BaseMiddlewares.validateParamId(id);
        const payload = await body<TTask>();
        TaskMiddlewares.validatePayload(payload);
        const result = await service.update(id, payload);
        return ok(result);
    })
    .impl('deleteTask', async () => {
        const [id] = params<number[]>();
        BaseMiddlewares.validateParamId(id);
        const result = await service.remove(id);
        return ok(result);
    })
    .compose();

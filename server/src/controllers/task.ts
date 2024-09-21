import { TaskService } from '@/services';
import { body, createBridge, created, ok, params, query, response } from '@bunarcane/arcane';

const service = new TaskService();

export const TaskController = createBridge()
    .impl('retrieveTasksByNode', async () => {
        const q = query<{ nodeId: number }>();
        const tasks = await service.findTaskByNode(q.nodeId);
        return response(tasks);
    })
    .impl('createTask', async () => {
        const payload = await body<TTask>();
        const result = await service.create(payload);
        return created(result);
    })
    .impl('updateTask', async () => {
        const [id] = params<number[]>();
        const payload = await body<TTask>();
        const result = await service.update(id, payload);
        return ok(result);
    })
    .impl('deleteTask', async () => {
        const [id] = params<number[]>();
        const result = await service.remove(id);
        return ok(result);
    })
    .compose();

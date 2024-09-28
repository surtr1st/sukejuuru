import { NodeService, TaskService } from '@/services';
import { body, createBridge, created, ok, params, query, response } from '@bunarcane/arcane';

const service = new TaskService();
const nodeService = new NodeService();

export const TaskController = createBridge()
    .impl('retrieveTasksByNode', async () => {
        try {
            const q = query<{ nodeId: number }>();
            await nodeService.findById(q.nodeId);
            const tasks = await service.findTaskByNode(q.nodeId);
            return response(tasks);
        } catch (e) {
            if (e instanceof Object) return response(e as Object, 500);
            return response(e as string, 500);
        }
    })
    .impl('createTask', async () => {
        try {
            const payload = await body<TTaskPayload>();
            const result = await service.create({
                ...payload,
                startDate: new Date(`${payload.startDate}`),
                dueDate: new Date(`${payload.dueDate}`),
                createdAt: new Date(),
            });
            return created(result);
        } catch (e) {
            return response(e as Object, 500);
        }
    })
    .impl('updateTask', async () => {
        try {
            const [id] = params<number[]>();
            const payload = await body<TTask>();
            const result = await service.update(id, payload);
            return ok(result);
        } catch (e) {
            return response(e as Object, 500);
        }
    })
    .impl('deleteTask', async () => {
        try {
            const [id] = params<number[]>();
            const result = await service.remove(id);
            return ok(result);
        } catch (e) {
            return response(e as Object, 500);
        }
    })
    .compose();

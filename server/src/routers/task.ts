import { TaskRoute } from '@/enums';
import { taskValidator } from '@/middlewares';
import { useTask } from '@/services';
import { Hono } from 'hono';

const task = new Hono();
const service = useTask();

task.get(TaskRoute.RETRIEVE_BY_NODE, taskValidator.query, async (c) => {
    const { nodeId } = c.req.valid('query');
    const result = await service.findTaskByNode(nodeId);
    return c.json(result);
});

task.post(TaskRoute.CREATE, taskValidator.payload, async (c) => {
    const { data } = c.req.valid('json');
    const result = await service.create(data);
    return c.text(result, 201);
});

task.put(TaskRoute.UPDATE, taskValidator.params, taskValidator.payload, async (c) => {
    const { id } = c.req.valid('param');
    const { data } = c.req.valid('json');
    const result = await service.update(id, data);
    return c.text(result);
});

export { task };

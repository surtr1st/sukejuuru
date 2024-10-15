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
    const { payload } = c.req.valid('json');
    const result = await service.create(payload);
    return c.json(result, 201);
});

export { task };

import { TaskRoute } from '@/enums';
import { taskValidator } from '@/middlewares';
import { useTask } from '@/services';
import { Hono } from 'hono';

const task = new Hono();
const service = useTask();

task.get(TaskRoute.RETRIEVE_BY_NODE, taskValidator.query, async (c) => {
    try {
        const { nodeId } = c.req.valid('query');
        const result = await service.findTaskByNode(nodeId);
        return c.json(result);
    } catch (e) {
        return c.text(e as string, 500);
    }
});

task.post(TaskRoute.CREATE, taskValidator.payload, async (c) => {
    try {
        const { payload } = c.req.valid('json');
        const result = await service.create(payload);
        return c.json(result, 201);
    } catch (e) {
        return c.text(e as string, 500);
    }
});

export { task };

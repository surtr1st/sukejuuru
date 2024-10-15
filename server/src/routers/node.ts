import { NodeRoute } from '@/enums';
import { nodeValidator } from '@/middlewares';
import { useNode } from '@/services';
import { Hono } from 'hono';

const node = new Hono();
const service = useNode();

node.get(NodeRoute.RETRIEVE, async (c) => {
    const res = await service.list();
    return c.json(res);
});

node.post(NodeRoute.CREATE, nodeValidator.payload, async (c) => {
    const { title } = c.req.valid('json');
    const result = await service.create({ title, createdAt: new Date() });
    return c.text(result, 201);
});

export { node };

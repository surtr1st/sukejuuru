import { NotFoundError } from '@/errors';
import { validator } from 'hono/validator';

const query = validator('query', (value, c) => {
    const nodeId = value['nodeId'];
    if (!nodeId) return c.text('Missing required query `nodeId`!', 404);
    return {
        nodeId: parseInt(nodeId as string),
    };
});

const payload = validator('json', (value: TTaskPayload, c) => {
    if (!value.title) throw new NotFoundError('missing `title`');

    const payload: TTask = {
        ...value,
        startDate: new Date(`${value.startDate}`),
        dueDate: new Date(`${value.dueDate}`),
        createdAt: new Date(),
    };
    return {
        payload,
    };
});

export const taskValidator = {
    query,
    payload,
};

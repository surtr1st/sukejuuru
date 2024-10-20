import { NotFoundError } from '@/errors';
import { validator } from 'hono/validator';

const params = validator('param', (_, c) => {
    const id = c.req.param('id');
    if (!id) throw new NotFoundError('Missing required param `id`!');
    return {
        id: parseInt(id),
    };
});

const query = validator('query', (value, _) => {
    const nodeId = value['nodeId'];
    if (!nodeId) throw new NotFoundError('Missing required query `nodeId`!');
    return {
        nodeId: parseInt(nodeId as string),
    };
});

const payload = validator('json', (value: TTaskPayload, _) => {
    if (!value.title) throw new NotFoundError('missing `title`');

    const data: TTask = {
        ...value,
        startDate: new Date(`${value.startDate}`),
        dueDate: new Date(`${value.dueDate}`),
        createdAt: new Date(),
    };
    return {
        data,
    };
});

export const taskValidator = {
    params,
    query,
    payload,
};

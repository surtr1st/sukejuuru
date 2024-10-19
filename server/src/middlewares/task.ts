import { NotFoundError } from '@/errors';
import { validator } from 'hono/validator';

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
    query,
    payload,
};

import { NotFoundError } from '@/errors';
import { validator } from 'hono/validator';

const query = validator('query', (value, _) => {
    const nodeId = value['nodeId'];
    if (!nodeId) throw new NotFoundError('Missing required query `nodeId`!');
    return {
        nodeId: parseInt(nodeId as string),
    };
});

const payload = validator('json', (value: TDurationPayload, _) => {
    if (!value.timeOnTask) throw new NotFoundError('missing `timeOnTask`');
    if (!value.startFrom) throw new NotFoundError('missing `startFrom`');
    if (!value.endAt) throw new NotFoundError('missing `endAt`');
    if (!value.taskId) throw new NotFoundError('missing `taskId`');

    const data: TDuration = {
        ...value,
        startFrom: new Date(`${value.startFrom}`),
        endAt: new Date(`${value.endAt}`),
    };
    return {
        data,
    };
});

export const durationValidator = {
    query,
    payload,
};

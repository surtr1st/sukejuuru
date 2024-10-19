import { NotFoundError } from '@/errors';
import { validator } from 'hono/validator';

const query = validator('query', (value, c) => {
    const nodeId = value['nodeId'];
    if (!nodeId) throw new NotFoundError('Missing required query `nodeId`!');
    return {
        nodeId: parseInt(nodeId as string),
    };
});

const payload = validator('json', (value: TTrackerPayload, _) => {
    if (!value.durationId) throw new NotFoundError('missing `durationId`');
    if (!value.madeOnDate) throw new NotFoundError('missing `madeOnDate`');

    const data: TTracker = {
        ...value,
        madeOnDate: new Date(`${value.madeOnDate}`),
    };
    return {
        data,
    };
});

export const trackerValidator = {
    query,
    payload,
};

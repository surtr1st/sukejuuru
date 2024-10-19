import { PayloadError } from '@/enums';
import { NotFoundError } from '@/errors';
import { validator } from 'hono/validator';

const params = validator('param', (_, c) => {
    const id = c.req.param('id');
    if (!id) throw new NotFoundError('cannot find the `id` of node');
    return {
        id: parseInt(id),
    };
});

const payload = validator('json', (value: TNodePayload, _) => {
    if (!value.title) throw new NotFoundError(PayloadError.INVALID('title'));
    return value;
});

export const nodeValidator = {
    params,
    payload,
};

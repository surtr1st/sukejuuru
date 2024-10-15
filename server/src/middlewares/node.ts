import { PayloadError } from '@/enums';
import { NotFoundError } from '@/errors';
import { validator } from 'hono/validator';

const payload = validator('json', (value: TNodePayload, _) => {
    if (!value.title) throw new NotFoundError(PayloadError.INVALID('title'));
    return value;
});

export const nodeValidator = {
    payload,
};

import { PayloadError } from '@/enums';
import { validator } from 'hono/validator';

const payload = validator('json', (value: TNodePayload, c) => {
    if (!value.title) return c.text(PayloadError.INVALID('title'), 404);
    return value;
});

export const nodeValidator = {
    payload,
};

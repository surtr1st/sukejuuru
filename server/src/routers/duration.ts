import { DurationRoute } from '@/enums';
import { durationValidator } from '@/middlewares';
import { useDuration } from '@/services';
import { Hono } from 'hono';

const duration = new Hono();
const service = useDuration();

duration.post(DurationRoute.CREATE, durationValidator.payload, async (c) => {
    const { data } = c.req.valid('json');
    const result = await service.create(data);
    return c.json(result, 201);
});

export { duration };

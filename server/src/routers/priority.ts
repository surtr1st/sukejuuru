import { PriorityRoute } from '@/enums';
import { usePriority } from '@/services';
import { Hono } from 'hono';

const priority = new Hono();
const service = usePriority();

priority.get(PriorityRoute.RETRIEVE, async (c) => c.json(await service.list()));

export { priority };

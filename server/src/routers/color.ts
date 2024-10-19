import { ColorRoute } from '@/enums';
import { useColor } from '@/services';
import { Hono } from 'hono';

const service = useColor();
const color = new Hono();

color.get(ColorRoute.RETRIEVE_COLORS, async (c) => c.json(await service.list()));

export { color };

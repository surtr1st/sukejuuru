import { TrackerRoute } from '@/enums';
import { trackerValidator } from '@/middlewares';
import { useDuration, useTracker } from '@/services';
import { Hono } from 'hono';

const tracker = new Hono();
const service = useTracker();
const durationService = useDuration();

tracker.get(TrackerRoute.RETRIEVE_BY_NODE, trackerValidator.query, async (c) => {
    const { nodeId } = c.req.valid('query');
    const durations = await durationService.logsFromNode(nodeId);
    const tracks = await service.list();

    const map = new Map<string, TDurationFromNode[]>();
    for (const track of tracks) {
        for (const duration of durations) {
            const key = `${track.madeOn}`;
            if (!map.has(key)) {
                map.set(key, []);
            }
            if (track.durationId === duration.id) {
                map.get(key)!.push(duration);
            }
        }
    }
    const result: TTrackHistory[] = [];
    map.forEach((items, madeOnDate) => result.push({ madeOnDate, items }));
    return c.json(result);
});

tracker.post(TrackerRoute.CREATE, trackerValidator.payload, async (c) => {
    const { data } = c.req.valid('json');
    const result = await service.create(data);
    return c.text(result, 201);
});

export { tracker };

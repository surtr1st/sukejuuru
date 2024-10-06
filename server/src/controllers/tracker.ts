import { DurationService, TrackerService } from '@/services';
import { body, createBridge, created, query, response } from '@bunarcane/arcane';

const service = new TrackerService();
const durationService = new DurationService();

export const TrackerController = createBridge()
    .impl('retrieveTrackLogsFromNode', async () => {
        try {
            const q = query<{ nodeId: number }>();
            const durations = await durationService.logsFromNode(q.nodeId);
            const tracks = await service.list();

            const map = new Map<string, TDurationFromNode[]>();
            for (const track of tracks) {
                for (const duration of durations) {
                    const key = track.madeOn!.toString();
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
            return response(result);
        } catch (e) {
            return response(e as string, 500);
        }
    })
    .impl('createHistory', async () => {
        try {
            const payload = await body<TTrackerPayload>();
            const result = await service.create({
                ...payload,
                madeOnDate: new Date(`${payload.madeOnDate}`),
            });
            return created(result);
        } catch (e) {
            return response(e as string, 500);
        }
    })
    .compose();

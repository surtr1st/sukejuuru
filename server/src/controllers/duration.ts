import { DurationService } from '@/services';
import { body, createBridge, created, query, response } from '@bunarcane/arcane';

const service = new DurationService();

export const DurationController = createBridge()
    .impl('retrieveLogsByNode', async () => {
        try {
            const q = query<{ nodeId: number }>();
            return response(await service.logsFromNode(q.nodeId));
        } catch (e) {
            return response(e as string, 500);
        }
    })
    .impl('createDuration', async () => {
        try {
            const payload = await body<TDurationPayload>();
            const result = await service.create({
                ...payload,
                madeOnDate: new Date(`${payload.madeOnDate}`),
                startFrom: new Date(`${payload.startFrom}`),
                endAt: new Date(`${payload.endAt}`),
            });
            return created(result);
        } catch (e) {
            return response(e as string, 500);
        }
    })
    .compose();

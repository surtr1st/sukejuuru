import { DurationService } from '@/services';
import { body, createBridge, created, query, response } from '@bunarcane/arcane';

const service = new DurationService();

export const DurationController = createBridge()
    .impl('retrieveDurations', async () => {
        const durations = await service.list();
        return response(durations);
    })
    .impl('createDuration', async () => {
        const payload = await body<TDuration>();
        const result = await service.create(payload);
        return created(result);
    })
    .impl('retrieveLogsFromNode', async () => {
        try {
            const q = query<{ nodeId: number }>();
            return response(await service.logsFromNode(q.nodeId));
        } catch (e) {
            return response(e as string, 500);
        }
    })
    .compose();

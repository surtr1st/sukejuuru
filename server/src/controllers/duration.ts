import { DurationService } from '@/services';
import { body, createBridge, created, response } from '@bunarcane/arcane';

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
    .compose();

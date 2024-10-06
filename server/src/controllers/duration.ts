import { DurationService } from '@/services';
import { body, createBridge, created, response } from '@bunarcane/arcane';

const service = new DurationService();

export const DurationController = createBridge()
    .impl('createDuration', async () => {
        try {
            const payload = await body<TDurationPayload>();
            const result = await service.create({
                ...payload,
                startFrom: new Date(`${payload.startFrom}`),
                endAt: new Date(`${payload.endAt}`),
            });
            return created(result);
        } catch (e) {
            return response(e as string, 500);
        }
    })
    .compose();

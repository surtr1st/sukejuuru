import { ColorService } from '@/services';
import { body, createBridge, created, response } from '@bunarcane/arcane';

const service = new ColorService();

export const ColorController = createBridge()
    .impl('retrieveColors', async () => {
        try {
            return response(await service.list(), 200);
        } catch (e) {
            return response(e as string, 500);
        }
    })
    .impl('createColor', async () => {
        try {
            const payload = await body<TColorPayload>();
            const result = await service.create({
                ...payload,
                createdAt: new Date(),
            });
            return created(result);
        } catch (e) {
            return response(e as string, 500);
        }
    })
    .compose();

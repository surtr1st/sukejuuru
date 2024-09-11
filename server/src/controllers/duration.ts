import { durationModels } from '@/models';
import { DurationService } from '@/services';
import Elysia from 'elysia';

export const DurationController = new Elysia({ name: 'duration.controller' })
    .use(DurationService)
    .use(durationModels)
    .guard({ as: 'local', body: 'duration.dto' })
    .derive({ as: 'scoped' }, ({ durationService, body }) => ({
        retrieveAll: async () => await durationService().findAll(),
        trackDuration: async () => await durationService().create(body),
    }));

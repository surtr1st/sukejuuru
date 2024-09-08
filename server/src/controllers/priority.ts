import { priorityModels } from '@/models';
import { PriorityService } from '@/services';
import Elysia from 'elysia';

export const PriorityController = new Elysia({ name: 'priority.controller' })
    .use(PriorityService)
    .use(priorityModels)
    .guard({ as: 'scoped', body: 'priority.dto' })
    .derive({ as: 'scoped' }, ({ body, params, priorityService }) => ({
        retrieveAll: async () => await priorityService().findAll(),
        createPriority: async () =>
            await priorityService().create({ ...body, createdAt: new Date() }),
        updatePriority: async () => await priorityService().update(params.id, body),
        deletePriority: async () => await priorityService().remove(params.id),
    }));

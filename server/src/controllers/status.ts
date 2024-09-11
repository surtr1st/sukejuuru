import { statusModels } from '@/models';
import { StatusService } from '@/services';
import Elysia from 'elysia';

export const StatusController = new Elysia({ name: 'status.controller' })
    .use(StatusService)
    .use(statusModels)
    .guard({ as: 'local', body: 'status.dto' })
    .derive({ as: 'scoped' }, ({ statusService, body, params }) => ({
        retrieveAll: async () => await statusService().findAll(),
        createStatus: async () => await statusService().create({ ...body, createdAt: new Date() }),
        updateStatus: async () => await statusService().update(params.id, body),
        deleteStatus: async () => await statusService().remove(params.id),
    }));

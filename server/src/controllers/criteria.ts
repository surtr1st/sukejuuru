import { criteriaModels } from '@/models';
import { CriteriaService } from '@/services';
import Elysia from 'elysia';

export const CriteriaController = new Elysia({ name: 'criteria.controller' })
    .use(CriteriaService)
    .use(criteriaModels)
    .guard({ as: 'local', body: 'criteria.dto' })
    .derive({ as: 'scoped' }, ({ criteriaService, body, params, query }) => ({
        retrieveAllByTask: async () => await criteriaService().findAllByTask(query.taskId),
        createCriteria: async () =>
            await criteriaService().create({ ...body, createdAt: new Date() }),
        updateCriteria: async () => await criteriaService().update(params.id, body),
        deleteCriteria: async () => await criteriaService().remove(params.id),
    }));

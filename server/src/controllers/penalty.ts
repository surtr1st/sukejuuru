import Elysia from 'elysia';
import { PenaltyService } from '@/services';
import { penaltyModels } from '@/models';

export const PenaltyController = new Elysia({ name: 'node.controller' })
    .use(PenaltyService)
    .use(penaltyModels)
    .guard({ as: 'local', body: 'penalty.dto' })
    .derive({ as: 'scoped' }, ({ penaltyService, body, params, query }) => ({
        retrievePenaltiesByNode: async () => await penaltyService().findByNode(query.nodeId),
        createPenalty: async () =>
            await penaltyService().create({
                title: body.title,
                description: body.description,
                compensation: body.compensation,
                createdAt: new Date(),
            }),
        updatePenalty: async () => await penaltyService().update(params.id, body),
        deletePenalty: async () => await penaltyService().remove(params.id),
    }));

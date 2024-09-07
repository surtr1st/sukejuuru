import { PenaltyController } from '@/controllers';
import { PenaltyRoute } from '@/enums';
import { PenaltyMiddlewares } from '@/middlewares';
import Elysia from 'elysia';

export const PenaltyRouter = new Elysia({ name: 'penalty.router' })
    .use(PenaltyController)
    .use(PenaltyMiddlewares)
    .onError(({ error }) => new Response(error.message))
    .get(PenaltyRoute.RETRIEVE_BY_NODE, ({ retrievePenaltiesByNode }) => retrievePenaltiesByNode())
    .post(PenaltyRoute.CREATE, ({ createPenalty }) => createPenalty(), {
        beforeHandle: ({ validatePayload }) => validatePayload(),
    })
    .put(PenaltyRoute.UPDATE, ({ updatePenalty }) => updatePenalty(), {
        beforeHandle: [
            ({ validateParams }) => validateParams(),
            ({ validatePayload }) => validatePayload(),
        ],
    })
    .delete(PenaltyRoute.DELETE, ({ deletePenalty }) => deletePenalty(), {
        beforeHandle: ({ validateParams }) => validateParams(),
    });

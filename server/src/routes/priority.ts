import { PriorityController } from '@/controllers';
import { PriorityRoute } from '@/enums';
import { PriorityMiddlewares } from '@/middlewares';
import Elysia from 'elysia';

export const PriorityRouter = new Elysia({ name: 'priority.router' })
    .use(PriorityController)
    .use(PriorityMiddlewares)
    .onError(({ error }) => new Response(error.message))
    .get(PriorityRoute.RETRIEVE, ({ retrieveAll }) => retrieveAll())
    .post(PriorityRoute.CREATE, ({ createPriority }) => createPriority(), {
        beforeHandle: ({ validatePayload }) => validatePayload(),
    })
    .put(PriorityRoute.UPDATE, ({ updatePriority }) => updatePriority(), {
        beforeHandle: ({ validateParams }) => validateParams(),
    })
    .delete(PriorityRoute.DELETE, ({ deletePriority }) => deletePriority(), {
        beforeHandle: ({ validateParams }) => validateParams(),
    });

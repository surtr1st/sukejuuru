import { StatusController } from '@/controllers';
import { StatusRoute } from '@/enums';
import { StatusMiddlewares } from '@/middlewares';
import Elysia from 'elysia';

export const StatusRouter = new Elysia({ name: 'status.router' })
    .use(StatusController)
    .use(StatusMiddlewares)
    .onError(({ error }) => new Response(error.message))
    .get(StatusRoute.RETRIEVE, ({ retrieveAll }) => retrieveAll())
    .post(StatusRoute.CREATE, ({ createStatus }) => createStatus(), {
        beforeHandle: ({ validatePayload }) => validatePayload(),
    })
    .put(StatusRoute.UPDATE, ({ updateStatus }) => updateStatus(), {
        beforeHandle: [
            ({ validateParams }) => validateParams(),
            ({ validatePayload }) => validatePayload(),
        ],
    })
    .delete(StatusRoute.DELETE, ({ deleteStatus }) => deleteStatus());

import { DurationController } from '@/controllers';
import { DurationRoute } from '@/enums';
import { DurationMiddlewares } from '@/middlewares';
import Elysia from 'elysia';

export const DurationRouter = new Elysia({ name: 'duration.router' })
    .use(DurationController)
    .use(DurationMiddlewares)
    .onError(({ error }) => new Response(error.message))
    .get(DurationRoute.RETRIEVE, ({ retrieveAll }) => retrieveAll())
    .post(DurationRoute.CREATE, ({ trackDuration }) => trackDuration(), {
        beforeHandle: ({ validatePayload }) => validatePayload(),
    });

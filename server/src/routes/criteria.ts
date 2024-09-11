import { CriteriaController } from '@/controllers';
import { CriteriaRoute } from '@/enums';
import { CriteriaMiddlewares } from '@/middlewares';
import Elysia from 'elysia';

export const CriteriaRouter = new Elysia({ name: 'criteria.router' })
    .use(CriteriaController)
    .use(CriteriaMiddlewares)
    .onError(({ error }) => new Response(error.message))
    .get(CriteriaRoute.RETRIEVE_BY_TASK, ({ retrieveAllByTask }) => retrieveAllByTask(), {
        beforeHandle: ({ validateCriteriaQueries }) => validateCriteriaQueries(),
    })
    .post(CriteriaRoute.CREATE, ({ createCriteria }) => createCriteria(), {
        beforeHandle: ({ validatePayload }) => validatePayload(),
    })
    .put(CriteriaRoute.UPDATE, ({ updateCriteria }) => updateCriteria(), {
        beforeHandle: [
            ({ validateParams }) => validateParams(),
            ({ validatePayload }) => validatePayload(),
        ],
    })
    .delete(CriteriaRoute.DELETE, ({ deleteCriteria }) => deleteCriteria(), {
        beforeHandle: ({ validateParams }) => validateParams(),
    });

import { ErrorHandlers } from '@/handlers';
import { criteriaModels } from '@/models';
import Elysia from 'elysia';

export const CriteriaMiddlewares = new Elysia({ name: 'criteria.middlewares' })
    .use(criteriaModels)
    .use(ErrorHandlers)
    .guard({ as: 'local', body: 'criteria.dto' })
    .derive(
        { as: 'scoped' },
        ({ validateBodyProps, validateQueries, isIntParams, body, query }) => ({
            validatePayload: () =>
                validateBodyProps({
                    requestBody: body as Omit<TCriteria, 'id'>,
                    requiredKeys: ['description', 'taskId'],
                }),
            validateCriteriaQueries: () =>
                validateQueries({ requireQuery: query, requiredKeys: ['taskId'] }),
            validateParams: () => isIntParams(),
        }),
    );

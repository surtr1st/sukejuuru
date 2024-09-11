import { PayloadError } from '@/enums';
import { ErrorHandlers } from '@/handlers';
import { penaltyModels } from '@/models';
import Elysia from 'elysia';

export const PenaltyMiddlewares = new Elysia({ name: 'penalty.middlewares' })
    .use(penaltyModels)
    .use(ErrorHandlers)
    .guard({ as: 'local', body: 'penalty.dto' })
    .derive(
        { as: 'scoped' },
        ({ body, validateBodyProps, isIntParams, validateQueries, query }) => ({
            validatePayload: () =>
                validateBodyProps({
                    requestBody: body as Omit<TPenalty, 'id'>,
                    requiredKeys: ['title', 'description', 'compensation'],
                    responseError: {
                        title: PayloadError.INVALID('title'),
                        description: PayloadError.INVALID('description'),
                        compensation: PayloadError.INVALID('compensation'),
                    },
                }),
            validatePenaltyQueries: () =>
                validateQueries({ requestQueries: query, requiredKeys: ['nodeId'] }),
            validateParams: () => isIntParams(),
        }),
    );

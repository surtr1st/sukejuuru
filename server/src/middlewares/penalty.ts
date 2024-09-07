import { PenaltyError } from '@/enums/penalty';
import { ErrorHandlers } from '@/handlers';
import { penaltyModels } from '@/models';
import Elysia from 'elysia';

export const PenaltyMiddlewares = new Elysia({ name: 'penalty.middlewares' })
    .use(penaltyModels)
    .use(ErrorHandlers)
    .guard({ as: 'local', body: 'penalty.dto' })
    .derive({ as: 'scoped' }, ({ body, validateBodyProps, isIntParams }) => ({
        validatePayload: () =>
            validateBodyProps({
                requestBody: body as Omit<TPenalty, 'id'>,
                requiredKeys: ['title', 'description', 'compensation'],
                responseError: {
                    title: PenaltyError.INPUT_PAYLOAD('title'),
                    description: PenaltyError.INPUT_PAYLOAD('description'),
                    compensation: PenaltyError.INPUT_PAYLOAD('compensation'),
                },
            }),
        validateParams: () => isIntParams(),
    }));

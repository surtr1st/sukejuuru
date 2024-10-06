import { TrackerRoute } from '@/enums';
import { body, createMiddleware, query, useErrorHandler } from '@bunarcane/arcane';

const { handlePayload, handleQuery } = useErrorHandler();

export const TrackerMiddleware = createMiddleware(TrackerRoute.CREATE)
    .intercept(async () =>
        handlePayload({
            requestBody: await body<TTrackerPayload>(),
            requiredKeys: ['madeOnDate', 'durationId'],
        }),
    )
    .compose();

export const TrackerQueryMiddleware = createMiddleware(TrackerRoute.RETRIEVE_BY_NODE)
    .intercept(async () =>
        handleQuery({ requestQueries: query<{ nodeId: number }>(), requiredKeys: ['nodeId'] }),
    )
    .compose();

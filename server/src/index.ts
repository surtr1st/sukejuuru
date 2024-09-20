import './extensions';
import { createArcane, type TArcanePlugin, useResult } from '@bunarcane/arcane';
import {
    CriteriaRouter,
    DurationRouter,
    NodeRouter,
    PenaltyRouter,
    PriorityRouter,
    StatusRouter,
    TaskRouter,
} from './routers';

const config = {
    port: 7000,
    context: 'Starting application on localhost:7000',
};

const plugin: TArcanePlugin = {
    cors: {
        origin: 'http://localhost:5173',
        allowedHeaders: ['Content-Type', 'Accept'],
        allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    },
    database: useResult(Bun.env.SUKEJUURU_CONNECTION_STRING),
};

createArcane()
    .enable(plugin)
    .use(NodeRouter)
    .use(TaskRouter)
    .use(PenaltyRouter)
    .use(DurationRouter)
    .use(PriorityRouter)
    .use(StatusRouter)
    .use(CriteriaRouter)
    .serve(config);

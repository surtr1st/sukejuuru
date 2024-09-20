import './extensions';
import { createArcane } from '@bunarcane/arcane';
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

const plugin = {
    cors: {
        origin: 'http://localhost:5173',
        allowedHeaders: ['Content-Type', 'Accept'],
        allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    },
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

import './extensions';
import { createArcane } from '@bunarcane/arcane';
import {
    ColorRouter,
    CriteriaRouter,
    DurationRouter,
    NodeRouter,
    PenaltyRouter,
    PriorityRouter,
    StatusRouter,
    TaskRouter,
    TrackerRouter,
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
    .withPrefix('/api')
    .enable(plugin)
    .use(DurationRouter)
    .use(NodeRouter)
    .use(TaskRouter)
    .use(TrackerRouter)
    .use(PenaltyRouter)
    .use(PriorityRouter)
    .use(StatusRouter)
    .use(CriteriaRouter)
    .use(ColorRouter)
    .serve(config);

import '@/extensions';
import { Elysia } from 'elysia';
import {
    CriteriaRouter,
    DurationRouter,
    NodeRouter,
    PenaltyRouter,
    PriorityRouter,
    StatusRouter,
    TaskRouter,
} from './routes';

const app = new Elysia()
    .group('/api', (app) =>
        app
            .use(NodeRouter)
            .use(PenaltyRouter)
            .use(TaskRouter)
            .use(PriorityRouter)
            .use(StatusRouter)
            .use(DurationRouter)
            .use(CriteriaRouter),
    )
    .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

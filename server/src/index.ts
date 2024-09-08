import '@/extensions';
import { Elysia } from 'elysia';
import { NodeRouter, PenaltyRouter, PriorityRouter, StatusRouter, TaskRouter } from './routes';

const app = new Elysia()
    .group('/api', (app) =>
        app
            .use(NodeRouter)
            .use(PenaltyRouter)
            .use(TaskRouter)
            .use(PriorityRouter)
            .use(StatusRouter),
    )
    .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

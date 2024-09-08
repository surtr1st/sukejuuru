import '@/extensions';
import { Elysia } from 'elysia';
import { NodeRouter, PenaltyRouter, TaskRouter } from './routes';

const app = new Elysia()
    .group('/api', (app) => app.use(NodeRouter).use(PenaltyRouter).use(TaskRouter))
    .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

import '@/extensions';
import { Elysia } from 'elysia';
import { NodeRouter } from './routes';
import { PenaltyRouter } from './routes/penalty';

const app = new Elysia()
    .group('/api', (app) => app.use(NodeRouter).use(PenaltyRouter))
    .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

import '@/extensions';
import { Elysia } from 'elysia';
import { NodeRouter } from './routes';

const app = new Elysia().group('/api', (app) => app.use(NodeRouter)).listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

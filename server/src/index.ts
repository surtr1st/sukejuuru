import { Elysia } from 'elysia';
import { NodeController } from './controllers';

const app = new Elysia().group('/api', (app) => app.use(NodeController)).listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

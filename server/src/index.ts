import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { node, task } from './routers';

const app = new Hono().basePath('/api');
app.use(
    cors({
        origin: 'http://localhost:5173',
        allowHeaders: ['Accept', 'Content-Type'],
        allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
);
app.use(prettyJSON());

app.route('/', node);
app.route('/', task);

export default app;

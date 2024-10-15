import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { node, task } from './routers';
import { HTTPException } from 'hono/http-exception';

const app = new Hono().basePath('/api');
app.use(
    cors({
        origin: 'http://localhost:5173',
        allowHeaders: ['Accept', 'Content-Type'],
        allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    }),
);
app.use(prettyJSON());
app.onError((err, c) =>
    err instanceof HTTPException ? err.getResponse() : c.text(err.message, 500),
);

app.route('/', node);
app.route('/', task);

export default app;

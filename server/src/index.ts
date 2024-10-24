import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { node, task, duration, color, priority, status, tracker } from './routers';
import { HTTPException } from 'hono/http-exception';
import { useResult } from './utils';

Array.prototype.empty = function (): boolean {
    return this.length === 0;
};

const useCors = () =>
    cors({
        origin: [useResult(Bun.env.REL_ALLOWED_ORIGIN), 'http://localhost:5173'],
        allowHeaders: ['Accept', 'Content-Type'],
        allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    });

const app = new Hono()
    .basePath('/api')
    .use(useCors())
    .use(prettyJSON())
    .onError((err, c) =>
        err instanceof HTTPException ? err.getResponse() : c.text(err.message, 500),
    );

app.get('/checkhealth', (c) => c.text('OK'))
app.route('/', node);
app.route('/', task);
app.route('/', duration);
app.route('/', color);
app.route('/', priority);
app.route('/', status);
app.route('/', tracker);

export default {
    port: 7000,
    fetch: app.fetch,
};

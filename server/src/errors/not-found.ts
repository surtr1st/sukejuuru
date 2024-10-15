import type { StatusCode } from 'hono/utils/http-status';

export class NotFoundError extends Error {
    code: StatusCode = 404;
    constructor(message: string) {
        super();
        this.message = message;
    }
}

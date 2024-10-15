import type { StatusCode } from 'hono/utils/http-status';

export class InternalServerError extends Error {
    code: StatusCode = 500;
    constructor(message: string) {
        super();
        this.message = message;
    }
}

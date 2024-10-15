import type { StatusCode } from 'hono/utils/http-status';

export class ValidateError extends Error {
    code: StatusCode = 406;
    constructor(public message: string) {
        super(message);
    }
}

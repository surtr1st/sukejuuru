import { HTTPException } from 'hono/http-exception';
import type { StatusCode } from 'hono/utils/http-status';

export class InternalServerError extends HTTPException {
    status: StatusCode = 500;
    constructor(message: string) {
        super();
        this.message = message;
    }
}

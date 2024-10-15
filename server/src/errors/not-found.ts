import { HTTPException } from 'hono/http-exception';
import type { StatusCode } from 'hono/utils/http-status';

export class NotFoundError extends HTTPException {
    status: StatusCode = 404;
    constructor(message: string) {
        super();
        this.message = message;
    }
}

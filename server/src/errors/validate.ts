import { HTTPException } from 'hono/http-exception';
import type { StatusCode } from 'hono/utils/http-status';

export class ValidateError extends HTTPException {
    status: StatusCode = 406;
    constructor(message: string) {
        super();
        this.message = message;
    }
}

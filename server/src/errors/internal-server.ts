export class InternalServerError extends Error {
    code: number = 500;
    constructor(message: string) {
        super();
        this.message = message;
    }
}

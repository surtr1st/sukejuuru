export class ValidateError extends Error {
    constructor(public message: string) {
        super(message);
    }
}

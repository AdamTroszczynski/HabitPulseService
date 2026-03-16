import { ZodError } from 'zod';
import { fail } from '../helpers/ResponsHelpers.js';
import { ErrorCodes } from '../enums/ErrorCodes.js';
import { HttpStatus } from '../enums/HttpStatus.js';
export class AppError extends Error {
    code;
    message;
    status;
    constructor(code, message, status) {
        super(message);
        this.code = code;
        this.message = message;
        this.status = status;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err, req, res, _next) => {
    if (err instanceof ZodError) {
        return fail(res, ErrorCodes.VALIDATION_ERROR, err.issues[0].message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if (err instanceof AppError) {
        return fail(res, err.code, err.message, err.status);
    }
    return fail(res, ErrorCodes.INTERNAL_ERROR, 'Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
};
//# sourceMappingURL=ErrorHandler.js.map
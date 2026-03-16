import jwt from 'jsonwebtoken';
import { env } from '../helpers/ConfigEnv.js';
import { AppError } from '../middlewares/ErrorHandler.js';
import { ErrorCodes } from '../enums/ErrorCodes.js';
import { HttpStatus } from '../enums/HttpStatus.js';
export const generateAuthToken = (dto) => {
    const payload = {
        jti: crypto.randomUUID(),
        userId: dto.userId,
        type: dto.type,
        duration: dto.duration,
        iat: Date.now(),
    };
    const authToken = jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: dto.duration === 'long' ? '30d' : '15m',
    });
    return authToken;
};
export const verifyAuthToken = (token) => {
    try {
        return jwt.verify(token, env.JWT_SECRET);
    }
    catch {
        throw new AppError(ErrorCodes.UNAUTHORIZED, 'Invalid or expired token', HttpStatus.UNAUTHORIZED);
    }
};
//# sourceMappingURL=jwt.js.map
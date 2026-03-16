import { env } from './ConfigEnv.js';
const cookieOptions = {
    httpOnly: true,
    secure: env.NODE_ENV === 'production',
    sameSite: 'strict',
};
export const sendCookie = (res, key, value, isLong) => {
    res.cookie(key, value, {
        maxAge: isLong ? 30 * 24 * 60 * 60 * 1000 : undefined,
        ...cookieOptions,
    });
};
export const removeCookie = (res, key) => {
    res.clearCookie(key, cookieOptions);
};
//# sourceMappingURL=SendCookie.js.map
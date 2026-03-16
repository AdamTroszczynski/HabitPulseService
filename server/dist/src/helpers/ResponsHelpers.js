import { HttpStatus } from '../enums/HttpStatus.js';
export const ok = (res, data, status = HttpStatus.OK) => {
    res.status(status).json({ success: true, data, error: null });
};
export const fail = (res, code, message, status) => {
    res.status(status).json({ success: false, data: null, error: { code, message } });
};
//# sourceMappingURL=ResponsHelpers.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(input) {
        super(input.message);
        this.name = input.name || 'APIError';
        this.status = input.status;
        this.errors = input.errors || '';
        Error.captureStackTrace(this, APIError);
    }
}
exports.APIError = APIError;
//# sourceMappingURL=error.js.map
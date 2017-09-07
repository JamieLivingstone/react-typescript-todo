"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringWithLength = (str) => typeof str === 'string' && str.length > 0;
exports.errorMessage = (str) => ({ error: `Error: ${str}` });
exports.isSecurePassword = (password) => !!(exports.isStringWithLength(password) && password.length > 5 && password.match(/^(?=.*[A-Z]).+$/));
//# sourceMappingURL=validations.js.map
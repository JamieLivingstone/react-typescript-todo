export const isStringWithLength = (str: string): boolean => typeof str === 'string' && str.length > 0;

export const errorMessage = (str: string): object => ({ error: `Error: ${str}` });

export const isSecurePassword = (password: string): boolean => !!(isStringWithLength(password) && password.length > 5 && password.match(/^(?=.*[A-Z]).+$/));

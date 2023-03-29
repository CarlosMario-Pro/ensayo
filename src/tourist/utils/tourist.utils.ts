export function isEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

export function isPassword(password: string): boolean {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    return pattern.test(password);
}

export function isNumber(number: any): boolean {
    const pattern = /^[1-9]\d*(\.\d+)?$/;
    return pattern.test(number);
}
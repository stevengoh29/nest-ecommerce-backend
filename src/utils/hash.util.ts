import * as bcrypt from 'bcrypt';

export function genPersonalKey(): Promise<string> {
    return bcrypt.genSalt(6);
}
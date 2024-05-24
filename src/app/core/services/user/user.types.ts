
export type LoggedInUser = {
    token: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'ADMIN' | 'USER' | ''
}

export type User = Omit<LoggedInUser, 'role'>

export interface TokenPayload {
    role: string;
    sub: string;
    iat: number;
    exp: number;
}

export interface UserInfo {
    firstName: string;
    lastName: string;
    contact: null | string;
    email: string
}
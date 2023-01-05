export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
}

export type LoginPayload = {
    email: string;
    password: string;
}

export type LoginResponseData = {
    name: string,
    _id: string,
    email: string,
    accessToken: string
}

export interface IUser {
    name: string;
    email: string;
    password: string;
    comparePassword: comparePasswordFunction;
}

export type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => void) => void;
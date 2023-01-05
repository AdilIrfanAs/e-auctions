export type RegisterPayload = {
	name: string;
	email: string;
	password: string;
}
export type RegisterResponse = {
	status: boolean;
	message: string;
}
export type LoginPayload = {
	email: string;
	password: string;
}
export type LoginResponse = {
	status: boolean;
	message: string;
	data: LoginUserData;
}
export type LoginUserData = {
    name: string,
    _id: string,
    email: string,
    accessToken: string
}
export type UserStateType = {
    user: LoginUserData[]
}
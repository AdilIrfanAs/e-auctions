import axios from 'axios';
import {ENV} from '../config/config'
import {RegisterPayload, RegisterResponse, LoginPayload, LoginResponse} from './../interfaces-types/auth'

export const register = async (payload: RegisterPayload) => {
    const url = `${ENV.url}auth/register`;
    const {data} = await axios.post<RegisterResponse>(url, payload);
    return data;
};

export const login = async (payload: LoginPayload) => {
    const url = `${ENV.url}auth/login`;
    const { data } = await axios.post<LoginResponse>(url, payload);
    return data;
};
import {ENV} from '../config/config'
import axios from 'axios';
import {CreatePayload, CreateResponse} from './../interfaces-types/payment'


export const createPayment = async (payload: CreatePayload) => {
    const url = `${ENV.url}payments/`;
    const {data} = await axios.post<CreateResponse>(url, payload);
    return data;
};
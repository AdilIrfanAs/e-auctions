import {ENV} from '../config/config'
import axios from 'axios';
import {CreatePayload, CreateResponse, PublishItemPayload, PublishItemResponse, ItemsResponse} from './../interfaces-types/item'

export const createItem = async (payload: CreatePayload) => {
    const url = `${ENV.url}items/`;
    const {data} = await axios.post<CreateResponse>(url, payload);
    return data;
};

export const updateItem = async (id: string, payload: PublishItemPayload) => {
    const url = `${ENV.url}items/${id}`;
    const {data} = await axios.put<PublishItemResponse>(url, payload);
    return data;
};

export const fetchItems = async (type: Number) => {
    const url = `${ENV.url}items/?type=${type}`;
    const {data} = await axios.get<ItemsResponse>(url);
    return data;
};

export const fetchDrafts = async (_id: string) => {
    const url = `${ENV.url}items/drafts/${_id}`;
    const {data} = await axios.get<ItemsResponse>(url);
    return data;
};

export const fetchItemById = async (id: any) => {
    const url = `${ENV.url}items/${id}`;
    const response = await axios.get(url);
    if (response.status) {
        return response.data
    } else {
        return false;
    }
};
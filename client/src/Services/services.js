
import axios from 'axios';

// const baseUrl = 'http://localhost:3000/'
const baseUrl = '/'

export const fetchSellers = async () => {
    const { data } = await axios.get(baseUrl + 'sellers');
    return data;
}

export const fetchBuyers = async (id) => {
    const { data } = await axios.get(baseUrl + 'buyers/' + id);
    return data;
}

export const fetchAllBuyers = async () => {
    const { data } = await axios.get(baseUrl + 'buyers');
    return data;
}

export const bookSlot = async (value) => {
    const { data } = await axios.post(baseUrl + 'buyers', value);
    return data;
}

export const removeSlot = async (value) => {
    const { data } = await axios.patch(baseUrl + 'sellers/removeSlot', value);
    return data;
}

export const createSlot = async (value) => {
    const { data } = await axios.patch(baseUrl + 'sellers', value);
    return data;
}

export const buyerRequest = async (id) => {
    const { data } = await axios.patch(baseUrl + 'buyers/' + id);
    return data;
}

export const cancelRequest = async (id) => {
    await axios.delete(baseUrl + 'buyers/' + id)
}
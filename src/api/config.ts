import axios from "axios";

const API_BASE_URL_BOTS = 'https://6842d197e1347494c31e0af7.mockapi.io';

export const apiBots = axios.create({
    baseURL: API_BASE_URL_BOTS,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

const API_BASE_URL_AUTH = 'https://6842d197e1347494c31e0af7.mockapi.io';

export const apiAuth = axios.create({
    baseURL: API_BASE_URL_AUTH,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})


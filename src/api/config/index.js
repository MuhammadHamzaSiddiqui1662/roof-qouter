import axios from "axios";

export const PIPEDRIVE_BASE_URL = 'https://api.pipedrive.com/v1';
export const API_TOKEN = '6266af8774d3c48d5f4b134f7a4d74ed59f02ddc'

export const SERVER = axios.create({
    baseURL: PIPEDRIVE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        api_token: API_TOKEN
    }
})
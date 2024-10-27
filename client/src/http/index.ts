import axios from 'axios';
import { IUser } from '../store';

const baseAPI = `${process.env.API_URL}api/`
export const baseUser = `${baseAPI}user/`;
export const baseOffice = `${baseAPI}office/`;
export const baseHomeSlider = `${baseAPI}home-slider/`;
export const baseContact = `${baseAPI}contact/`;
export const baseAdvantage = `${baseAPI}advantage/`;
export const baseService = `${baseAPI}service/`;
export const baseMain = `${baseAPI}main/`;
export const baseWorkType = `${baseAPI}work-type/`;
export const baseWork = `${baseAPI}work/`;
export const baseReview = `${baseAPI}review/`;


export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export const $api = axios.create({
    withCredentials: true,
    baseURL: baseAPI
})

export const $authHost = axios.create({
    withCredentials: true,
    baseURL: baseAPI
})


$authHost.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
})

$authHost.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${baseUser}/refresh`, { withCredentials: true })
            localStorage.setItem('accessToken', response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
            localStorage.removeItem('accessToken')
            console.log('НЕ АВТОРИЗОВАН')
        }
    }
    throw error;
})
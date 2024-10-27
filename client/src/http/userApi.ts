import jwt_decode from "jwt-decode";
import { $api, $authHost, AuthResponse, baseUser } from ".";
import { IReviews } from "../store";


export interface IUserValues {
    id?: number;
    name?: string;
    imageSrc?: string;
    visitsNumber?: number;
    email?: string;
    phone?: string;
    role?: 'ANON' | 'USER' | 'ADMIN';
    review?: IReviews;
}

const catchData = (data: any): AuthResponse | any => {
    if (data && data?.accessToken && data?.user && data?.refreshToken) {
        localStorage.setItem('accessToken', data.accessToken)
        return {
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            user: data.user
        }
    }
    return data
}

export const registration = async (password: string) => {
    const { data } = await $api.post(`${baseUser}registration`, { password })
    return catchData(data)
}

export const recoverUser = async (password: string) => {
    const { data } = await $api.post(`${baseUser}recover`, { password })
    return catchData(data)
}

export const changeEmail = async (newEmail: string) => {
    const { data } = await $authHost.post(`${baseUser}recover`, { newEmail })
    return catchData(data)
}

export const recoverUserSendCode = async (email: string) => {
    const { data } = await $api.post(`${baseUser}recover-send-code`, { email })
    return data
}

export const changeEmailSendCode = async (newEmail: string) => {
    const { data } = await $authHost.post(`${baseUser}change-email-send-code`, { newEmail })
    return catchData(data)
}

export const newUserSendCode = async (email: string) => {
    const { data } = await $api.post(`${baseUser}new-user-send-code`, { email })
    return catchData(data)
}

export const activate = async (email: string, code: string) => {
    const { data } = await $api.post(`${baseUser}activate`, { email, code })
    return catchData(data)
}

export const login = async (email: string, password: string) => {
    const { data } = await $api.post(`${baseUser}login`, { email, password })
    return catchData(data)
}

export const logout = async () => {
    const { data } = await $authHost.post(`${baseUser}logout`)
    if (data) {
        localStorage.removeItem('accessToken')
    }
    return catchData(data)
}

export const refresh = async () => {
    const { data } = await $api.post(`${baseUser}refresh`)
    return catchData(data)
}

export const giveRole = async (id: number, role: 'ANON' | 'USER' | 'ADMIN') => {
    const { data } = await $authHost.post(`${baseUser}give-role`, { id, role })
    return catchData(data)
}

export const changeById = async (id: number, user: IUserValues, image?: File) => {
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (image) {
        formData.append('image', image)
    }
    const { data } = await $authHost.post(`${baseUser}change/${id}`, formData)
    return catchData(data)
}

export const changeImage = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await $authHost.post(`${baseUser}change-image`, formData)
    return catchData(data)
}

export const changeName = async (name: string) => {
    const { data } = await $authHost.post(`${baseUser}change-name`, { name })
    return catchData(data)
}

export const changePhone = async (phone: string) => {
    const { data } = await $authHost.post(`${baseUser}change-phone`, { phone })
    return catchData(data)
}

export const getUser = async () => {
    const { data } = await $authHost.get(`${baseUser}`)
    return catchData(data)
}

export const getAllUsers = async () => {
    const { data } = await $authHost.get(`${baseUser}all`)
    return catchData(data)
}

export const getUserById = async (id: number) => {
    const { data } = await $authHost.get(`${baseUser}${id}`)
    return catchData(data)
}

export const deleteUser = async () => {
    const { data } = await $authHost.delete(`${baseUser}`)
    if (data) {
        localStorage.removeItem('accessToken')
    }
    return catchData(data)
}

export const deleteUserById = async (id: number) => {
    const { data } = await $authHost.delete(`${baseUser}${id}`)
    return catchData(data)
}
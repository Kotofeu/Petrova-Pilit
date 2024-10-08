import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'


import adminImage from '../assets/images/12_11zon.jpg'
import userImage from '../assets/images/main.png'
import { IReviews } from './ReviewsStore';


export interface IUser {
    id: number;
    name?: string;
    imageSrc?: string;
    role?: 'USER' | 'ADMIN';
    visitsNumber?: number;
    review?: IReviews;
    email?: string;
    phone?: string;
}
const mockUser: IUser = {
    id: 1,
    name: 'Бурятский Бублик',
    imageSrc: userImage,
    role: 'USER',
    visitsNumber: 1,
    email: 'cras.petrov@yandex.ru',
    phone: '+79114968216',
    review: {
        id: 1,
    }
}
const mockAdmin: IUser = {
    id: 1,
    name: 'Бурятский Бублик',
    imageSrc: adminImage,
    role: 'ADMIN',
    visitsNumber: 0
}
export class UserStore {
    private _user: IUser | null = mockUser;
    private _isAuth: boolean = true;
    private _isAdmin: boolean = false;
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }

    setIsAuth(isAuth: boolean) {
        this._isAuth = isAuth
    }
    setIsAdmin(role: string) {
        this._isAdmin = role === "ADMIN" ? true : false
    }
    setUser(user: IUser | null) {
        this._user = user
        this.setIsAuth(user ? true : false)
        this.setIsAdmin(user?.role || 'USER')
    }
    setUserImage(image: File | null) {
        if (this._user) {
            this._user.imageSrc = image ? URL.createObjectURL(image) : undefined
        }
    }
    setUserName(userName: string) {
        if (this._user) {
            this._user.name = userName
        }
    }
    setUserPhone(phone: string) {
        if (this._user) {
            this._user.phone = phone
        }
    }
    setUserEmail(email: string) {
        if (this._user) {

            this._user.email = email
        }
    }

    getUserById(id: number) {
        return mockUser
    }

    deleteUserById(id: number) {

    }
    giveRoleForUser(id: number, role: "ADMIN" | "USER") {

    }
    changeUserById(user: IUser) {

    }

    get isAuth() {
        return this._isAuth
    }
    get isAdmin() {
        return this._isAdmin
    }
    get user() {
        return this._user
    }
}
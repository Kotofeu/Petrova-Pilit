import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'


import adminImage from '../assets/images/12_11zon.jpg'
import userImage from '../assets/images/main.png'
export interface IUser {
    id: number;
    name?: string;
    imageSrc?: string;
    role?: 'USER' | 'ADMIN';
    visitsNumber?: number;
}
const mockUser: IUser = {
    id: 1,
    name: 'Бурятский Бублик',
    imageSrc: userImage,
    role: 'USER',
    visitsNumber: 1
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
        this.setIsAuth(true)
        this._isAdmin = role === "ADMIN" ? true : false
    }
    setUser(user: IUser | null) {
        this._user = user
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
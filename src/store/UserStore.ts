import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'


import adminImage from '../assets/images/12_11zon.jpg'
import userImage from '../assets/images/main.png'
import { IReviews } from './ReviewsStore';
import { IGetAllJSON } from '.';


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
    name: 'Анастасия Петрова',
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
    id: 2,
    name: 'Бурятский Бублик',
    email: 'buryat@gmail.ru',
    imageSrc: adminImage,
    role: 'ADMIN',
    visitsNumber: 0
}
const allUsers: IGetAllJSON<IUser> = {
    count: 6,
    rows: [mockAdmin, mockUser, 
        { ...mockAdmin, id: 3, name: 'Данил Петров'}, 
        { ...mockUser, id: 4, name: 'Константин Петров' }, 
        { ...mockUser, id: 5, name: 'Анна Борисова Петрова'  }, 
        { ...mockUser, id: 6, name: 'Петрова Анастасия' }
    ]
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
    getAllUsers() {
        return allUsers
    }

    getUserById(id: number) {
        return allUsers.rows.find(user => user.id === id)
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
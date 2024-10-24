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
    role?: 'USER' | 'ADMIN' | 'ANON';
    visitsNumber?: number;
    review?: IReviews;
    email?: string;
    phone?: string;
}
const mockUser: IUser = {
    id: 1,
    name: 'Анастасия Петрова',
    imageSrc: userImage,
    role: 'ADMIN',
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
    role: 'USER',
    visitsNumber: 0
}
const allUsers: IGetAllJSON<IUser> = {
    count: 6,
    rows: [mockAdmin, mockUser,
        { ...mockAdmin, id: 3, name: 'Данил Петров' },
        { ...mockUser, id: 4, name: 'Константин Петров' },
        { ...mockUser, id: 5, name: 'Анна Борисова Петрова' },
        { ...mockUser, id: 6, name: 'Петрова Анастасия' }
    ]
}
export class UserStore {
    private _user: IUser | null = mockUser;
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
//
    setUser(user: IUser | null) {
        this._user = user
    }

    //
    getAllUsers() {
        return allUsers
    }
    //
    getUserById(id: number) {
        return allUsers.rows.find(user => user.id === id)
    }
    //
    changeUserById(user: IUser) {

    }
    //
    deleteUserById(id: number) {

    }
    //
    giveRoleForUser(id: number, role: "ADMIN" | "USER") {

    }
    //
    setUserImage(image: File | null) {
        if (this._user) {
            this._user.imageSrc = image ? URL.createObjectURL(image) : undefined
        }
    }
    //
    setUserName(userName: string) {
        if (this._user) {
            this._user.name = userName
        }
    }
    //
    setUserPhone(phone: string) {
        if (this._user) {
            this._user.phone = phone
        }
    }
    //
    setUserEmail(email: string) {
        if (this._user) {

            this._user.email = email
        }
    }





    get isAuth(): boolean {
        return this._user !== null
    }
    get isAdmin() {
        return this._user?.role === "ADMIN" ? true : false
    }
    get user() {
        return this._user
    }
}
import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

import { IGetAllJSON } from '.';
import { IUserValue } from '../http';



export interface IUser extends IUserValue {
    id: number;
}


export class UserStore {
    private _user: IUser | null = null;
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    //
    setUser(user: IUser | null) {
        this._user = user
    }

    //
    getAllUsers(): IGetAllJSON<IUser> {
        return {count: 0, rows: []}
    }
    //
    getUserById(id: number) : IUser {
        return {id: 0}
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
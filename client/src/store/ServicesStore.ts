import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

import { IGetAllJSON } from '.';
import { IServiceValue } from '../http';

export interface IService extends IServiceValue {
    id: number;
}


export class ServicesStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _services: IService[] = []
    private _isLoading: boolean = true;
    private _error: AxiosError | null = null


    get services() {
        return this._services
    }

    get isLoading() {
        return this._isLoading
    }
    get error() {
        return this._error
    }

    setServices(services: IService[]) {
        this._services = services
    }
    changeService(service: IService & IServiceValue) {

    }

    addService(service: IServiceValue) {

    }


    deleteService(id: number) {

    }

    private setIsLoading(isLoading: boolean) {
        this._isLoading = isLoading
    }

    private setError(error: AxiosError) {
        this._error = error
    }
}
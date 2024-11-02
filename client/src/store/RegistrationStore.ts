import { makeAutoObservable } from 'mobx'
import { AuthResponse, ILoginParams, userApi } from '../http';
import { AxiosError } from 'axios';

export const REGISTRATION = 'registration';
export const AUTHORIZATION = 'authorization';
export const PASSWORD_RECOVERY = 'passwordRecovery';

type ActionType = typeof REGISTRATION | typeof AUTHORIZATION | typeof PASSWORD_RECOVERY;

export class RegistrationStore {
    private _isOpen: boolean = false;
    private _actionType: ActionType = AUTHORIZATION; 
    private _isLoading: boolean = false;
    private _error: string | null = null;

    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    get isOpen() {
        return this._isOpen;
    }

    get actionType() {
        return this._actionType;
    }
    get isLoading() {
        return this._isLoading;
    }

    get error() {
        return this._error;
    }

    async registration(password: string): Promise<AuthResponse | undefined> {
        this._error = ''
        this._isLoading = true;

        try {
            return await userApi.registration(password);
        }
        catch (err) {
            if (err instanceof AxiosError) {
                this._error = err.response?.data.message || err.message;
            } else {
                this._error = `${err}`;
            }
        }
        finally {
            this._isLoading = false;
        }
    }
    async recoverUser(password: string): Promise<AuthResponse | undefined> {
        this._error = ''
        this._isLoading = true;

        try {
            return await userApi.recoverUser(password);
        }
        catch (err) {
            if (err instanceof AxiosError) {
                this._error = err.response?.data.message || err.message;
            } else {
                this._error = `${err}`;
            }
        }
        finally {
            this._isLoading = false;
        }
    }
    async login(params: ILoginParams): Promise<AuthResponse | undefined> {
        this._error = ''
        this._isLoading = true;

        try {
            return await userApi.login(params);
        }
        catch (err) {
            if (err instanceof AxiosError) {
                this._error = err.response?.data.message || err.message;
            } else {
                this._error = `${err}`;
            }
        }
        finally {
            this._isLoading = false;
        }
    }

    setIsOpen(isOpen: boolean) {
        this._isOpen = isOpen
    }

    setActionType(actionType: ActionType) {
        this._actionType = actionType
    }

}
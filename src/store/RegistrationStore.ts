
import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

export const REGISTRATION = 'registration';
export const AUTHORIZATION = 'authorization';
export const PASSWORD_RECOVERY = 'passwordRecovery';

type ActionType = typeof REGISTRATION | typeof AUTHORIZATION | typeof PASSWORD_RECOVERY;

export class RegistrationStore {
    private _isOpen: boolean = false;
    private _actionType: ActionType = AUTHORIZATION; 
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    get isOpen() {
        return this._isOpen;
    }


    get actionType() {
        return this._actionType;
    }

    setIsOpen(isOpen: boolean) {
        this._isOpen = isOpen
    }

    setActionType(actionType: ActionType) {
        this._actionType = actionType
    }

}
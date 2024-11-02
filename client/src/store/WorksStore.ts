import { makeAutoObservable } from 'mobx'

import { IGetAllJSON } from '.';
import { IWorksTypeValue, IWorkValue } from '../http';

export interface IWorksType extends IWorksTypeValue {
    id: number
}


export interface IWork extends IWorkValue {
    id: number
}

export class WorksStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _workTypes: IWorksType[] = []
    private _works: IWork[] = [];
    private _homeWorks: IWork[] = [];

    private _isWorkCreating: boolean = false

    get works() {
        return this._works;
    }
    get homeWorks() {
        return this._homeWorks;
    }
    get workTypes() {
        return this._workTypes;
    }

    get isWorkCreating() {
        return this._isWorkCreating
    }

    setWorks(works: IWork[]) {
        this._works = works
    }
    setHomeWorks(works: IWork[]) {
        this._homeWorks = works
    }
    setIsWorkCreating(isOpen: boolean) {
        this._isWorkCreating = isOpen
    }
    setWorkTypes(workTypes: IWorksType[]) {
        this._workTypes = workTypes
    }
    getWorkById(id: number){
        return this._works.find(work => work.id === id)
    }
}


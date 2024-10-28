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

    private _activeWorkType: number | null = null;
    private _page = 1;
    private _hasMoreWorks = false;

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

    get activeWorkType() {
        return this._activeWorkType;
    }
    get page() {
        return this._page;
    }
    get hasMoreWorks() {
        return this._hasMoreWorks;
    }

    get isWorkCreating() {
        return this._isWorkCreating
    }

    setPage(page: number) {
        this._page = page
    }
    setWorks(works: IWork[]) {
        if (!this._homeWorks.length && this._activeWorkType === null && this._page === 1) {
            return this._homeWorks = works
        }
        return this._works = works
    }
    setHomeWorks(works: IWork[]) {
        if (!this._works.length && this._activeWorkType === null && this._page === 1) {
            return this._works = works
        }
        return this._homeWorks = works
    }
    setIsWorkCreating(isOpen: boolean) {
        this._isWorkCreating = isOpen
    }


    loadWorkById(id: number): IWork {
        return { id: 1 }
        // Тут совершено другая логика
    }

    deleteWork(id: number) {

    }

    editWork(work: IWork) {

    }
    addWork() {

    }

    deleteType(id: number) {
        this._workTypes = this._workTypes.filter(type => type.id !== id)
    }

    editType(type: IWorksType) {
        this._workTypes = this._workTypes.map(tag => (
            tag.id === type.id ? { id: type.id, name: type.name } : tag
        ))
    }
    addType(name: string) {
        const id = Date.now()
        this._workTypes.push({
            id: id,
            name: name
        })
        return id
    }
}


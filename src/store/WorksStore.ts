import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

import sliderImage1 from '../assets/images/nails/1.jpg'
import sliderImage2 from '../assets/images/nails/2.jpg'
import sliderImage3 from '../assets/images/nails/3.jpg'
import sliderImage4 from '../assets/images/nails/4.jpg'
import sliderImage5 from '../assets/images/nails/5.jpg'

export interface IWorksType {
    id: number;
    title: string;
}
export interface IOthersWorkImage {
    id: number;
    imageSrc: string;
    description?: string;
    title?: string;
}
export interface IWorks {
    id: number;
    afterImage?: string;
    beforeImage?: string;
    title: string;
    rating?: number;
    description?: string;
    workType?: IWorksType;
    othersImage?: IOthersWorkImage[]
}
export class WorksStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _workTypes: IWorksType[] = [
        {
            id: 0,
            title: 'Пиллинг'
        },
        {
            id: 1,
            title: 'Фантазия пропала'
        },
        {
            id: 2,
            title: 'Маник'
        },
        {
            id: 3,
            title: 'Падик'
        },
    ]
    private _works: IWorks[] = [
        {
            id: 1,
            afterImage: sliderImage5,
            beforeImage: sliderImage1,
            title: 'Я выбираю пилить ноготочки, а не мозги😏',
            rating: 5,
            workType: {
                id: 1,
                title: 'Пиллинг'
            }

        },
        {
            id: 2,
            afterImage: sliderImage4,
            beforeImage: sliderImage3,
            title: 'Восстановление архитектуры? WTF?🤔',
            rating: 4,
            workType: {
                id: 2,
                title: 'Фантазия пропала'
            }
        },
        {
            id: 3,
            beforeImage: sliderImage4,
            title: 'Закрываем апрель🔥🔥',
            workType: {
                id: 3,
                title: 'Маник'
            }
        },
        {
            id: 4,
            afterImage: sliderImage3,
            beforeImage: sliderImage1,
            title: 'Очень Очень БОЛЬШОООООООЙ ТЕКСТ БЛА БЛА БЛА БЛА',
            workType: {
                id: 1,
                title: 'Пиллинг'
            }
        },
        {
            id: 5,
            beforeImage: sliderImage4,
            title: 'Очень Очень БОЛЬШОООООООЙ ТЕКСТ  БЛА БЛА'
        },
    ]
    private _isLoading: boolean = true;
    private _error: AxiosError | null = null
    private _activeWorkType = null;
    private _page = 1;
    private _limit = 20;

    private _hasMoreWorks = true;

    private _worksCache: IWorks[] = [];

    get works() {
        return this._works
    }
    get workTypes() {
        return this._workTypes
    }
    get isLoading() {
        return this._isLoading
    }
    get error() {
        return this._error
    }
    get activeWorkType() {
        return this._activeWorkType
    }
    get page() {
        return this._page
    }
    get hasMoreWorks() {
        return this._hasMoreWorks
    }
    get worksCache() {
        return this._worksCache
    }
    get limit() {
        return this._limit
    }
    
    private setIsLoading(isLoading: boolean) {
        this._isLoading = isLoading
    }

    private setErrore(error: AxiosError) {
        this._error = error
    }
}


import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

import sliderImage1 from '../assets/images/nails/1.jpg'
import sliderImage2 from '../assets/images/nails/2.jpg'
import sliderImage3 from '../assets/images/nails/3.jpg'
import sliderImage4 from '../assets/images/nails/4.jpg'
import sliderImage5 from '../assets/images/nails/5.jpg'


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
    othersImage?: IOthersWorkImage[]
}
export class WorksStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _works: IWorks[] = [
        {
            id: 1,
            afterImage: sliderImage5,
            beforeImage: sliderImage1,
            title: 'Я выбираю пилить ноготочки, а не мозги😏',
            rating: 5

        },
        {
            id: 2,
            afterImage: sliderImage4,
            beforeImage: sliderImage3,
            title: 'Восстановление архитектуры? WTF?🤔',
            rating: 4
        },
        {
            id: 3,
            beforeImage: sliderImage4,
            title: 'Закрываем апрель🔥🔥'
        },
        {
            id: 4,
            afterImage: sliderImage3,
            beforeImage: sliderImage1,
            title: 'Очень Очень БОЛЬШОООООООЙ ТЕКСТ БЛА БЛА БЛА БЛА'
        },
        {
            id: 5,
            beforeImage: sliderImage4,
            title: 'Очень Очень БОЛЬШОООООООЙ ТЕКСТ  БЛА БЛА'
        },
    ]
    private _isLoading: boolean = true;
    private _error: AxiosError | null = null


    get works() {
        return this._works
    }




    get isLoading() {
        return this._isLoading
    }
    get error() {
        return this._error
    }

    private setIsLoading(isLoading: boolean) {
        this._isLoading = isLoading
    }

    private setErrore(error: AxiosError) {
        this._error = error
    }
}
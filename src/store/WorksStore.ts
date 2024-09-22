import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

import sliderImage1 from '../assets/images/nails/1.jpg'
import sliderImage2 from '../assets/images/works-background.jpg'
import sliderImage3 from '../assets/images/nails/3.jpg'
import sliderImage4 from '../assets/images/nails/4.jpg'
import sliderImage5 from '../assets/images/nails/5.jpg'
import { IGetAllJSON, IImages } from '.';

export interface IWorksType {
    id: number;
    title: string;
}
export interface IWorks {
    id: number;
    afterImage?: IImages;
    beforeImage?: IImages;
    title: string;
    rating?: number;
    description?: string;
    workType?: IWorksType;
    othersImage?: IImages[];
    time: number;
}
const mockWorks: IGetAllJSON<IWorks> = {
    count: 7,
    rows: [
        {
            id: 1,
            afterImage: {
                id: 10,
                imageSrc: sliderImage2
            },
            beforeImage: {
                id: 11,
                imageSrc: sliderImage1
            },
            title: 'Я выбираю пилить ноготочки, а не мозги😏',
            rating: 5,
            workType: {
                id: 1,
                title: 'Пиллинг'
            },
            time: 1724233268040,
            othersImage: [
                {
                    id: 1,
                    imageSrc: sliderImage1
                },
                {
                    id: 2,
                    imageSrc: sliderImage2
                },
                {
                    id: 3,
                    imageSrc: sliderImage3
                },
            ],
            description: `Любим мы какие-то слова всегда умные использовать: гипонихий, дорсальный слой,синусы и прочее😏
Сегодня разберем ту самую архитектуру, что мы там восстанавливаем :
Правильная архитектура складывается из параллелей ☝Ваш ноготь должен быть параллелен со всех сторон,чтобы квадрат был квадратным, а овал/миндаль не был клювом
Это можно сделать только жестким материалом: гелем/акригелем мы выстраиваем все стороны и опиливаем все параллельно
Кому-то это требуется, кому-то нет, но зачастую после носки ногтей в месяц они любят скрутиться, упасть или уехать влево-вправо
Часто в таких случаях мастера просто убирают длину до минимальной и ничего строить не приходится🤷🏼‍♀
Но мы не ищем легких путей и не облегчаем себе работу, а делаем так, чтобы прям нраааавилось🫠
Для записи пиши в сообщения группы,мы найдем подходящее время🫡
Только до конца августа фиксированная цена 🔥1300🔥
Боткина 2а( 9 апреля, магазин Мир ткани)🏃🏼‍♀‍➡
С заботой, Ваш мастер Настасья🥰`
        },
        {
            id: 2,
            afterImage: {
                id: 12,
                imageSrc: sliderImage4
            },
            beforeImage: {
                id: 13,
                imageSrc: sliderImage3
            },
            title: 'Восстановление архитектуры? WTF?🤔',
            rating: 4,
            workType: {
                id: 2,
                title: 'Фантазия пропала'
            },
            time: 1724233267040,
            othersImage: [
                {
                    id: 1,
                    imageSrc: sliderImage1
                },
                {
                    id: 2,
                    imageSrc: sliderImage2
                },
                {
                    id: 3,
                    imageSrc: sliderImage3
                },
                {
                    id: 4,
                    imageSrc: sliderImage5
                },
                {
                    id: 5,
                    imageSrc: sliderImage4
                },
                {
                    id: 6,
                    imageSrc: sliderImage1
                },
            ]
        },
        {
            id: 3,
            beforeImage: {
                id: 14,
                imageSrc: sliderImage4
            },
            time: 1724233258040,
            title: 'Закрываем апрель🔥🔥',
            workType: {
                id: 3,
                title: 'Маник'
            }
        },
        {
            id: 4,
            afterImage: {
                id: 15,
                imageSrc: sliderImage3
            },
            beforeImage: {
                id: 16,
                imageSrc: sliderImage1
            },
            title: 'Очень Очень БОЛЬШОООООООЙ ТЕКСТ БЛА БЛА БЛА БЛА',
            workType: {
                id: 1,
                title: 'Пиллинг'
            },
            time: 1724233268040,

        },
        {
            beforeImage: {
                id: 17,
                imageSrc: sliderImage4
            },
            id: 5,
            title: 'Очень Очень БОЛЬШОООООООЙ ТЕКСТ  БЛА БЛА',
            time: 1724233168040,
        },
    ]
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
    private _works: IWorks[] = [];
    private _isLoading: boolean = true;
    private _error: AxiosError | null = null
    private _activeWorkType: number | null = null;
    private _page = 1;
    private _limit = 1;

    private _hasMoreWorks = false;

    private _worksCache: IWorks[] = [...this._works];

    get works() {
        return this._works;
    }
    get workTypes() {
        return this._workTypes;
    }
    get isLoading() {
        return this._isLoading;
    }
    get error() {
        return this._error;
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
    get worksCache() {
        return this._worksCache;
    }
    get limit() {
        return this._limit;
    }
    setWorkType(typeId: number | null) {
        this._activeWorkType = typeId;
        this._page = 1;
        this._works = typeId === null
            ? [...this.worksCache]
            : [...this._worksCache.filter(work => work.workType?.id === typeId)];
        this.loadWorks(typeId);

    }
    loadWorks(typeId: number | null = null, page: number = this._page, limit: number = this._limit) {
        this._isLoading = true;
        this._works = typeId === null
            ? [...mockWorks.rows]
            : [...mockWorks.rows.filter(work => work.workType?.id === typeId)];
        this._worksCache = [...this.worksCache, ...this._works]
        // Тут замена this._works.length на количесво работ с запроса
        this._hasMoreWorks = this._works.length > this._page * this._limit;
    }
    loadWorkById(id: number) {
        // Тут совершено другая логика
        return mockWorks.rows.find(work => work.id === id)
    }
    private setIsLoading(isLoading: boolean) {
        this._isLoading = isLoading
    }

    private setErrore(error: AxiosError) {
        this._error = error
    }
}


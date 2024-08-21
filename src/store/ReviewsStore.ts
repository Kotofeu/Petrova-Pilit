import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

import combinedManicure from '../assets/images/services/combined manicure.jpg'
import manicureGelPolishCoating from '../assets/images/services/Manicure with gel polish coating.jpg'
import nailRepair from '../assets/images/services/nail repair.jpg'
import strengtheningNails from '../assets/images/services/Strengthening nails.jpg'
import frenchManicure from '../assets/images/services/French manicure.jpg'
import AlignmentNailPlate from '../assets/images/services/Alignment of the nail plate.jpg'
import MensManicure from '../assets/images/services/Mens manicure.jpg'

export interface IUser {
    id: number;
    name?: string;
    imageSrc?: string;
}
export interface IReviews {
    id: number;
    user: IUser;
    title?: string;
    time?: number;
    rating?: number;
    imagesSrc?: string[];
}
export class ReviewsStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _reviews: IReviews[] = [
        {
            id: 1,
            title: 'Отличный мастер, всем советую',
            time: 1724233268040,
            rating: 5,
            imagesSrc: [combinedManicure, manicureGelPolishCoating],
            user: {
                id: 1,
                name: 'Анастасия петрова',
                imageSrc: combinedManicure
            }

        },
        {
            id: 2,
            title: 'Хочу выразить огромную благодарность за отличный маникюр. Все было сделано очень аккуратно и профессионально. Девушка, которая делала маникюр, очень приятная и отзывчивая. Я осталась довольна результатом и обязательно вернусь к Вам еще. Спасибо большое!',
            time: 1724233261040,
            rating: 4.5,
            imagesSrc: [nailRepair, manicureGelPolishCoating],
            user: {
                id: 2,
                name: 'cras.petrov@yandex.ru',
            }

        }, {
            id: 3,
            title: 'Все отлично ,мастер супер,спасла мои ногти,спасибо большое Настя!)',
            time: 1724231268040,
            rating: 4,
            imagesSrc: [nailRepair, strengtheningNails],
            user: {
                id: 3,
                name: 'Василиса',
                imageSrc: nailRepair
            }
            
        },
        {
            id: 4,
            title: `Анастасия, мастер своего дела.
            \nУмница, сделала конфетку с моих нарощенных страшных ногтей после другого мастера, дала советы. 
            \nПриду к ней ещё раз.Мастера рекомендую.`,
            time: 1724233258040,
            rating: 5,
            imagesSrc: [frenchManicure, strengtheningNails],
            user: {
                id: 4,
                name: 'Чел ты...',
                imageSrc: strengtheningNails
            }

        },
        {
            id: 5,
            title: 'Замечательная, добрая и отзывчивая девушка. Маникюр делает аккуратно, соблюдает все нормы и правила гигиены.',
            time: 1724232268040,
            rating: 4,
            imagesSrc: [combinedManicure, AlignmentNailPlate],
            user: {
                id: 5,
                name: 'Ноу нейм',
                imageSrc: ''
            }

        },
        {
            id: 6,
            title: 'Все очень понравилось, выполнено все чисто и аккуратно. Мастер внимательна к клиенту, помогла в выборе дизайна маникюра.',
            time: 1723233268040,
            rating: 1,
            imagesSrc: [MensManicure, frenchManicure],
            user: {
                id: 6,
                name: 'Николай',
                imageSrc: MensManicure
            }

        },
        {
            id: 7,
            title: `Делали мужской маникюр, Анастасия очень деликатно отнеслась к проблеме, дала советы по уходу, всем остались довольны, придем ещё 😊👍`,
            time: 1724213268040,
            rating: 2,
            imagesSrc: [nailRepair, strengtheningNails],
            user: {
                id: 7,
                name: 'Очень длинное имя И очень длинная фамилия',
                imageSrc: ''
            }

        },
    ]
    private _isLoading: boolean = true;
    private _error: AxiosError | null = null


    get reviews() {
        return this._reviews
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
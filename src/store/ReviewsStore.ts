import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

import combinedManicure from '../assets/images/services/combined manicure.jpg'
import nailRepair from '../assets/images/services/nail repair.jpg'
import strengtheningNails from '../assets/images/services/Strengthening nails.jpg'
import AlignmentNailPlate from '../assets/images/services/Alignment of the nail plate.jpg'
import MensManicure from '../assets/images/services/Mens manicure.jpg'

import { IGetAllJSON, IImages } from '.';
import { IUser } from './UserStore';


export interface IReviews {
    id: number;
    user?: IUser;
    comment?: string;
    time?: number;
    rating?: number;
    images?: IImages[];
}
export class ReviewsStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _reviews: IGetAllJSON<IReviews> = {
        count: 7,
        rows: [
            {
                id: 1,
                comment: 'Отличный мастер, всем советую',
                time: 1724233268040,
                rating: 5,
                images: [
                    {
                        id: 1,
                        imageSrc: combinedManicure,
                    },
                    {
                        id: 2,
                        imageSrc: nailRepair,
                    },
                    {
                        id: 3,
                        imageSrc: strengtheningNails,
                    },
                    {
                        id: 4,
                        imageSrc: AlignmentNailPlate,
                    },
                    {
                        id: 5,
                        imageSrc: combinedManicure,
                    },
                    {
                        id: 6,
                        imageSrc: combinedManicure,
                    },
                    {
                        id: 7,
                        imageSrc: MensManicure,
                    },
                    {
                        id: 8,
                        imageSrc: combinedManicure,
                    },
                ],
                user: {
                    id: 1,
                    name: 'Анастасия петрова',
                    imageSrc: combinedManicure,
                    visitsNumber: 4
                }

            },
            {
                id: 2,
                comment: 'Хочу выразить огромную благодарность за отличный маникюр. Все было сделано очень аккуратно и профессионально. Девушка, которая делала маникюр, очень приятная и отзывчивая. Я осталась довольна результатом и обязательно вернусь к Вам еще. Спасибо большое!',
                time: 1724233261040,
                rating: 4.5,
                user: {
                    id: 2,
                    name: 'cras.petrov@yandex.ru',
                    visitsNumber: -1
                }

            },
            {
                id: 3,
                comment: 'Все отлично ,мастер супер,спасла мои ногти,спасибо большое Настя!)',
                time: 1724231268040,
                rating: 4,
                user: {
                    id: 3,
                    name: 'Василиса',
                    imageSrc: nailRepair,
                    visitsNumber: 2
                }

            },
            {
                id: 4,
                comment: `Анастасия, мастер своего дела.\nУмница, сделала конфетку с моих нарощенных страшных ногтей после другого мастера, дала советы. \nПриду к ней ещё раз.Мастера рекомендую.`,
                time: 1724233258040,
                rating: 5,
                user: {
                    id: 4,
                    name: 'Чел ты...',
                    imageSrc: strengtheningNails,
                    visitsNumber: 7
                }

            },
            {
                id: 5,
                comment: 'Замечательная, добрая и отзывчивая девушка. Маникюр делает аккуратно, соблюдает все нормы и правила гигиены.',
                time: 1724232268040,
                rating: 4,
                images: [
                    {
                        id: 1,
                        imageSrc: combinedManicure,
                    },
                    {
                        id: 2,
                        imageSrc: nailRepair,
                    },
                    {
                        id: 3,
                        imageSrc: strengtheningNails,
                    },
                    {
                        id: 4,
                        imageSrc: AlignmentNailPlate,
                    }
                ],

                user: {
                    id: 5,
                    name: 'Ноу нейм',
                    visitsNumber: 0
                }

            },
            {
                id: 6,
                comment: 'Все очень понравилось, выполнено все чисто и аккуратно. Мастер внимательна к клиенту, помогла в выборе дизайна маникюра.',
                time: 1723233268040,
                rating: 1,
                user: {
                    id: 6,
                    name: 'Николай',
                    imageSrc: MensManicure,
                    visitsNumber: 9
                }

            },
            {
                id: 7,
                comment: `Делали мужской маникюр, Анастасия очень деликатно отнеслась к проблеме, дала советы по уходу, всем остались довольны, придем ещё 😊👍`,
                time: 1724213268040,
                rating: 2,
                user: {
                    id: 7,
                    name: 'Очень длинное имя И очень длинная фамилия',
                    visitsNumber: 5
                }

            },
            {
                id: 8,
                time: 1723233268040,
                rating: 1,
            },
            {
                id: 9,
                time: 1723233268040,
                rating: 1,
            },
        ]
    }
    private _isLoading: boolean = true;
    private _error: AxiosError | null = null


    get reviews() {
        return this._reviews.rows
    }
    get count() {
        return this._reviews.count
    }



    get isLoading() {
        return this._isLoading
    }
    get error() {
        return this._error
    }
    createReview(review: IReviews) {
        this._reviews.rows.push(review)
    }
    getReviewById (id: number | undefined) {
        if (!id) return
        // Логика загрузки
        return this._reviews.rows.find(review => review.id === id)

    }

    deleteReviewById(id: number) {
        alert(`Удален отзыв: ${id}`)

    }


    deleteReviewImageById(id: number) {
        alert(`Удалено изображение: ${id}`)
    }

    private setIsLoading(isLoading: boolean) {
        this._isLoading = isLoading
    }

    private setErrore(error: AxiosError) {
        this._error = error
    }
}
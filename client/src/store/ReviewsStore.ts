import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

import { IGetAllJSON } from '.';
import { IReviewValue } from '../http';


export interface IReview extends IReviewValue {
    id: number;
}
export interface IReviewAllJSON {
    reviews?: IGetAllJSON<IReview>;
    page?: number;
    found?: boolean;
}
export class ReviewsStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _reviews: IReview[] = []
    private _mainReviews: IReview[] = []
    private _activeReview: number | null = null;
    get activeReview() {
        return this._activeReview;
    }

    get reviews() {
        return this._reviews
    }

    get mainReviews() {
        return this._mainReviews
    }

    setReviews(reviews: IReview[]) {
        if (!this._mainReviews.length) {
            this._mainReviews = reviews
        }
        this._reviews = reviews
    }
    setMainReviews(mainReviews: IReview[]) {
        if (!this._reviews.length) {
            this._reviews = mainReviews
        }
        this._mainReviews = mainReviews
    }
    createReview(review: IReview) {
        //  this._reviews.rows.push(review)
    }
    getReviewById(id: number | undefined): IReview | null {
        return null
        // Логика загрузки
        //   return this._reviews.rows.find(review => review.id === id)

    }

    deleteReviewById(id: number) {
        alert(`Удален отзыв: ${id}`)

    }


    deleteReviewImageById(id: number) {
        alert(`Удалено изображение: ${id}`)
    }

}
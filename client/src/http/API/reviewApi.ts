import { $api, $authHost, baseReview, IUserValue } from "..";
import { IImages } from "../../store";

export interface IReviewValue {
    id?: number;
    user?: IUserValue | null;
    comment?: string | null;
    updatedAt?: number | null;
    rating?: number | null;
    reviews_images?: IImages[] | null;
}

export class ReviewApi {

    getReviews = async (limit?: number, page?: number, reviewId?: number) => {
        const { data } = await $api.get(`${baseReview}all`, {
            params: {
                limit,
                page,
                reviewId
            }
        })
        return data
    }

    getReview = async () => {
        const { data } = await $api.get(`${baseReview}`)
        return data
    }

    getReviewById = async (id: number) => {
        const { data } = await $api.get(`${baseReview}${id}`)
        return data
    }

    addReview = async (
        review: IReviewValue,
        images?: File[] | null
    ) => {
        const formData = new FormData();
        formData.append('review', JSON.stringify(review));
        if (images?.length) {
            images.map(image => {
                formData.append('images', image, image.name)
            })
        }
        const { data } = await $api.post(`${baseReview}`, formData)
        return data
    }

    addAvitoReview = async (
        review: IReviewValue,
        images?: File[] | null,
        userIcon?: File | null,
    ) => {
        const formData = new FormData();
        formData.append('review', JSON.stringify(review));
        if (userIcon) {
            formData.append('userIcon', userIcon)
        }
        if (images?.length) {
            images.map(image => {
                formData.append('images', image, image.name)
            })
        }
        const { data } = await $authHost.post(`${baseReview}avito`, formData)
        return data
    }


    changeById = async (
        review: IReviewValue,
        deletedIds?: number[],
        images?: File[] | null
    ) => {
        const formData = new FormData();
        formData.append('review', JSON.stringify(review));
        if (images) {
            images.map(image => {
                formData.append('images', image, image.name)
            })
        }
        if (deletedIds && deletedIds.length) {
            formData.append('deletedIds', JSON.stringify(deletedIds));
        }
        const { data } = await $api.post(`${baseReview}update`, formData)
        return data
    }

    deleteImageById = async (deletedIds: number[]) => {
        const { data } = await $api.delete(`${baseReview}images`, {
            data: {
                deletedIds: deletedIds
            }
        });
        return data
    }


    deleteImageByIdAdmin = async (deletedIds: number[]) => {
        const { data } = await $authHost.delete(`${baseReview}images-admin`, {
            data: {
                deletedIds: deletedIds
            }
        });
        return data
    }

    delete = async () => {
        const { data } = await $api.delete(`${baseReview}`)
        return data
    }

    deleteById = async (id: number) => {
        const { data } = await $authHost.delete(`${baseReview}${id}`)
        return data
    }

}
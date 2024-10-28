import { $api, $authHost, baseWork, IWorksTypeValue } from "..";
import { IImages } from "../../store";

export interface IWorkValue {
    id?: number;
    imageAfterSrc?: string | null;
    imageBeforeSrc?: string | null;
    name?: string | null;
    description?: string | null;
    workType?: IWorksTypeValue | null;
    images?: IImages[] | null;
    createdAt?: number | null;
    typeId?: string | null;
}

export class WorkApi {
    getWorks = async (limit?: number, page?: number, typeId?: number) => {
        const { data } = await $api.get(`${baseWork}`, {
            params: {
                limit,
                page,
                typeId
            }
        })
        return data
    }
    getWorkById = async (id: number) => {
        const { data } = await $api.get(`${baseWork}${id}`)
        return data
    }

    addWork = async (
        work: IWorkValue,
        imageAfter?: File | null,
        imageBefore?: File | null,
        otherImages?: File[] | null
    ) => {
        const formData = new FormData();
        formData.append('work', JSON.stringify(work));
        if (imageAfter) {
            formData.append('imageAfter', imageAfter)
        }
        if (imageBefore) {
            formData.append('imageBefore', imageBefore)
        }
        if (otherImages?.length) {
            otherImages.map(image => {
                formData.append('otherImages', image, image.name)
            })
        }
        const { data } = await $authHost.post(`${baseWork}`, formData)
        return data
    }
    changeById = async (
        id: number,
        work: IWorkValue,
        imageAfter?: File | null,
        imageBefore?: File | null,
        otherImages?: File[] | null,
        deletedIds?: number[]
    ) => {
        const formData = new FormData();
        formData.append('work', JSON.stringify(work));
        if (imageAfter) {
            formData.append('imageAfter', imageAfter)
        }
        if (imageBefore) {
            formData.append('imageBefore', imageBefore)
        }
        if (otherImages?.length) {
            otherImages.map(image => {
                formData.append('otherImages', image, image.name)
            })
        }
        if (deletedIds && deletedIds.length) {
            formData.append('deletedIds', JSON.stringify(deletedIds));
        }
        const { data } = await $authHost.post(`${baseWork}${id}`, formData)
        return data
    }

    deleteImageById = async (deletedIds: number[]) => {
        const { data } = await $authHost.delete(`${baseWork}images`, {
            data: {
                deletedIds: deletedIds
            }
        });
        return data
    }

    deleteWorkById = async (id: number) => {
        const { data } = await $authHost.delete(`${baseWork}${id}`)
        return data
    }

}
import { $api, $authHost, baseUser } from ".";

export interface IAdvantageValue {
    id?: number;
    name?: string;
    iconSrc?: string;
    imageSrc?: string;
    description?: string;
}

export const getAdvantages = async () => {
    const { data } = await $api.get(`${baseUser}`)
    return data
}

export const addAdvantage = async (
    advantage: IAdvantageValue,
    icon: File,
    image: File | null
) => {
    const formData = new FormData();
    formData.append('advantage', JSON.stringify(advantage));
    if (image) {
        formData.append('image', image)
    }
    if (icon) {
        formData.append('icon', icon)
    }
    const { data } = await $authHost.post(`${baseUser}`, formData)
    return data
}

export const changeById = async (
    id: number,
    advantage: IAdvantageValue,
    icon: File | null,
    image: File | null
) => {
    const formData = new FormData();
    formData.append('advantage', JSON.stringify(advantage));
    if (image) {
        formData.append('image', image)
    }
    if (icon) {
        formData.append('icon', icon)
    }
    const { data } = await $authHost.post(`${baseUser}${id}`, formData)
    return data
}

export const deleteById = async (id: number) => {
    const { data } = await $authHost.delete(`${baseUser}${id}`)
    return data
}


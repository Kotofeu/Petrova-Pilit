import { $api, $authHost, baseService } from "..";

export interface IServiceValue {
    id?: number;
    name?: string | null;
    time?: number | null;
    price?: number | null;
    description?: string | null;
}

export class ServiceApi {
    
    getServices = async () => {
        const { data } = await $api.get(`${baseService}`)
        return data
    }

    addService = async (service: IServiceValue) => {
        const formData = new FormData();
        formData.append('service', JSON.stringify(service));
        const { data } = await $authHost.post(`${baseService}`, formData)
        return data
    }

    changeServiceById = async (id: number, service: IServiceValue,) => {
        const formData = new FormData();
        formData.append('service', JSON.stringify(service));
        const { data } = await $authHost.post(`${baseService}${id}`, formData)
        return data
    }

    deleteServiceById = async (id: number) => {
        const { data } = await $authHost.delete(`${baseService}${id}`)
        return data
    }
}
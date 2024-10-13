import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

import { IGetAllJSON } from '.';


export interface IService {
    id: number;
    title: string;
    time: number;
    price: number;
    description?: string;
}
export interface IServiceCreate {
    title: string;
    time: number;
    price: number;
    description?: string;
}


export class ServicesStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _services: IGetAllJSON<IService> = {
        count: 7,
        rows: [
            {
                id: 1,
                title: 'Комбинированный маникюр',
                time: 45,
                price: 1000,
                description: `Cовременная техника ухода за ногтями и кутикулой, которая объединяет элементы классического, аппаратного и европейского маникюра. 
            В процессе выполнения мастер использует маникюрные ножницы и кусачки, а также профессиональные аппараты с разнообразными насадками. Этот подход особенно полезен для проблемных участков, требующих дополнительного внимания и индивидуального подхода.`,

            },
            {
                id: 2,
                title: 'Маникюр с покрытием гель-лаком',
                time: 120,
                price: 1500,
                description: `Гель-лак — это синтетическое покрытие для ногтей, созданное на основе геля для наращивания и лака (бесцветного или с пигментом). В отличие от обычного, гель-лак полимеризуется в ультрафиолетовой или LED-лампе и после застывания становится прочным и стойким. При условии бережного отношения к маникюру и высокой квалификации нейл-специалиста покрытие не скалывается и не отслаивается в течение нескольких недель.`,

            }, {
                id: 3,
                title: 'Ремонт ногтя',
                time: 15,
                price: 0,
                description: `Процедура, которая позволяет восстановить повреждённый ноготь.`,

            },
            {
                id: 4,
                title: 'Укрепление ногтей',
                time: 30,
                price: 0,
                description: `Cпециальные косметические средства, предназначенные для восстановления структуры натуральных ногтевых пластин, повышения их прочности и защиты от неблагоприятных внешних факторов.`,

            },
            {
                id: 5,
                title: 'Французский маникюр',
                time: 30,
                price: 0,
                description: `Один из самых распространённых и популярных видов дизайна ногтей. Классический французский маникюр выглядит следующим образом: ногтевая пластина покрывается неярким бежевым или пастельно-розовым тоном лака, а на кончик ногтя по форме полумесяца наносится белый цвет.`,
            },
            {
                id: 6,
                title: 'Выравнивание ногтевой пластины',
                time: 30,
                price: 0,
                description: `Процедура, которая позволяет придать ногтевой пластине правильную форму, скрыв неровности и несовершенства. В отличие от спиливания, выравнивание позволяет обеспечить идеальный внешний вид. Для проведения процедуры может быть использована база, акрил или специальный биогель.`,

            },
            {
                id: 7,
                title: 'Мужской маникюр',
                time: 45,
                price: 1000,
                description: `На самом же деле мужской маникюр представляет гигиенический уход за ногтями, благодаря чему они приобретают более привлекательный вид. Мастера не используют цветные лаки для этой процедуры, поскольку специальных уходовых средств вполне достаточно. Мужской маникюр также подразумевает удаление кутикулы, очистку ногтей, придание формы, полировки, процедуры, направленные на питание и увлажнение.`,

            },
        ]
    }
    private _isLoading: boolean = true;
    private _error: AxiosError | null = null


    get services() {
        return this._services.rows
    }

    get count() {
        return this._services.count
    }



    get isLoading() {
        return this._isLoading
    }
    get error() {
        return this._error
    }


    changeService(service: IService & IServiceCreate) {
        this._services.rows = this._services.rows.map(SR =>
            SR.id === service.id ? service : SR
        );
    }

    addService(service: IServiceCreate) {
        this._services.count = this._services.count + 1
        this._services.rows.push({
            id: Date.now(),
            ...service
        });
    }


    deleteService(id: number) {
        this._services.rows = this._services.rows.filter(advantage => advantage.id !== id);
    }




    private setIsLoading(isLoading: boolean) {
        this._isLoading = isLoading
    }

    private setErrore(error: AxiosError) {
        this._error = error
    }
}
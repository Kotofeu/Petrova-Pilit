import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'

import combinedManicure from '../assets/images/services/combined manicure.jpg'
import manicureGelPolishCoating from '../assets/images/services/Manicure with gel polish coating.jpg'
import nailRepair from '../assets/images/services/nail repair.jpg'
import strengtheningNails from '../assets/images/services/Strengthening nails.jpg'
import frenchManicure from '../assets/images/services/French manicure.jpg'
import AlignmentNailPlate from '../assets/images/services/Alignment of the nail plate.jpg'
import MensManicure from '../assets/images/services/Mens manicure.jpg'


export interface IService {
    id: number;
    title: string;
    time: number;
    price: number;
    description?: string;
    imageSrc?: string;
}
export class ServicesStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _services: IService[] = [
        {
            id: 1,
            title: 'Комбинированный маникюр',
            time: 45,
            price: 1000,
            description: `Cовременная техника ухода за ногтями и кутикулой, которая объединяет элементы классического, аппаратного и европейского маникюра. В процессе выполнения мастер использует маникюрные ножницы и кусачки, а также профессиональные аппараты с разнообразными насадками. Этот подход особенно полезен для проблемных участков, требующих дополнительного внимания и индивидуального подхода.`,
            imageSrc: combinedManicure

        },
        {
            id: 2,
            title: 'Маникюр с покрытием гель-лаком',
            time: 120,
            price: 1500,
            description: `Гель-лак — это синтетическое покрытие для ногтей, созданное на основе геля для наращивания и лака (бесцветного или с пигментом). В отличие от обычного, гель-лак полимеризуется в ультрафиолетовой или LED-лампе и после застывания становится прочным и стойким. При условии бережного отношения к маникюру и высокой квалификации нейл-специалиста покрытие не скалывается и не отслаивается в течение нескольких недель.`,
            imageSrc: manicureGelPolishCoating

        }, {
            id: 3,
            title: 'Ремонт ногтя',
            time: 15,
            price: 0,
            description: `Процедура, которая позволяет восстановить повреждённый ноготь.`,
            imageSrc: nailRepair
            
        },
        {
            id: 4,
            title: 'Укрепление ногтей',
            time: 30,
            price: 0,
            description: `Cпециальные косметические средства, предназначенные для восстановления структуры натуральных ногтевых пластин, повышения их прочности и защиты от неблагоприятных внешних факторов.`,
            imageSrc: strengtheningNails

        },
        {
            id: 5,
            title: 'Французский маникюр',
            time: 30,
            price: 0,
            description: `Один из самых распространённых и популярных видов дизайна ногтей. Классический французский маникюр выглядит следующим образом: ногтевая пластина покрывается неярким бежевым или пастельно-розовым тоном лака, а на кончик ногтя по форме полумесяца наносится белый цвет.`,
            imageSrc: frenchManicure

        },
        {
            id: 6,
            title: 'Выравнивание ногтевой пластины',
            time: 30,
            price: 0,
            description: `Процедура, которая позволяет придать ногтевой пластине правильную форму, скрыв неровности и несовершенства. В отличие от спиливания, выравнивание позволяет обеспечить идеальный внешний вид. Для проведения процедуры может быть использована база, акрил или специальный биогель.`,
            imageSrc: AlignmentNailPlate

        },
        {
            id: 7,
            title: 'Мужской маникюр',
            time: 45,
            price: 1000,
            description: `На самом же деле мужской маникюр представляет гигиенический уход за ногтями, благодаря чему они приобретают более привлекательный вид. Мастера не используют цветные лаки для этой процедуры, поскольку специальных уходовых средств вполне достаточно. Мужской маникюр также подразумевает удаление кутикулы, очистку ногтей, придание формы, полировки, процедуры, направленные на питание и увлажнение.`,
            imageSrc: MensManicure

        },
    ]
    private _isLoading: boolean = true;
    private _error: AxiosError | null = null


    get services() {
        return this._services
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
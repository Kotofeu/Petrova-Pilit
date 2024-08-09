import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'
import { resetGlobalState } from 'mobx/dist/internal';
import { ABOUT_ROUTE, CONTACT_ROUTE, HOME_ROUTE, WORKS_ROUTE } from '../utils/const/routes';


export interface ILink {
    title: string;
    link: string;
}
interface IGeneralData {
    promoBanner?: string;
    headerLinks: ILink[];
    phone?: string;
    email?: string;
    aboutMe?: string;
    vk?: string;
    avito?: string;
    inst?: string;

}
export class ApplicationStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _generalData: IGeneralData = {
        promoBanner: 'Скидка 50% на первый маникюр!',
        headerLinks: [
            { title: "Главная", link: HOME_ROUTE},
            { title: "Обо мне", link: ABOUT_ROUTE },
            { title: "Мои работы", link: WORKS_ROUTE },
            { title: "Контакты", link: CONTACT_ROUTE },
        ],
        phone: '+7 (981) 462 18-28',
        email: 'cras.petrov@yandex.ru',
        aboutMe: `Здравствуйте дaмы и гocпода🤗
Сертифициpовaнный и отвeтствeнный мacтер Hacтacья пpиглашает вac нa маникюp 👐
Прeлeсть маникюра cо мной:
☝️никакoгo страха, диcкoмфоpта, болeвыx ощущений;стeрильно и бeзoпaснo
💪вcе включено в cтoимоcть по комплексу:cнятиe,рeмoнт, пoстaнoвкa формы, укрепление+выравнивание, дизайн(френч,слайдеры,втирка,стемпинг, блестки)
🗣️ нахожусь в центре города;вода/чай/сладкое предложу в процессе
🤤только тонкое и прочное покрытие, никаких плюшек, кривых квадратов, ран на кутикуле и пропилов на ногтях(терпеть их не могу)`,
        vk: 'https://vk.com/id209456608',
        avito: 'https://www.avito.ru/kaliningrad/predlozheniya_uslug/manikyurukrepleniedizayn_2912965690?utm_campaign=native&utm_medium=item_page_android&utm_source=soc_sharing',
        inst: 'https://www.instagram.com/petrova.pilit?utm_source=qr'
    }
    private _isLoading: boolean = true;
    private _error: AxiosError | null = null
    get promoBanner() {
        return this._generalData.promoBanner;
    }
    get headerLinks() {
        return this._generalData.headerLinks
    }
    get phone() {
        return this._generalData.phone
    }
    get email() {
        return this._generalData.email
    }
    get aboutMe() {
        return this._generalData.aboutMe
    }
    get vk() {
        return this._generalData.vk
    }
    get avito() {
        return this._generalData.avito
    }
    get inst() {
        return this._generalData.inst
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
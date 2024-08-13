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
    whatsapp?: string;
    instagram?: string;
    addressName?: string;
    addressLink?: string;

}
export class ApplicationStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _generalData: IGeneralData = {
        promoBanner: 'Скидка 50% на первый маникюр!',
        headerLinks: [
            { title: "Главная", link: HOME_ROUTE },
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
        whatsapp: 'https://wa.me/+79814621828',
        instagram: 'https://www.instagram.com/petrova.pilit?utm_source=qr',
        addressName: 'Калининград Боткина 2А',
        addressLink: 'https://yandex.ru/maps/22/kaliningrad/house/ulitsa_botkina_2a/ZkkYcwVkSUUAQFtufXtwd3phYw==/?ll=20.524086%2C54.716129&pt=20.5805%2C54.7104&utm_medium=mapframe&utm_source=maps&z=17.75'
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
    get whatsapp() {
        return this._generalData.whatsapp
    }
    get instagram() {
        return this._generalData.instagram
    }
    get addressName() {
        return this._generalData.addressName
    }
    get addressLink() {
        return this._generalData.addressLink
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
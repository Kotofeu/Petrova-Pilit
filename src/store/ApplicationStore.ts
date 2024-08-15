import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'
import { resetGlobalState } from 'mobx/dist/internal';
import { ABOUT_ROUTE, CONTACT_ROUTE, HOME_ROUTE, WORKS_ROUTE } from '../utils/const/routes';

import Instagram from '../assets/icons/social/instagram.svg'
import Whatsapp from '../assets/icons/social/whatsapp.svg'
import Map from '../assets/icons/social/map.svg'

export interface ILink {
    title: string;
    link: string;
}
export interface IContactLink extends ILink {
    imageSrc?: string;
}
interface IGeneralData {
    promoBanner?: string;
    headerLinks: ILink[];
    aboutMe: string;
    contactLinks: IContactLink[];


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
        contactLinks: [
            /*  
            {
                  title: 'Телефон',
                  link: '+7 (981) 462 18-28',
              },
              */
            {
                title: 'WhatsApp',
                link: 'https://wa.me/+79814621828',
                imageSrc: Whatsapp
            },
            {
                title: 'Instagram',
                link: 'https://www.instagram.com/petrova.pilit?utm_source=qr',
                imageSrc: Instagram
            },
            {
                title: 'Калининград Боткина 2А',
                link: 'https://yandex.ru/maps/22/kaliningrad/house/ulitsa_botkina_2a/ZkkYcwVkSUUAQFtufXtwd3phYw==/?ll=20.524086%2C54.716129&pt=20.5805%2C54.7104&utm_medium=mapframe&utm_source=maps&z=17.75',
                imageSrc: Map
            },
            /*
            {
                title: 'Почта',
                link: '',
                imageSrc: 
            },
            
            */

        ],
        aboutMe: `Здравствуйте дaмы и гocпода🤗
Сертифициpовaнный и отвeтствeнный мacтер Hacтacья пpиглашает вac нa маникюp 👐
Прeлeсть маникюра cо мной:
☝️никакoгo страха, диcкoмфоpта, болeвыx ощущений;стeрильно и бeзoпaснo
💪вcе включено в cтoимоcть по комплексу:cнятиe,рeмoнт, пoстaнoвкa формы, укрепление+выравнивание, дизайн(френч,слайдеры,втирка,стемпинг, блестки)
🗣️ нахожусь в центре города;вода/чай/сладкое предложу в процессе
🤤только тонкое и прочное покрытие, никаких плюшек, кривых квадратов, ран на кутикуле и пропилов на ногтях(терпеть их не могу)`,
    }
    private _isLoading: boolean = true;
    private _error: AxiosError | null = null
    get promoBanner() {
        return this._generalData.promoBanner;
    }
    get headerLinks() {
        return this._generalData.headerLinks
    }
    get contactLinks() {
        return this._generalData.contactLinks
    }
    /*

        get email() {
        return this._generalData.email
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

     */

    get aboutMe() {
        return this._generalData.aboutMe
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
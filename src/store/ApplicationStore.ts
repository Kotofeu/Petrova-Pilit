import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'
import { ABOUT_ROUTE, ADMIN_ROUTE, HOME_ROUTE, REVIEWS_ROUTE, USER_ROUTE, WORKS_ROUTE } from '../utils/const/routes';

import HowToGetMp4 from '../assets/video/howToGet.mp4';
import HowToGet from '../assets/video/howToGet.png';

import Instagram from '../assets/icons/social/instagram.svg'
import Whatsapp from '../assets/icons/social/whatsapp.svg'
import Map from '../assets/icons/social/map.svg'
import InstagramLight from '../assets/icons/social/instagram light.svg'
import WhatsappLight from '../assets/icons/social/whatsapp light.svg'
import MapLight from '../assets/icons/social/map light.svg'

import sliderImage1 from '../assets/images/12_11zon.jpg'
import sliderImage2 from '../assets/images/background/1.png'
import sliderImage3 from '../assets/images/background/2.png'

import fast from '../assets/icons/fast.svg'
import quality from '../assets/icons/quality.svg'
import comfortable from '../assets/icons/comfortable.svg'
import beautifully from '../assets/icons/beautifully.svg'
import { IImages } from '.';



export interface ILink {
    title: string;
    link: string;
}

export interface IContactLink extends ILink {
    id: number;
    imageSrc?: string;
    imageLightSrc?: string;
}
export interface ICreateContactLink extends ILink {
    imageFile?: File;
    imageLightFile?: File;
}


export interface IAdvantages {
    id: number;
    title: string;
    imageSrc: string;
    description: string;
}
export interface ICreateAdvantages{
    title: string;
    description: string;
    imageFile?: File;
}


export interface IWorkSchedule {
    id: number;
    title: string;
    shortTitle: string;
    value: string;
}
interface IGeneralData {
    promoBanner?: string;
    aboutMe: string;
    addressMap?: string;
    howToGetVideo?: string;
    howToGetPreview?: string;
}
export class ApplicationStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _headerLinks: ILink[] = [
        { title: "Главная", link: HOME_ROUTE },
        { title: "Обо мне", link: ABOUT_ROUTE },
        { title: "Мои работы", link: WORKS_ROUTE },
        { title: "Отзывы", link: REVIEWS_ROUTE },
        { title: "Клиенты", link: USER_ROUTE },
        { title: "Админка", link: ADMIN_ROUTE }
    ];
    private _generalData: IGeneralData = {
        promoBanner: 'Скидка 50% на первый маникюр!',
        addressMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2304.608889733823!2d20.522914741385073!3d54.71650388760703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e3160bea68a3bf%3A0x47e628c68d0b71c0!2z0YPQuy4g0JHQvtGC0LrQuNC90LAsIDLQkCwg0JrQsNC70LjQvdC40L3Qs9GA0LDQtCwg0JrQsNC70LjQvdC40L3Qs9GA0LDQtNGB0LrQsNGPINC-0LHQuy4sIDIzNjAxNg!5e0!3m2!1sru!2sru!4v1724979269501!5m2!1sru!2sru',
        aboutMe: `Здравствуйте дамы и господа
Сертифицированный и ответственный мастер Hacтacья приглашает вас на маникюр 👐
Прелесть маникюра со мной:
☝️ никакого страха, дискомфорта, болeвыx ощущений; стeрильно и бeзoпaснo
💪 вcе включено в cтoимоcть по комплексу: cнятиe, рeмoнт, пoстaнoвкa формы, укрепление + выравнивание, дизайн (френч, слайдеры, втирка, стемпинг, блестки)
🗣️ нахожусь в центре города; вода/чай/сладкое предложу в процессе
🤤только тонкое и прочное покрытие, никаких плюшек, кривых квадратов, ран на кутикуле и пропилов на ногтях (терпеть их не могу)`,
        howToGetPreview: HowToGetMp4,
        howToGetVideo: HowToGet,

    }
    private _contactLinks: IContactLink[] = [
        {
            id: 1,
            title: 'WhatsApp',
            link: 'https://wa.me/+79814621828',
            imageSrc: Whatsapp,
            imageLightSrc: WhatsappLight,
        },
        {
            id: 2,
            title: 'Instagram',
            link: 'https://www.instagram.com/petrova.pilit?utm_source=qr',
            imageSrc: Instagram,
            imageLightSrc: InstagramLight,
        },
        {
            id: 3,
            title: 'Калининград, Боткина 2А',
            link: 'https://yandex.ru/maps/22/kaliningrad/house/ulitsa_botkina_2a/ZkkYcwVkSUUAQFtufXtwd3phYw==/?ll=20.524086%2C54.716129&pt=20.5805%2C54.7104&utm_medium=mapframe&utm_source=maps&z=17.75',
            imageSrc: Map,
            imageLightSrc: MapLight,
        }
    ]
    private _homeSlider: IImages[] = [
        {
            id: 1,
            imageSrc: sliderImage1,
        },
        {
            id: 2,
            imageSrc: sliderImage2,
        },
        {
            id: 3,
            imageSrc: sliderImage3,
        },
    ]
    private _officeImages: IImages[] = [
        {
            id: 1,
            imageSrc: sliderImage1,
        },
        {
            id: 2,
            imageSrc: sliderImage2,
        },
        {
            id: 3,
            imageSrc: sliderImage3,
        },
        {
            id: 5,
            imageSrc: sliderImage3,
        },
        {
            id: 6,
            imageSrc: sliderImage1,
        },
        {
            id: 7,
            imageSrc: sliderImage3,
        },

    ]
    private _advantages: IAdvantages[] = [
        {
            id: 1,
            imageSrc: fast,
            title: 'Быстро',
            description: 'Скорость и стиль — ваши ногти в лучшем виде за мгновение!'
        },
        {
            id: 2,
            imageSrc: quality,
            title: 'Качественно',
            description: 'Качество на первом месте — ваши ногти заслуживают лучшего!'
        },
        {
            id: 3,
            imageSrc: beautifully,
            title: 'Красиво',
            description: 'Красота, которая вдохновляет — ваши ногти засияют как никогда прежде!'
        },
        {
            id: 4,
            imageSrc: comfortable,
            title: 'Комфортно',
            description: 'Релакс и стиль — наслаждайтесь маникюром в комфортной обстановке!'
        }
    ]
    private _workSchedule: IWorkSchedule[] = [
        {
            id: 1,
            title: 'Понеденьник',
            shortTitle: 'Пн',
            value: '08:00 - 20:00',
        },
        {
            id: 2,
            title: 'Вторник',
            shortTitle: 'Вт',
            value: '08:00 - 20:00',
        },
        {
            id: 3,
            title: 'Среда',
            shortTitle: 'Ср',
            value: '08:00 - 20:00',
        },
        {
            id: 4,
            title: 'Четверг',
            shortTitle: 'Чт',
            value: '08:00 - 20:00',
        },
        {
            id: 5,
            title: 'Пятница',
            shortTitle: 'Пт',
            value: '08:00 - 20:00',
        },
        {
            id: 6,
            title: 'Суббота',
            shortTitle: 'Сб',
            value: '08:00 - 20:00',
        },
        {
            id: 7,
            title: 'Воскресенье',
            shortTitle: 'Вс',
            value: 'Выходной',
        },

    ]



    private _isLoading: boolean = true;
    private _error: AxiosError | null = null
    get promoBanner() {
        return this._generalData.promoBanner;
    }
    get headerLinks() {
        return this._headerLinks
    }
    get contactLinks() {
        return this._contactLinks
    }
    get homeSlider() {
        return this._homeSlider
    }
    get advantages() {
        return this._advantages
    }
    get addressMap() {
        return this._generalData.addressMap
    }
    get officeImages() {
        return this._officeImages
    }

    get howToGetVideo() {
        return this._generalData.howToGetVideo
    }

    get howToGetPreview() {
        return this._generalData.howToGetPreview
    }
    get aboutMe() {
        return this._generalData.aboutMe
    }
    get workSchedule() {
        return this._workSchedule
    }

    get isLoading() {
        return this._isLoading
    }
    get error() {
        return this._error
    }
    changeWorkSchedule(workDay: IWorkSchedule) {
        this._workSchedule = this.updateArray(this._workSchedule, workDay, 'id');
    }

    changeContactLink(contactLink: IContactLink & ICreateContactLink) {
        const { id, title, link, imageFile, imageLightFile, imageSrc, imageLightSrc } = contactLink;
        const newContactLink = {
            id,
            title,
            link,
            imageLightSrc: this.createImageSrc(imageLightFile, imageLightSrc),
            imageSrc: this.createImageSrc(imageFile, imageSrc),
        };
        this._contactLinks = this.updateArray(this._contactLinks, newContactLink, 'id');
    }

    addContactLink({ title, link, imageFile, imageLightFile }: ICreateContactLink): IContactLink {
        const newContactLink: IContactLink = {
            id: Date.now(),
            title,
            link,
            imageLightSrc: this.createImageSrc(imageLightFile),
            imageSrc: this.createImageSrc(imageFile),
        };
        this._contactLinks.push(newContactLink);
        return newContactLink;
    }

    deleteContactLink(id: number) {
        this._contactLinks = this._contactLinks.filter(link => link.id !== id);
    }

    changeAdvantages(advantage: IAdvantages & ICreateAdvantages) {
        const { id, title, description, imageFile, imageSrc } = advantage;
        const newAdvantage = {
            id,
            title,
            description,
            imageSrc: this.createImageSrc(imageFile, imageSrc),
        };
        this._advantages = this.updateArray(this._advantages, newAdvantage, 'id');
    }

    addAdvantage({ title, description, imageFile }: ICreateAdvantages): IAdvantages {
        const newAdvantage: IAdvantages = {
            id: Date.now(),
            title,
            description,
            imageSrc: this.createImageSrc(imageFile),
        };
        this._advantages.push(newAdvantage);
        return newAdvantage;
    }

    deleteAdvantages(id: number) {
        this._advantages = this._advantages.filter(advantage => advantage.id !== id);
    }



    
    setAddressMap(address: string){
        this._generalData.addressMap = address
    }

    setAboutMe(aboutMe: string){
        this._generalData.aboutMe = aboutMe
    }


    private setIsLoading(isLoading: boolean) {
        this._isLoading = isLoading
    }

    private setErrore(error: AxiosError) {
        this._error = error
    }

    private createImageSrc(imageFile?: File, imageSrc?: string): string {
        return imageFile ? URL.createObjectURL(imageFile) : imageSrc || '';
    }

    private updateArray<T>(array: T[], item: T, idKey: keyof T): T[] {
        return array.map(existingItem => (
            existingItem[idKey] === item[idKey] ? { ...existingItem, ...item } : existingItem
        ));
    }


}
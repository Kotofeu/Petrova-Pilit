import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx'
import {
    ABOUT_ROUTE,
    ADMIN_ROUTE,
    HOME_ROUTE,
    REVIEWS_ROUTE,
    USER_ROUTE,
    WORKS_ROUTE
} from '../utils/const/routes';

import HowToGetMp4 from '../assets/video/howToGet.mp4';
import HowToGet from '../assets/video/howToGet.png';

import Instagram from '../assets/icons/social/instagram.svg'
import Whatsapp from '../assets/icons/social/whatsapp.svg'
import Map from '../assets/icons/social/map.svg'

import sliderImage1 from '../assets/images/12_11zon.jpg'
import sliderImage2 from '../assets/images/background/1.png'
import sliderImage3 from '../assets/images/background/2.png'

import fast from '../assets/icons/fast.svg'
import quality from '../assets/icons/quality.svg'
import comfortable from '../assets/icons/comfortable.svg'
import beautifully from '../assets/icons/beautifully.svg'
import { IImages } from '.';
import { IAdvantageValue, IContactsValue, IMainInfoValue } from '../http';


export interface ILink {
    name?: string;
    link?: string;
}

export interface IContactLink extends IContactsValue {
    id: number;
}
export interface ICreateContactLink extends IContactsValue {
    imageFile?: File;
}

export interface IAdvantages extends IAdvantageValue {
    id: number;
}

export interface ICreateAdvantages extends IAdvantageValue {
    iconFile?: File;
    imageFile?: File;
}


export interface IWorkSchedule {
    id: number;
    name?: string;
    shortName?: string;
    value?: string;
}

export class ApplicationStore {
    constructor() {
        makeAutoObservable(this, {}, { deep: true })
    }
    private _headerLinks: ILink[] = [
        { name: "Главная", link: HOME_ROUTE },
        { name: "Обо мне", link: ABOUT_ROUTE },
        { name: "Мои работы", link: WORKS_ROUTE },
        { name: "Отзывы", link: REVIEWS_ROUTE }
    ];
    private _headerAdminLinks: ILink[] = [
        { name: "Клиенты", link: USER_ROUTE },
        { name: "Админка", link: ADMIN_ROUTE }
    ]
    private _generalData: IMainInfoValue = {
        promoBanner: 'Скидка 50% на первый маникюр!',
        addressMap: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2304.608889733823!2d20.522914741385073!3d54.71650388760703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e3160bea68a3bf%3A0x47e628c68d0b71c0!2z0YPQuy4g0JHQvtGC0LrQuNC90LAsIDLQkCwg0JrQsNC70LjQvdC40L3Qs9GA0LDQtCwg0JrQsNC70LjQvdC40L3Qs9GA0LDQtNGB0LrQsNGPINC-0LHQuy4sIDIzNjAxNg!5e0!3m2!1sru!2sru!4v1724979269501!5m2!1sru!2sru',
        aboutMe: `Здравствуйте дамы и господа
Сертифицированный и ответственный мастер Hacтacья приглашает вас на маникюр 👐
Прелесть маникюра со мной:
☝️ никакого страха, дискомфорта, болeвыx ощущений; стeрильно и бeзoпaснo
💪 вcе включено в cтoимоcть по комплексу: cнятиe, рeмoнт, пoстaнoвкa формы, укрепление + выравнивание, дизайн (френч, слайдеры, втирка, стемпинг, блестки)
🗣️ нахожусь в центре города; вода/чай/сладкое предложу в процессе
🤤только тонкое и прочное покрытие, никаких плюшек, кривых квадратов, ран на кутикуле и пропилов на ногтях (терпеть их не могу)`,
        howToGetPreview: HowToGet,
        howToGetVideo: HowToGetMp4,

    }
    private _contactLinks: IContactLink[] = [
        {
            id: 1,
            name: 'WhatsApp',
            link: 'https://wa.me/+79814621828',
            imageSrc: Whatsapp,
        },
        {
            id: 2,
            name: 'Instagram',
            link: 'https://www.instagram.com/petrova.pilit?utm_source=qr',
            imageSrc: Instagram,
        },
        {
            id: 3,
            name: 'Калининград, Боткина 2А',
            link: 'https://yandex.ru/maps/22/kaliningrad/house/ulitsa_botkina_2a/ZkkYcwVkSUUAQFtufXtwd3phYw==/?ll=20.524086%2C54.716129&pt=20.5805%2C54.7104&utm_medium=mapframe&utm_source=maps&z=17.75',
            imageSrc: Map,
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
            iconSrc: fast,
            name: 'Быстро',
            description: 'Скорость и стиль — ваши ногти в лучшем виде за мгновение!',
            imageSrc: sliderImage1,
        },
        {
            id: 2,
            iconSrc: quality,
            name: 'Качественно',
            description: 'Качество на первом месте — ваши ногти заслуживают лучшего!',
            imageSrc: sliderImage2,

        },
        {
            id: 3,
            iconSrc: beautifully,
            name: 'Красиво',
            description: 'Красота, которая вдохновляет — ваши ногти засияют как никогда прежде!',
            imageSrc: sliderImage1,

        },
        {
            id: 4,
            iconSrc: comfortable,
            name: 'Комфортно',
            description: 'Релакс и стиль — наслаждайтесь маникюром в комфортной обстановке!',
            imageSrc: sliderImage3,

        }
    ]
    private _workSchedule: IWorkSchedule[] = [
        {
            id: 1,
            name: 'Понеденьник',
            shortName: 'Пн',
            value: '08:00 - 20:00',
        },
        {
            id: 2,
            name: 'Вторник',
            shortName: 'Вт',
            value: '08:00 - 20:00',
        },
        {
            id: 3,
            name: 'Среда',
            shortName: 'Ср',
            value: '08:00 - 20:00',
        },
        {
            id: 4,
            name: 'Четверг',
            shortName: 'Чт',
            value: '08:00 - 20:00',
        },
        {
            id: 5,
            name: 'Пятница',
            shortName: 'Пт',
            value: '08:00 - 20:00',
        },
        {
            id: 6,
            name: 'Суббота',
            shortName: 'Сб',
            value: '08:00 - 20:00',
        },
        {
            id: 7,
            name: 'Воскресенье',
            shortName: 'Вс',
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
    get headerAdminLinks() {
        return this._headerAdminLinks
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

    changeHowToGetPreview(preview: File) {
        this._generalData.howToGetPreview = this.createImageSrc(preview)
    }
    changeHowToGetVideo(video: File) {
        this._generalData.howToGetVideo = this.createImageSrc(video)
    }
    changePromoBanner(text: string) {
        this._generalData.promoBanner = text
    }
    changeWorkSchedule(workDay: IWorkSchedule) {
        this._workSchedule = this.updateArray(this._workSchedule, workDay, 'id');
    }
    changeContactLink(contactLink: IContactLink & ICreateContactLink) {
        const { id, name, link, imageFile, imageSrc } = contactLink;
        const newContactLink = {
            id,
            name,
            link,
            imageSrc: this.createImageSrc(imageFile, imageSrc),
        };
        this._contactLinks = this.updateArray(this._contactLinks, newContactLink, 'id');
    }

    addContactLink({ name, link, imageFile }: ICreateContactLink): IContactLink {
        const newContactLink: IContactLink = {
            id: Date.now(),
            name,
            link,
            imageSrc: this.createImageSrc(imageFile),
        };
        this._contactLinks.push(newContactLink);
        return newContactLink;
    }

    deleteContactLink(id: number) {
        this._contactLinks = this._contactLinks.filter(link => link.id !== id);
    }

    changeAdvantages(advantage: IAdvantages & ICreateAdvantages) {
        const { id, name, description, imageFile, imageSrc, iconSrc, iconFile } = advantage;
        const newAdvantage = {
            id,
            name,
            description,
            imageSrc: this.createImageSrc(imageFile, imageSrc),
            iconSrc: this.createImageSrc(iconFile, iconSrc)
        };
        this._advantages = this.updateArray(this._advantages, newAdvantage, 'id');
    }

    addAdvantage({ name, description, imageFile, iconFile }: ICreateAdvantages): IAdvantages {
        const newAdvantage: IAdvantages = {
            id: Date.now(),
            name,
            description,
            imageSrc: this.createImageSrc(imageFile),
            iconSrc: this.createImageSrc(iconFile),
        };
        this._advantages.push(newAdvantage);
        return newAdvantage;
    }

    deleteAdvantages(id: number) {
        this._advantages = this._advantages.filter(advantage => advantage.id !== id);
    }




    addMainSlider(image: File): IImages {

        const newImage: IImages = {
            id: -Math.random(),
            imageSrc: this.createImageSrc(image),
        };
        this._homeSlider.push(newImage);
        return newImage;
    }

    deleteMainSlider(id: number) {
        this._homeSlider = this._homeSlider.filter(image => image.id !== id);
    }


    addOfficeImage(image: File): IImages {

        const newImage: IImages = {
            id: -Math.random(),
            imageSrc: this.createImageSrc(image),
        };
        this._officeImages.push(newImage);
        return newImage;
    }

    deleteOfficeImage(id: number) {
        this._officeImages = this._officeImages.filter(image => image.id !== id);
    }


    setAddressMap(address: string) {
        this._generalData.addressMap = address
    }

    setAboutMe(aboutMe: string) {
        this._generalData.aboutMe = aboutMe
    }


    private setIsLoading(isLoading: boolean) {
        this._isLoading = isLoading
    }

    private setErrore(error: AxiosError) {
        this._error = error
    }

    private createImageSrc(imageFile?: File, imageSrc?: string | null): string {
        return imageFile ? URL.createObjectURL(imageFile) : imageSrc || '';
    }

    private updateArray<T>(array: T[], item: T, idKey: keyof T): T[] {
        return array.map(existingItem => (
            existingItem[idKey] === item[idKey] ? { ...existingItem, ...item } : existingItem
        ));
    }


}
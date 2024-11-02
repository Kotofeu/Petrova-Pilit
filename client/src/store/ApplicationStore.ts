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
import defaultOfficeImage1 from '../assets/images/defaultImages/office/office_1.jpeg'
import defaultOfficeImage2 from '../assets/images/defaultImages/office/office_2.jpeg'
import defaultOfficeImage3 from '../assets/images/defaultImages/office/office_3.jpeg'
import defaultSliderImage from '../assets/images/defaultImages/mainSlider/main_slider_1.jpeg'

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
    name?: string | null;
    shortName?: string | null;
    value?: string | null;
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
        promoBanner: null,
        addressMap: null,
        aboutMe: null,
        howToGetPreview: null,
        howToGetVideo: null,
    }
    private _contactLinks: IContactLink[] = []
    private _homeSlider: IImages[] = []
    private _defaultHomeSlider: IImages[] = [
        {
            id: -1,
            imageSrc: defaultSliderImage
        }
    ]
    private _officeImages: IImages[] = []
    private _defaultOfficeImages: IImages[] = [
        {
            id: -1,
            imageSrc: defaultOfficeImage1
        },
        {
            id: -2,
            imageSrc: defaultOfficeImage2
        },
        {
            id: -3,
            imageSrc: defaultOfficeImage3
        }
    ]
    private _advantages: IAdvantages[] = []
    private _workSchedule: IWorkSchedule[] = [
        {
            id: 1,
            name: "Понедельник",
            shortName: "Пн."
        },
        {
            id: 2,
            name: "Вторник",
            shortName: "Вт."
        },
        {
            id: 3,
            name: "Среда",
            shortName: "Ср."
        },
        {
            id: 6,
            name: "Суббота",
            shortName: "Сб."
        },
        {
            id: 7,
            name: "Воскресенье",
            shortName: "Вс."
        },
        {
            id: 4,
            name: "Четверг",
            shortName: "Чт."
        },
        {
            id: 5,
            name: "Пятница",
            shortName: "Пт."
        }
    ]


    private _error: string | null = null


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
    get defaultHomeSlider() {
        return this._defaultHomeSlider
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
    get defaultOfficeImages() {
        return this._defaultOfficeImages
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

    get error() {
        return this._error
    }

    setContactsLinks(contactLinks: IContactLink[]) {
        this._contactLinks = contactLinks
    }
    setSliderImages(sliderImages: IImages[]) {
        this._homeSlider = sliderImages
    }
    setOfficeImages(officeImages: IImages[]) {
        this._officeImages = officeImages
    }
    setAdvantages(advantages: IAdvantages[]) {
        this._advantages = advantages
    }
    setWorkSchedule(workSchedule: IWorkSchedule[]) {
        this._workSchedule = workSchedule
    }
    setGeneralData(generalData: IMainInfoValue) {
        this._generalData = generalData
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

    setError(error: string) {
        if (error !== this._error) {
            this._error = error
        }
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
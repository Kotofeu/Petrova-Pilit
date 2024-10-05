import axios from 'axios'

import {ApplicationStore} from './ApplicationStore'
import {WorksStore} from './WorksStore'
import {ServicesStore} from './ServicesStore'
import { ReviewsStore } from './ReviewsStore'
import { UserStore } from './UserStore'
import { EmailConfirmStore } from './EmailConfirmStore'

export type {ILink} from './ApplicationStore'
export type {IReviews} from './ReviewsStore'
export type {IUser} from './UserStore'
export type {IService} from './ServicesStore'
export type {IWorks} from './WorksStore'


export interface IGetAllJSON<T> {
    count: number;
    rows: T[];
}
export interface IImages {
    id: number;
    imageSrc: string;
    title?: string;
    description?: string;

}

export const applicationStore = new ApplicationStore()
export const worksStore = new WorksStore()
export const servicesStore = new ServicesStore()
export const reviewsStore = new ReviewsStore()
export const userStore = new UserStore()
export const emailConfirmStore = new EmailConfirmStore()
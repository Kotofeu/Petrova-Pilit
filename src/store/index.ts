import axios from 'axios'

import {ApplicationStore} from './ApplicationStore'
import {WorksStore} from './WorksStore'
import {ServicesStore} from './ServicesStore'
import { ReviewsStore } from './ReviewsStore'

export type {ILink} from './ApplicationStore'
export type {IReviews} from './ReviewsStore'
export type {IUser} from './ReviewsStore'
export type {IService} from './ServicesStore'
export type {IOthersWorkImage} from './WorksStore'
export type {IWorks} from './WorksStore'


export const applicationStore = new ApplicationStore()
export const worksStore = new WorksStore()
export const servicesStore = new ServicesStore()
export const reviewsStore = new ReviewsStore()
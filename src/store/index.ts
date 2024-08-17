import axios from 'axios'

import {ApplicationStore} from './ApplicationStore'
import {WorksStore} from './WorksStore'
import {ServicesStore} from './ServicesStore'

export type {ILink} from './ApplicationStore'
export const applicationStore = new ApplicationStore()
export const worksStore = new WorksStore()
export const servicesStore = new ServicesStore()
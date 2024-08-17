import axios from 'axios'

import {ApplicationStore} from './ApplicationStore'
import {WorksStore} from './WorksStore'

export type {ILink} from './ApplicationStore'
export const applicationStore = new ApplicationStore()
export const worksStore = new WorksStore()
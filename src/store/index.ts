import axios from 'axios'

import {ApplicationStore} from './ApplicationStore'

export type {ILink} from './ApplicationStore'
export const applicationStore = new ApplicationStore()
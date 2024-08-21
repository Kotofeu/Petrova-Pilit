import {Outlet} from 'react-router-dom'

import {Header} from '../modules/Header'
import { Footer } from '../modules/Footer'

export const Layout = () => {
  return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
  )
}

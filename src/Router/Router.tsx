import {Navigate} from 'react-router'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import {Layout} from './Layout'
import { ABOUT_ROUTE, CONTACT_ROUTE, HOME_ROUTE, WORKS_ROUTE } from '../utils/const/routes'
import Home from '../pages/Home'

export const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path={HOME_ROUTE} element = {<Layout/>}>
                <Route index element = {<Home/>}/>
                <Route path={ABOUT_ROUTE} element = {<></>}/>
                <Route path={WORKS_ROUTE} element = {<></>}/>
                <Route path={CONTACT_ROUTE} element = {<></>}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout } from './Layout'
import {
  ABOUT_ROUTE,
  ADMIN_ROUTE,
  HOME_ROUTE,
  POLICY_ROUTE,
  REVIEWS_ROUTE,
  SETTINGS_ROUTE,
  USER_ROUTE,
  WORKS_ROUTE
} from '../utils/const/routes'
import Home from '../pages/Home'
import ScrollToTop from '../components/ScrollToTop'
import AboutMe from '../pages/AboutMe'
import Works from '../pages/Works'
import Work from '../pages/Work'
import Reviews from '../pages/Reviews'
import Policy from '../pages/Policy'
import Settings from '../pages/Settings'
import User from '../pages/User'
import Users from '../pages/Users'
import Admin from '../pages/Admin'

export const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={HOME_ROUTE} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ABOUT_ROUTE} element={<AboutMe />} />
          <Route path={WORKS_ROUTE}>
            <Route index element={<Works />} />
            <Route path=':id' element={<Work />} />
          </Route>
          <Route path={REVIEWS_ROUTE} element ={<Reviews />}/>
          <Route path={POLICY_ROUTE} element={<Policy />} />
          <Route path={SETTINGS_ROUTE} element={<Settings />} />
          <Route path={USER_ROUTE}>
            <Route index element={<Users />} />
            <Route path=':id' element={<User />} />
          </Route>
          <Route path={ADMIN_ROUTE} element ={<Admin />}/>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

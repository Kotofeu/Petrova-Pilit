import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout } from './Layout'
import { 
  ABOUT_ROUTE, 
  CONTACT_ROUTE, 
  HOME_ROUTE, 
  POLICY_ROUTE, 
  REVIEWS_ROUTE, 
  WORKS_ROUTE 
} from '../utils/const/routes'
import Home from '../pages/Home'
import ScrollToTop from '../components/ScrollToTop'
import AboutMe from '../pages/AboutMe'
import Works from '../pages/Works'

export const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={HOME_ROUTE} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ABOUT_ROUTE} element={<AboutMe/>} />
          <Route path={WORKS_ROUTE}>
            <Route index  element={<Works/>} />
            <Route path=':id' element={<div style={{ height: '100vh' }}>DFJKDSAOFLJKDS</div>} />
          </Route>
          <Route path={REVIEWS_ROUTE}>
            <Route index  element={<div style={{ height: '100vh' }}>DFJKDSAOFLJKDS</div>} />
            <Route path=':id' element={<div style={{ height: '100vh' }}>DFJKDSAOFLJKDS</div>} />
          </Route>
          <Route path={CONTACT_ROUTE}  element={<div style={{ height: '100vh' }}></div>}/>
          <Route path={POLICY_ROUTE}  element={<div style={{ height: '100vh' }}></div>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

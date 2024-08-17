import { Navigate } from 'react-router'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Layout } from './Layout'
import { ABOUT_ROUTE, CONTACT_ROUTE, HOME_ROUTE, WORKS_ROUTE } from '../utils/const/routes'
import Home from '../pages/Home'
import ScrollToTop from '../components/ScrollToTop'

export const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={HOME_ROUTE} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ABOUT_ROUTE} element={<div style={{ height: '200vh' }}></div>} />
          <Route path={WORKS_ROUTE}>
            <Route index  element={<div style={{ height: '100vh' }}>DFJKDSAOFLJKDS</div>} />
            <Route path=':id' element={<div style={{ height: '100vh' }}>DFJKDSAOFLJKDS</div>} />
          </Route>
          <Route path={CONTACT_ROUTE}  element={<div style={{ height: '100vh' }}></div>}/>
          <Route path='*' element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

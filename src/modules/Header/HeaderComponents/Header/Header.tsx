import React from 'react'
import classes from './Header.module.scss'

import { applicationStore } from '../../../../store'
import { HeaderLink } from '../HeaderLinks/HeaderLink'
import Button from '../../../../UI/Button/Button'
import { NavLink } from 'react-router-dom'
import { HOME_ROUTE } from '../../../../utils/const/routes'

export const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.header__banner}>
        <h3 className={classes.header__bannerText}>{applicationStore.promoBanner}</h3>
      </div>
      <nav className={classes.header__navigation}>
        <div className={classes.header__navigationInner}>
          <NavLink to={HOME_ROUTE} className={classes.header__logo}>
            Ppilit
          </NavLink>
          <div className={classes.header__navigationLinks}>
            {
              applicationStore.headerLinks.map(link =>
               <HeaderLink {...link} className={classes.header__link} key={link.title}/>
              )
            }
          </div>
          <div className={classes.header__buttons}>
            <Button className={classes.header__button}>ЗАПИСАТЬСЯ НА ПРИЁМ</Button>
          </div>
        </div>
      </nav>
    </header>
  )
}

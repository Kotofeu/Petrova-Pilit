import { useEffect, useState, FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';

import { applicationStore } from '../../../../store'
import { HeaderLink, LinkType } from '../HeaderLinks/HeaderLink'
import Button from '../../../../UI/Button/Button'
import { HOME_ROUTE } from '../../../../utils/const/routes'
import classConnection from '../../../../utils/function/classConnection';

import classes from './Header.module.scss'

export const Header: FC = observer(() => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const onLinkClick = useCallback(() => {
    window.scrollTo(0, 0);
  }, [])
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setScrollingDown(currentScrollY > lastScrollY);
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  return (
    <header className={classes.header}>
      <motion.div className={
        classConnection(
          classes.header__banner,
          scrollingDown ? classes.header__banner_hidden : ''
        )}
        initial={{ opacity: 1 }}                   
        animate={{ opacity: scrollingDown ? 0 : 1 }}
      >
        <h3 className={classes.header__bannerText}>{applicationStore.promoBanner}</h3>
      </motion.div>
      <nav className={
        classConnection(
          classes.header__navigation,
          scrollingDown ? classes.header__navigation_upper : ''
        )}
      >
        <div className={classes.header__navigationInner}>
          <HeaderLink link={HOME_ROUTE} title='Ppilit' className={classes.header__logo} />
          <div className={classes.header__navigationLinks}>
            {
              applicationStore.headerLinks.map(link =>
                <HeaderLink {...link} className={classes.header__link} key={link.title} type={LinkType.underline} onClick={onLinkClick}/>
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
})
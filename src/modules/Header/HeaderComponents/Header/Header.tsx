import { useEffect, useState, FC, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';

import { applicationStore, registrationStore, userStore } from '../../../../store'
import { HeaderLink, LinkType } from '../HeaderLinks/HeaderLink'
import Button from '../../../../UI/Button/Button'
import { HOME_ROUTE } from '../../../../utils/const/routes'

import classes from './Header.module.scss'
import { HeaderUser } from '../HeaderUser/HeaderUser';
import { classConnection } from '../../../../utils/function';
import { HeaderUserModal } from '../HeaderUserModal/HeaderUserModal';

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
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const modalHandler = useCallback((isOpen: boolean) => {
    if (userStore.user) {
      if (isOpen) {
        setIsOpen(true)
        document.body.style.overflowY = 'hidden';
      }
      else {
        setIsOpen(false)
        document.body.style.overflowY = 'auto';
      }
    }
    else {
      registrationStore.setIsOpen(true)
    }

  }, [userStore.user])
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  const isHiddenBanner: boolean = scrollingDown || !applicationStore.promoBanner //|| userStore.isAuth под вопросом
  return (
    <header className={classes.header}>
      <motion.div className={
        classConnection(
          classes.header__banner,
          isHiddenBanner ? classes.header__banner_hidden : ''
        )}
      >
        <h3 className={classes.header__bannerText}>{ userStore.isAuth? 'Приходите, с удовольствием приму вас ещё' :applicationStore.promoBanner}</h3>
      </motion.div>
      <nav className={
        classConnection(
          classes.header__navigation,
          isHiddenBanner ? classes.header__navigation_upper : ''
        )}
      >
        <div className={classes.header__navigationInner}>
          <HeaderLink link={HOME_ROUTE} title='Ppilit' className={classes.header__logo} />
          <div className={classes.header__navigationLinks}>
            {
              applicationStore.headerLinks.map(link =>
                <HeaderLink {...link} className={classes.header__link} key={link.title} type={LinkType.underline} onClick={onLinkClick} />
              )
            }
          </div>
          <div className={classes.header__buttons}>
            <HeaderUser
              className={classes.header__user}
              name={userStore.user?.name}
              imageSrc={userStore.user?.imageSrc}
              isAdmin={userStore.isAdmin}
              isAuth={userStore.isAuth}
              openModal={modalHandler}
            />
            {
              userStore.isAuth
              && <HeaderUserModal
                user={userStore.user}
                isOpen={isOpen}
                closeModal={modalHandler}
              />
            }
          </div>
        </div>
      </nav>
    </header>
  )
})
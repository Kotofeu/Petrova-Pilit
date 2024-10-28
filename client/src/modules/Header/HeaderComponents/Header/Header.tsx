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
import { HeaderAsideModal } from '../HeaderAsideModal/HeaderAsideModal';

const bannerForAuth = 'Приходите, с удовольствием приму вас ещё'
export const Header: FC = observer(() => {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false)

  const onLinkClick = useCallback(() => {
    window.scrollTo(0, 0);
    setIsUserOpen(false)
    setIsNavOpen(false)
    document.body.style.overflowY = 'auto';
  }, [])
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setScrollingDown(currentScrollY > lastScrollY);
    setLastScrollY(currentScrollY);
  };
  const userModalHandler = useCallback((isOpen: boolean) => {
    if (userStore.user) {
      if (isOpen) {
        setIsUserOpen(true)
        document.body.style.overflowY = 'hidden';
      }
      else {
        setIsUserOpen(false)
        document.body.style.overflowY = 'auto';
      }
    }
    else {
      registrationStore.setIsOpen(true)
    }

  }, [userStore.user])

  const burgerModalHandler = useCallback((isOpen: boolean) => {
    if (isOpen) {
      setIsNavOpen(true)
      document.body.style.overflowY = 'hidden';
    }
    else {
      setIsNavOpen(false)
      document.body.style.overflowY = 'auto';
    }

  }, [userStore.user])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);
  const isHiddenBanner: boolean = scrollingDown
  return (
    <header className={classes.header}>
      <motion.div className={
        classConnection(
          classes.header__banner,
          isHiddenBanner ? classes.header__banner_hidden : ''
        )}
      >
        <h3 className={classes.header__bannerText}>{userStore.isAuth ? bannerForAuth : applicationStore.promoBanner || bannerForAuth}</h3>
      </motion.div>
      <nav className={
        classConnection(
          classes.header__navigation,
          isHiddenBanner ? classes.header__navigation_upper : ''
        )}
      >
        <div className={classes.header__navigationInner}>
          <HeaderLink link={HOME_ROUTE} name='Ppilit' className={classes.header__logo} />
          <div className={classes.header__navigationLinks}
          >
            {
              applicationStore.headerLinks.map(link =>
                <HeaderLink {...link} className={classes.header__link} key={link.name} type={LinkType.underline} onClick={onLinkClick} />
              )
            }
            {
              userStore.isAdmin && applicationStore.headerAdminLinks.map(link =>
                <HeaderLink {...link} className={classes.header__link} key={link.name} type={LinkType.underline} onClick={onLinkClick} />
              )
            }
          </div>
          <div className={classes.header__buttons}>
            <Button
              className={classes.header__burger}
              title='Открыть навигацию'
              onClick={() => burgerModalHandler(true)}
            >
              <span />
              <span />
              <span />
            </Button>
            <HeaderUser
              className={classes.header__user}
              name={userStore.user?.name || ''}
              imageSrc={userStore.user?.imageSrc || ''}
              isAdmin={userStore.isAdmin}
              isAuth={userStore.isAuth}
              openModal={userModalHandler}
            />
            {
              userStore.isAuth
              && <HeaderUserModal
                user={userStore.user}
                isOpen={isUserOpen}
                closeModal={userModalHandler}
              />
            }
            <HeaderAsideModal
              isOpen={isNavOpen}
              closeModal={burgerModalHandler}
            >
              <div className={classes.header__burgerLinks}>
                {
                  applicationStore.headerLinks.map(link =>
                    <HeaderLink
                      {...link}
                      className={classes.header__burgerLink}
                      key={link.name}
                      onClick={onLinkClick}
                    />
                  )
                }
              </div>
              <p className={classes.header__burgerBanner}>
                {userStore.isAuth ? bannerForAuth : applicationStore.promoBanner}
              </p>
            </HeaderAsideModal>
          </div>
        </div>
      </nav>
    </header>
  )
})
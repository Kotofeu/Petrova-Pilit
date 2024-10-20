import { memo, FC, useCallback } from 'react'
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion'
import defaultImage from '../../../../assets/icons/User-icon.svg'
import { IUser, userStore } from '../../../../store';
import classes from './HeaderUserModal.module.scss'
import { userLevel } from '../../../../utils/function';
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton';
import { NavLink } from 'react-router-dom';
import { ID_PARAM, IS_WRITING_PARAM, REVIEWS_ROUTE, SETTINGS_ROUTE, USER_ROUTE } from '../../../../utils/const/routes';
import Button from '../../../../UI/Button/Button';
import { WEBSITE_ADDRESS } from '../../../../utils/const/main';
import { useMessage } from '../../../MessageContext';
import { HeaderAsideModal } from '../HeaderAsideModal/HeaderAsideModal';

interface IHeaderUser {
    user: IUser | null;
    isOpen: boolean;
    closeModal: (isOpen: boolean) => void;
}

export const HeaderUserModal: FC<IHeaderUser> = memo(({ user, isOpen, closeModal }) => {
    const { addMessage } = useMessage();
    const onLinkClick = useCallback(() => {
        closeModal(false)
        window.scrollTo(0, 0);
    }, [])
    const onExitClick = useCallback(() => {
        addMessage('Ждём вашего возвращения!', 'complete')
        closeModal(false)
        userStore.setUser(null)
        window.scrollTo(0, 0);
    }, [])
    return (
        <HeaderAsideModal isOpen={isOpen} closeModal={closeModal}>
            <div className={classes.headerUserModal__imageBox}>
                <img
                    className={classes.headerUserModal__image}
                    src={user?.imageSrc || defaultImage}
                    alt={user?.name || 'Ваш аккаунт'}
                />
            </div>
            <p className={classes.headerUserModal__level}>
                {userLevel(user?.visitsNumber)}
            </p>
            <p className={classes.headerUserModal__name}>
                {user?.name}
            </p>
            <nav className={classes.headerUserModal__content}>
                <p
                    className={classes.headerUserModal__navItem}
                >
                    {`Количество посещений: ${user?.visitsNumber || 0}`}
                </p>
                <NavLink
                    className={classes.headerUserModal__navLink}
                    to={SETTINGS_ROUTE}
                    onClick={onLinkClick}
                >
                    Настройки
                </NavLink>
                {
                    user?.review?.id
                        ? <NavLink
                            className={classes.headerUserModal__navLink}
                            to={`${REVIEWS_ROUTE}/?${ID_PARAM}=${user?.review?.id}`}
                            onClick={onLinkClick}
                        >
                            Ваш отзыв
                        </NavLink>
                        : <NavLink
                            className={classes.headerUserModal__navLink}
                            to={`${REVIEWS_ROUTE}/?${IS_WRITING_PARAM}=${true}`}
                            onClick={onLinkClick}
                        >
                            Написать отзыв
                        </NavLink>
                }

                <Button
                    className={classes.headerUserModal__navButton}
                    onClick={onExitClick}
                >
                    Выйти
                </Button>

            </nav>
            <div
                className={classes.headerUserModal__qrBox}
            >
                <p className={classes.headerUserModal__qrText}>
                    Покажите QR-код мастеру
                </p>
                <QRCodeSVG
                    value={`${WEBSITE_ADDRESS}${USER_ROUTE}/${user?.id}`}
                    title={"Ваш QR Code"}
                    size={260}
                    fgColor={"#000000"}
                    level={"L"}
                    marginSize={0}
                />
                <p className={classes.headerUserModal__qrText}>
                    или сделайте скриншот
                </p>
            </div>

        </HeaderAsideModal>
    )
})
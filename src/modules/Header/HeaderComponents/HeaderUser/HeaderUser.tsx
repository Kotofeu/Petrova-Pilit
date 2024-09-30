import { memo, FC, useEffect } from 'react'
import defaultImage from '../../../../assets/icons/User-icon.svg'
import classes from './HeaderUser.module.scss'
import { classConnection } from '../../../../utils/function';
interface IHeaderUser {
    className?: string;
    name?: string;
    imageSrc?: string;
    isAdmin: boolean;
    isAuth: boolean;
    openModal: (isOpen: boolean) => void;
}
export const HeaderUser: FC<IHeaderUser> = memo(({
    className,
    name,
    imageSrc,
    isAuth,
    openModal
}) => {
    return (
        <div className={classConnection(classes.headerUser, className)}>
            <div
                className={classes.headerUser__imageBox}
                title={!isAuth ? 'Войти' : name}
                onClick={() => openModal(true)}
            >
                <img
                    className={classes.headerUser__image}
                    src={imageSrc || defaultImage}
                    alt={name || 'Ваш аккаунт'}
                />
            </div>
        </div>
    )
})

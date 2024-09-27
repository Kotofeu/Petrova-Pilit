import { memo, FC, useEffect } from 'react'
import defaultImage from '../../../../assets/icons/User-icon.svg'
import classes from './HeaderUser.module.scss'
import { IUser } from '../../../../store'
import { classConnection } from '../../../../utils/function';
interface IHeaderUser {
    className?: string;
    user: IUser | null;
    isAdmin: boolean;
    isAuth: boolean;
    openModal: (isOpen: boolean) => void;
}
export const HeaderUser: FC<IHeaderUser> = memo(({
    className,
    user,
    isAuth,
    openModal
}) => {
    return (
        <div className={classConnection(classes.headerUser, className)}>
            <div
                className={classes.headerUser__imageBox}
                title={!isAuth ? 'Войти' : user?.name}
                onClick={() => openModal(true)}
            >
                <img
                    className={classes.headerUser__image}
                    src={user?.imageSrc || defaultImage}
                    alt={user?.name || 'Ваш аккаунт'}
                />
            </div>
        </div>
    )
})
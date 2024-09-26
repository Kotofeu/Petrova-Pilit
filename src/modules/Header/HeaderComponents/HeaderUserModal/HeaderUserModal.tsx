import { memo, FC } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import defaultImage from '../../../../assets/icons/User-icon.svg'
import { IUser } from '../../../../store';
import classes from './HeaderUserModal.module.scss'
import { userLevel } from '../../../../utils/function';
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton';

interface IHeaderUser {
    user: IUser | null;
    isOpen: boolean;
    closeModal: () => void;
}

export const HeaderUserModal: FC<IHeaderUser> = memo(({ user, isOpen, closeModal }) => {
    return (
        <AnimatePresence>
            {
                isOpen
                && <motion.div
                    className={classes.headerUserModal}
                    animate={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: '100%' }}
                    exit={{ opacity: 0, x: '100%' }}
                    transition={{ power: 0.1 }}
                >
                    <div className={classes.headerUserModal__inner}>
                        <ControllerButton
                            className={classes.headerUserModal__close}
                            type='delete'
                            title='Закрыть окно'
                            onClick={closeModal}
                        />

                        <div className={classes.headerUserModal__imageBox}>
                            <img
                                className={classes.headerUserModal__image}
                                src={user?.imageSrc || defaultImage}
                                alt={user?.name || 'Ваш аккаунт'}
                            />
                            <ControllerButton
                                className={classes.headerUserModal__edit}
                                type='edit'
                                title='Редактировать фото'
                                onClick={() => console.log('Редактирование фото')}
                            />
                        </div>
                        <p className={classes.headerUserModal__level}>
                            {userLevel(user?.visitsNumber)}
                        </p>
                        <div className={classes.headerUserModal__content}>
                            <h4 className={classes.headerUserModal__name}>
                                {user?.name}
                            </h4>
                            <p>{`Количество посещений: ${user?.visitsNumber || 0}`}</p>
                            <p>Ваш отзыв</p>
                            <p>Редактирование профиля</p>
                            <p>Выйти</p>
                            <p>QR-kode</p>
                        </div>
                    </div>
                </motion.div>
            }

        </AnimatePresence>)
})
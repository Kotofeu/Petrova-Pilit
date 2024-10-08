import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { IUser, userStore } from '../../../../store';

import { classConnection, userLevel } from '../../../../utils/function';
import { useMessage } from '../../../MessageContext';
import useDebounce from '../../../../utils/hooks/useDebounce';

import ControllerButton from '../../../../UI/ControllerButton/ControllerButton';
import ModalOk from '../../../../components/Modal/ModalOk';
import Input from '../../../../UI/Input/Input';
import Counter, { CounterButtonType } from '../../../../components/Counter/Counter';
import Button from '../../../../UI/Button/Button';

import defaultUSerIcon from '../../../../assets/icons/User-icon.svg';
import classes from './UserCard.module.scss';


interface IUserCard {
    user?: IUser
}
export const UserCard: FC<IUserCard> = observer(({ user }) => {

    const [action, setAction] = useState<'delete' | 'admin' | undefined>()
    const [newUserName, setNewUserName] = useState<string>('')
    const [visits, setVisits] = useState<number>(-1)
    const debounceVisit = useDebounce(visits, 300)
    const [isNewName, setIsNewName] = useState<boolean>(false)

    const { addMessage } = useMessage();

    const userAction = useCallback(() => {
        if (user) {
            if (action === 'delete') {
                userStore.deleteUserById(user.id)
            }
            else if (action === 'admin') {
                userStore.giveRoleForUser(user.id, "ADMIN")
            }
        }
    }, [user, action])
    const newNameHandler = useCallback(() => {
        if (!user) {
            addMessage('Пользователь не найден', 'error')
            return
        }
        if (isNewName) {
            if (newUserName !== user.name) {
                userStore.changeUserById({
                    ...user, name: newUserName
                })
                addMessage('Вы изменили имя клиенту', 'message')
            }
            setIsNewName(false)

        }
        else {
            setIsNewName(true)
        }
    }, [isNewName, newUserName, user, setIsNewName])
    useEffect(() => {
        if (!user) {
            addMessage('Пользователь не найден', 'error')
            return
        }
        if (debounceVisit !== user.visitsNumber && debounceVisit >= 0) {
            userStore.changeUserById({
                ...user, visitsNumber: debounceVisit
            })
            addMessage(`Вы изменили количество визитов клиента`, 'message')
        }

    }, [debounceVisit, user])

    useEffect(() => {
        if (user) {
            setNewUserName(user.name || user.email || '')
            setVisits(user.visitsNumber || 0)
        }
    }, [user])
    return (
        <>
            <article className={classes.userCard}>
                <div
                    className={classes.userCard__imageBox}
                >
                    <img
                        className={classes.userCard__userImage}
                        src={user?.imageSrc || defaultUSerIcon}
                        alt={user?.name || 'Фото пользователя'}
                    />
                    <p className={classes.userCard__userLevel}>
                        {userLevel(user?.visitsNumber)}
                    </p>
                </div>
                <div className={classes.userCard__content}>
                    <div className={classes.userCard__fields}>
                        <div className={classes.userCard__field}>
                            <p className={classes.userCard__fieldName}>
                                Имя:
                            </p>
                            <div className={classes.userCard__fieldFlex}>
                                <Input
                                    className={classes.userCard__fieldValue}
                                    value={newUserName}
                                    onChange={(event) => setNewUserName(event.target.value)}
                                    disabled={!isNewName}
                                />
                                <ControllerButton
                                    className={classes.userCard__nameBtn}
                                    type={isNewName ? 'add' : 'edit'}
                                    title='Задать новое имя пользователю'
                                    onClick={newNameHandler}
                                />
                            </div>

                        </div>
                        {
                            user?.email
                                ? <div className={classes.userCard__field}>
                                    <p className={classes.userCard__fieldName}>
                                        Эл. почта:
                                    </p>
                                    <a
                                        className={classes.userCard__fieldValue}
                                        href={`mailto:${user.email}`}
                                        target="_blank"
                                        title='Почта пользователя'
                                        aria-label='Почта пользователя'
                                        rel="noopener noreferrer"
                                    >
                                        {user.email}
                                    </a>
                                </div>
                                : null
                        }
                        {
                            user?.phone
                                ? <div className={classes.userCard__field}>
                                    <p className={classes.userCard__fieldName}>
                                        Телефон:
                                    </p>
                                    <a
                                        className={classes.userCard__fieldValue}
                                        href={`tel:${user.phone}`}
                                        target="_blank"
                                        title='Телефон пользователя'
                                        aria-label='Телефон пользователя'
                                        rel="noopener noreferrer"
                                    >
                                        {user.phone}
                                    </a>
                                </div>
                                : null
                        }
                    </div>

                    <footer
                        className={classes.userCard__footer}
                    >

                        <Counter
                            className={classes.userCard__counter}
                            count={visits}
                            setCount={setVisits}
                            step={1}
                            minCount={0}
                            maxCount={99}
                            counterButtonType={CounterButtonType.arrow}

                        />

                        <div className={classes.userCard__buttons}>
                            <Button
                                className={classes.userCard__button}
                                onClick={() => setAction('delete')}
                                title='Удалить пользователя'
                            >
                                Удалить
                            </Button>
                            <Button
                                className={
                                    classConnection(
                                        user?.role === 'ADMIN' ? classes.userCard__button_active : '',
                                        classes.userCard__button)
                                }
                                onClick={() => setAction('admin')}
                                title='Назначить админом'
                            >
                                Админ
                            </Button>
                        </div>
                    </footer>

                </div>

            </article>
            <ModalOk
                isOpen={!!action}
                closeModal={() => setAction(undefined)}
                onOkClick={userAction}
            />
        </>
    )
})

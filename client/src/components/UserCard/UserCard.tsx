import { FC, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'

import defaultUSerIcon from '../../assets/icons/User-icon.svg';
import classes from './UserCard.module.scss';
import { IUser, userStore } from '../../store';
import useDebounce from '../../utils/hooks/useDebounce';
import { useMessage } from '../../modules/MessageContext';
import { classConnection, userLevel } from '../../utils/function';
import Input from '../../UI/Input/Input';
import ControllerButton from '../../UI/ControllerButton/ControllerButton';
import Counter, { CounterButtonType } from '../Counter/Counter';
import Button from '../../UI/Button/Button';
import ModalOk from '../Modal/ModalOk';


interface IUserCard {
    className?: string;
    user?: IUser;
    isShortCard?: boolean
}
const UserCard: FC<IUserCard> = observer(({ className, user, isShortCard = false }) => {

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
            setNewUserName(user.name || '')
            setVisits(user.visitsNumber || 0)
        }
    }, [user])
    const onLinkClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation()
    }, [])
    return (
        <>
            <article className={classConnection(
                classes.userCard,
                isShortCard ? classes.userCard_short : '',
                className

            )}>
                {
                    isShortCard && user?.visitsNumber
                        ? <span className={classes.userCard__userVisits}>
                            {user.visitsNumber}
                        </span>
                        : null

                }
                <div
                    className={classes.userCard__imageBox}
                >
                    <img
                        className={classes.userCard__userImage}
                        src={user?.imageSrc || defaultUSerIcon}
                        alt={user?.name || 'Фото пользователя'}
                    />
                    <p className={classes.userCard__userLevel}>
                        {userLevel(user?.visitsNumber || null)}
                    </p>

                </div>
                <div className={classes.userCard__content}>
                    <div className={classes.userCard__fields}>

                        {
                            !!user?.name || !isShortCard
                                ? <div className={classes.userCard__field}>
                                    <p className={classes.userCard__fieldName}>
                                        Имя:
                                    </p>
                                    {
                                        !isShortCard
                                            ? <div className={classes.userCard__fieldFlex}>
                                                <Input
                                                    className={classes.userCard__fieldValue}
                                                    value={newUserName}
                                                    onChange={(event) => setNewUserName(event.target.value)}
                                                    disabled={!isNewName}
                                                />
                                                <ControllerButton
                                                    className={classes.userCard__nameBtn}
                                                    type={isNewName ? 'save' : 'edit'}
                                                    title='Задать новое имя пользователю'
                                                    onClick={newNameHandler}
                                                />
                                            </div>
                                            : <p className={classes.userCard__fieldValue}>{user?.name}</p>
                                    }
                                </div>
                                : null
                        }

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
                                        onClick={(event) => onLinkClick(event)}
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
                                        onClick={(event) => onLinkClick(event)}

                                    >
                                        {user.phone}
                                    </a>
                                </div>
                                : null
                        }
                    </div>
                    {
                        !isShortCard
                            ? <footer
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
                            : null
                    }


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

export default UserCard
import { observer } from 'mobx-react-lite'
import { AUTHORIZATION, PASSWORD_RECOVERY, REGISTRATION, registrationStore } from '../../../../store'
import Button from '../../../../UI/Button/Button'
import classes from './RegistrationGoToAuth.module.scss'


export const RegistrationGoToAuth = observer(() => {
    const onButtonClick = () => {
        registrationStore.actionType === REGISTRATION
            ? registrationStore.setActionType(AUTHORIZATION)
            : registrationStore.setActionType(REGISTRATION)
    }
    if (registrationStore.actionType !== REGISTRATION
        && registrationStore.actionType !== AUTHORIZATION) return null
    return (
        <>
            <div className={classes.registrationGoToAuth}>
                <p className={classes.registrationGoToAuth__text}>
                    {registrationStore.actionType === REGISTRATION ? 'Уже есть аккаунт?' : 'Ещё нет аккаунта?'}
                </p>
                <Button
                    className={classes.registrationGoToAuth__button}
                    onClick={onButtonClick}
                >
                    {registrationStore.actionType === REGISTRATION ? 'Войти' : 'Создать'}
                </Button>
            </div>
            {
                registrationStore.actionType === AUTHORIZATION &&
                <div className={classes.registrationGoToAuth}>
                    <p className={classes.registrationGoToAuth__text}>
                        Забыли пароль?
                    </p>
                    <Button
                        className={classes.registrationGoToAuth__button}
                        onClick={() => registrationStore.setActionType(PASSWORD_RECOVERY)}
                    >
                        Восстановить
                    </Button>
                </div>
            }
        </>

    )
})
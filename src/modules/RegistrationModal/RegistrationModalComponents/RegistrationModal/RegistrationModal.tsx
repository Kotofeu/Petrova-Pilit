import { FC, useCallback, useEffect, useState } from 'react'


import { observer } from 'mobx-react-lite'
import ModalSend from '../../../../components/Modal/ModalSend'
import { registrationStore, REGISTRATION, AUTHORIZATION, PASSWORD_RECOVERY, emailConfirmStore } from '../../../../store'
import { useMessage } from '../../../MessageContext'
import EmailField from '../../../../components/EmailField/EmailField'
import CodeConfirm from '../../../../components/CodeConfirm/CodeConfirm'
import NewPassword from '../../../../components/NewPassword/NewPassword'
import PolicyAgree from '../../../../UI/PolicyAgree/PolicyAgree'
import classes from './RegistrationModal.module.scss'
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton'

import { RegistrationGoToAuth } from '../RegistrationGoToAuth/RegistrationGoToAuth'
import RegistrationProgress from '../RegistrationProgress/RegistrationProgress'
import { RegistrationBlock } from '../RegistrationBlock/RegistrationBlock'
import Input from '../../../../UI/Input/Input'
import PasswordShowButton from '../../../../components/NewPassword/PasswordShowButton'
import { classConnection } from '../../../../utils/function'
export const RegistrationModal: FC = observer(() => {
    const [actionHeader, setActionHeader] = useState<string>('')

    const [email, setEmail] = useState<string>('')
    const [jwt, setJwt] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [isPassAuthShowing, setIsPassAuthShowing] = useState<boolean>(false)

    const { addMessage } = useMessage();

    useEffect(() => {
        emailConfirmStore.setEmail('')
        setEmail('')
        setJwt('')
        setPassword('')

        setActionHeader(
            registrationStore.actionType === REGISTRATION
                ? 'Регистрация'
                : registrationStore.actionType === AUTHORIZATION
                    ? 'Авторизация'
                    : registrationStore.actionType === PASSWORD_RECOVERY
                        ? 'Восстановление'
                        : ''
        );
    }, [registrationStore.actionType])

    useEffect(() => {
        if (registrationStore.isOpen && !registrationStore.actionType) {
            addMessage('Возникла непредвиденная ошибка открытия окна регистрации', 'error')
        }
    }, [])
    const closeModal = useCallback(() => {
        registrationStore.setIsOpen(false)
        registrationStore.setActionType(AUTHORIZATION)
    }, [registrationStore])
    const onEmailChange = useCallback((email: string) => {
        if (registrationStore.actionType === PASSWORD_RECOVERY) {
            // Если такой пользователь есть то окей
            emailConfirmStore.setEmail(email)
            setEmail(email)
        }
        else if (registrationStore.actionType === REGISTRATION) {
            // Если такого пользователя нет то окей
            emailConfirmStore.setEmail(email)
            setEmail(email)
        }
        else {
            addMessage('Возникла непредвиденная ошибка открытия окна регистрации', 'error')
        }
    }, [])

    const onBackClick = useCallback(() => {
        if (email && (
            registrationStore.actionType === REGISTRATION ||
            registrationStore.actionType === PASSWORD_RECOVERY
        )) {
            emailConfirmStore.setEmail('')
            setEmail('')
            setJwt('')
            setPassword('')
        }
        else {
            closeModal()
        }
    }, [email, jwt, password])

    const postRequest = useCallback(() => {
        if (password && email) {
            if (registrationStore.actionType === REGISTRATION) {
                // Создание пользователя
            }
            if (registrationStore.actionType === AUTHORIZATION) {
                // Вход в аккаунт
            }
            if (registrationStore.actionType === PASSWORD_RECOVERY) {
                // Сброс пароля
            }
            registrationStore.setIsOpen(false)
        }
        else {
            addMessage('Поле пароля или электронной почты некорректны', 'error')
        }
    }, [email, jwt, password])
    if (registrationStore.isOpen && !registrationStore.actionType) return null
    return (
        <ModalSend
            className={classes.registrationModal}
            isOpen={registrationStore.isOpen && registrationStore.actionType !== null}
            closeModal={closeModal}
            send={(email && jwt) || registrationStore.actionType === AUTHORIZATION
                ? postRequest
                : undefined
            }
            isButtonDisabled={!password || !email}
            buttonText='Завершить'
        >
            <header
                className={classes.registrationModal__header}
            >
                <ControllerButton
                    className={classes.registrationModal__back}
                    onClick={onBackClick}
                    type='back'
                />
                <h3
                    className={classes.registrationModal__title}
                >
                    {actionHeader}
                </h3>
            </header>

            <RegistrationBlock
                isShowing={registrationStore.actionType === AUTHORIZATION}
                title='Укажите данные для входа'
            >
                <Input
                    className={classes.registrationModal__authInput}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    name='email'
                    type='email'
                    title='Электронная почта'
                    placeholder='Электронная почта'

                />
                <div className={classes.registrationModal__authPass}>
                    <Input
                        className={classConnection(
                            classes.registrationModal__authInput,
                            classes.registrationModal__authInput_pass,

                        )}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        type={isPassAuthShowing ? 'text' : 'password'}
                        placeholder='Ваш пароль'
                        name='password'
                        title='Новый пароль'
                    />
                    <PasswordShowButton
                        className={classes.registrationModal__authPassShow}
                        isShowPass={isPassAuthShowing}
                        setIsShowPass={setIsPassAuthShowing}
                    />
                </div>
            </RegistrationBlock>


            <RegistrationProgress email={email} jwt={jwt} />
            <RegistrationBlock
                isShowing={!email && registrationStore.actionType !== AUTHORIZATION}
                title='Укажите адрес электронной почты'
            >
                <EmailField
                    className={classes.registrationModal__emailField}
                    inputClassName={classes.registrationModal__emailInput}
                    onConfirm={onEmailChange}
                />
            </RegistrationBlock>
            <RegistrationBlock
                isShowing={!jwt && !!email && registrationStore.actionType !== AUTHORIZATION}
                title={`Подтвердите адрес электронной почты: ${email}`}
            >
                <CodeConfirm
                    onConfirm={(jwt) => setJwt(jwt)}
                />
            </RegistrationBlock>
            <RegistrationBlock
                isShowing={!!email && !!jwt && registrationStore.actionType !== AUTHORIZATION}
                title='Придумайте новый пароль'
            >
                <NewPassword
                    setNewPassword={(password) => setPassword(password)}
                />
            </RegistrationBlock>


            <RegistrationGoToAuth />

            {
                registrationStore.actionType === REGISTRATION
                    ? <PolicyAgree
                        className={classes.registrationModal__policy}
                        agreeWith='При регистрации'
                    />
                    : null
            }

        </ModalSend>

    )
})
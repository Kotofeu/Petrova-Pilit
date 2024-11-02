import { useState, FC, useCallback, useEffect } from 'react'
import { SettingsRow } from '../SettingsRow/SettingsRow'
import ModalSend from '../../../../components/Modal/ModalSend';
import CodeConfirm from '../../../../components/CodeConfirm/CodeConfirm';
import { emailConfirmStore } from '../../../../store';
import { observer } from 'mobx-react-lite';
import EmailField from '../../../../components/EmailField/EmailField';


import classes from './SettingsEmailInput.module.scss'
import { classConnection } from '../../../../utils/function';
interface ISettingsEmailInput {
    className?: string;
    inputClassName?: string;
    emailFieldClassName?: string;
    email: string;
    setEmail: (email: string) => void
}
export const SettingsEmailInput: FC<ISettingsEmailInput> = observer(({
    className, inputClassName, emailFieldClassName, email, setEmail,
}) => {
    const [userEmail, setUserEmail] = useState<string>(email || '')
    const [emailConfirmOpen, setEmailConfirmOpen] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const onConfirmClick = useCallback((email: string) => {
        emailConfirmStore.setEmail(email)
        setUserEmail(email)
        setEmailConfirmOpen(true)
        setError('')
    }, [])
    const onConfirm = useCallback((isConfirm: boolean) => {
        if (isConfirm) {
            setEmail(userEmail)
            setEmailConfirmOpen(false)
        }
    }, [userEmail])
    const onError = useCallback((error: string) => {
        setError(error)
    }, [])
    return (
        <>
            <SettingsRow
                className={className}
                title='Электронная почта'
                subtitle='Вам будет отрпавлен код подтверждения'
                error={error}
            >
                <EmailField
                    className={classConnection(classes.settingsEmailInput, emailFieldClassName)}
                    inputClassName={inputClassName}
                    email={email}
                    onConfirm={onConfirmClick}
                    onError={onError}
                />
            </SettingsRow>
            <ModalSend
                isOpen={emailConfirmOpen}
                closeModal={() => setEmailConfirmOpen(false)}
            >
                <h4 className={classes.settingsEmailInput__modalTitle}>Мы отправили Вам<br />  код на электронную почту</h4>
                <h5 className={classes.settingsEmailInput__modalEmail}>{emailConfirmStore.email}</h5>
                <CodeConfirm
                    onConfirm={onConfirm} sendCode={emailConfirmStore.changeSendCode}
                />
            </ModalSend>
        </>

    )
})
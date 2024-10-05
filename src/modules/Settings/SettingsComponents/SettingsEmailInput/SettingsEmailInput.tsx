import { useState, FC, useCallback } from 'react'
import { validate } from 'react-email-validator';
import { SettingsRow } from '../SettingsRow/SettingsRow'
import { useMessage } from '../../../MessageContext';
import ModalSend from '../../../../components/Modal/ModalSend';
import CodeConfirm from '../../../../components/CodeConfirm/CodeConfirm';
import { emailConfirmStore } from '../../../../store';
import { observer } from 'mobx-react-lite';
import EmailField from '../../../../components/EmailField/EmailField';


import classes from './SettingsEmailInput.module.scss'
interface ISettingsEmailInput {
    className?: string;
    inputClassName?: string;
    email: string;
    setEmail: (email: string) => void
}
export const SettingsEmailInput: FC<ISettingsEmailInput> = observer(({
    className, inputClassName, email, setEmail,
}) => {
    const [userEmail, setUserEmail] = useState<string>(email || '')
    const [emailConfirmOpen, setEmailConfirmOpen] = useState<boolean>(false)
    const { addMessage } = useMessage();

    const onConfirmClick = useCallback((email: string) => {
        if (validate(email)) {
            emailConfirmStore.setEmail(email)
            setUserEmail(email)
            setEmailConfirmOpen(true)
        }
        else {
            addMessage('Неверный формат почты', 'error')
        }

    }, [])
    const onConfirm = useCallback((jwt: string) => {
        setEmail(userEmail)
        setEmailConfirmOpen(false)
    }, [userEmail])
    return (
        <>
            <SettingsRow
                className={className}
                title='Электронная почта'
            >
                <EmailField
                    className={classes.settingsEmailInput}
                    inputClassName={inputClassName}
                    email={email}
                    onConfirm={onConfirmClick}
                />
            </SettingsRow>
            <ModalSend
                isOpen={emailConfirmOpen}
                closeModal={() => setEmailConfirmOpen(false)}
            >
                <CodeConfirm
                    isShowEmail
                    onConfirm={onConfirm}
                />
            </ModalSend>
        </>

    )
})
import { useState, memo, FC, useCallback, ChangeEvent } from 'react'
import { validate } from 'react-email-validator';
import { SettingsRow } from '../SettingsRow/SettingsRow'
import Button from '../../../../UI/Button/Button';
import ModalConfirm from '../../../../components/Modal/ModalConfirm';
import classes from './SettingsEmailInput.module.scss'
import { useMessage } from '../../../MessageContext';
import Input from '../../../../UI/Input/Input';

interface ISettingsEmailInput {
    className?: string;
    inputClassName?: string;
    email: string;
    setEmail: (email: string) => void
}
export const SettingsEmailInput: FC<ISettingsEmailInput> = memo(({
    className, inputClassName, email, setEmail,
}) => {
    const [userEmail, setUserEmail] = useState<string>(email || '')
    const [isEmailEdit, setIsEmailEdit] = useState<boolean>(false)
    const [emailConfirmOpen, setEmailConfirmOpen] = useState(false)
    const { addMessage } = useMessage();
    const userEmailHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setIsEmailEdit(event.target.value !== email)
        setUserEmail(event.target.value)
    }, [email])
    const onConfirmClick = useCallback(() => {
        if (validate(userEmail)) {
            setEmailConfirmOpen(true)
        }
        else {
            addMessage('Неверный формат почты', 'error')
        }

    }, [userEmail])
    const onConfirm = useCallback(() => {
        setEmail(userEmail)
        setIsEmailEdit(false)
        setEmailConfirmOpen(false)
    }, [userEmail])
    return (
        <>
            <SettingsRow
                className={className}
                title='Электронная почта'
                subtitle={`${isEmailEdit ? 'Вам будет отрпавлен код подтверждени' : ''}`}
            >
                <Input
                    className={inputClassName}
                    title='Номер телефона'
                    value={userEmail}
                    onChange={userEmailHandler}
                    name='email'
                    type='email'
                />
                {
                    (isEmailEdit)
                    &&
                    <>
                        <Button
                            className={classes.confirmBtn}
                            type='button'
                            onClick={onConfirmClick}
                        >
                            Подтвердить
                        </Button>
                    </>
                }
            </SettingsRow>
            <ModalConfirm
                isOpen={emailConfirmOpen}
                email={userEmail}
                closeModal={() => setEmailConfirmOpen(false)}
                onConfirm={onConfirm}
            />
        </>

    )
})
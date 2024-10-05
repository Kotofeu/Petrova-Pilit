import { memo, FC, useState, useCallback, ChangeEvent, useEffect } from 'react'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import { classConnection } from '../../utils/function';
import { validate } from 'react-email-validator';

import classes from './EmailField.module.scss'


interface IEmailField {
    className?: string;
    inputClassName?: string;
    email?: string;
    onConfirm: (email: string) => void
}
const EmailField: FC<IEmailField> = memo(({
    className,
    inputClassName,
    email,
    onConfirm
}) => {
    const [userEmail, setUserEmail] = useState<string>(email || '')
    const [isEmailEdit, setIsEmailEdit] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const userEmailHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUserEmail(event.target.value)
        setError('')
    }, [email])
    useEffect(() => {
        setIsEmailEdit(userEmail !== email)
    }, [email, userEmail])
    const onConfirmClick = useCallback(() => {
        if (validate(userEmail)) {
            onConfirm(userEmail)
        }
        else {
            setError('Неверный формат почты')
        }
    }, [userEmail])
    return (
        <>
            <div className={classConnection(classes.emailField, className)}>
                <Input
                    className={classConnection(
                        classes.emailField__input,
                        inputClassName,
                        !!error ? classes.emailField__input_error : ""
                    )}
                    title='Электронная почта'
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
                            className={classes.emailField__confirmBtn}
                            type='button'
                            onClick={onConfirmClick}
                        >
                            Подтвердить
                        </Button>
                    </>
                }
            </div>
            {
                isEmailEdit &&
                <span className={classConnection(
                    classes.emailField__subtitle,
                    !!error ? classes.emailField__subtitle_error : ""
                )}>
                    {error || 'Вам будет отрпавлен код подтверждени'}
                </span>
            }
        </>

    )
})

export default EmailField
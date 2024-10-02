import { memo, FC, useState, useEffect, useCallback } from 'react'
import Modal from './Modal';

import classes from './Modal.module.scss'
import Button from '../../UI/Button/Button';
import { useMessage } from '../../modules/MessageContext';
import useCountDown from '../../utils/hooks/useCountDown';
import Loader from '../../UI/Loader/Loader';
import Input from '../../UI/Input/Input';

interface IModalConfirm {
    email: string;
    isOpen: boolean;
    closeModal: () => void;
    onConfirm: () => void;
}
const ModalConfirm: FC<IModalConfirm> = memo(({ email, isOpen, closeModal, onConfirm }) => {
    const { addMessage } = useMessage();
    const [code, setCode] = useState<string>('')
    const [countdown, stopCounting, startCounting] = useCountDown(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const sendCode = useCallback(() => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            startCounting(30)
            addMessage('Код отправлен', 'message')
        }, 600)

    }, [email])
    const confirmCode = useCallback(() => {
        setIsLoading(true)
        setTimeout(() => {
            if (code === '') {
                stopCounting()
                onConfirm()
                addMessage('Электронная почта подтверждена!', 'complete')
            }
            else {
                addMessage('Введен неверный код.', 'error')
            }
            setIsLoading(false)
        }, 600)

    }, [code, sendCode, email])

    useEffect(() => {
        setCode('')
        if (isOpen && countdown === 0) sendCode()
    }, [isOpen])
    return (
        <Modal
            isOpen={isOpen}
            closeModal={closeModal}
        >
            <div className={classes.modalEmailConfirm} >
                <Loader className={classes.modalEmailConfirm__loader} isLoading={isLoading} />
                <h2 className={classes.modalEmailConfirm__title}>Подтверждение почты: <br />{email}</h2>
                <Input
                    className={classes.modalEmailConfirm__input}
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Введите код из письма"
                />
                <div className={classes.modalEmailConfirm__buttons}>
                    <Button
                        className={classes.modalEmailConfirm__confirm}
                        onClick={confirmCode}
                    >
                        Подтвердить
                    </Button>
                    <Button
                        className={classes.modalEmailConfirm__send}
                        onClick={sendCode}
                        disabled={countdown > 0}
                    >
                        {countdown > 0 ? `Повторно через: ${countdown}с.` : 'Отправить код снова'}
                    </Button>
                </div>

            </div>
        </Modal>
    )
})

export default ModalConfirm




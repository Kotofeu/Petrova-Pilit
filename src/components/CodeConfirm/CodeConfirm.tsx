import { FC, useEffect, useState, useCallback } from 'react'
import { observer } from 'mobx-react-lite';
import { AnimatePresence, motion } from 'framer-motion'

import Loader from '../../UI/Loader/Loader';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

import { useMessage } from '../../modules/MessageContext';
import { emailConfirmStore } from '../../store';
import useDebounce from '../../utils/hooks/useDebounce';
import { classConnection } from '../../utils/function';

import classes from './CodeConfirm.module.scss'

interface ICodeConfirm {
  className?: string;
  isShowEmail?: boolean;
  onConfirm: (jwt: string) => void
}

const CodeConfirm: FC<ICodeConfirm> = observer(({
  className,
  isShowEmail,
  onConfirm,

}) => {
  const { email, isCodeSent, countdown, isLoading, error, jwt } = emailConfirmStore
  const { addMessage } = useMessage();
  const [code, setCode] = useState<string>('');
  const debounceCode = useDebounce(code, 1000)
  useEffect(() => {
    if (jwt) {
      addMessage('Почта подтверждена', 'complete')
      onConfirm(jwt)
      emailConfirmStore.reset()
    }
  }, [jwt])
  useEffect(() => {
    if (error) {
      addMessage(error, 'error')
    }
  }, [error])
  useEffect(() => {
    if (debounceCode) {
      emailConfirmStore.confirmCode(debounceCode)
    }
  }, [debounceCode])
  const sendCode = useCallback(() => {
    if (email) {
      emailConfirmStore.sendCode()
      setCode('');
      addMessage('Письмо отправлено', 'message')
    }
  }, [emailConfirmStore.sendCode, error, email])
  useEffect(() => {
    if (!isCodeSent) {
      sendCode()
    }
  }, [])

  return (
    <>
      <Loader className={classes.codeConfirm__loader} isLoading={isLoading} />
      <AnimatePresence>
        {
          email ?
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              exit={{ opacity: 0,  height: 0  }}
              animate={{ opacity: 1,  height: 'auto' }}
              layout
              className={classConnection(classes.codeConfirm, className)}
            >

              <h2 className={classes.codeConfirm__title}>Мы отправили Вам<br />  код на электронную почту</h2>
              {
                isShowEmail
                  ? <h3 className={classes.codeConfirm__email}>{email}</h3>
                  : null
              }
              <Input
                className={classes.codeConfirm__input}
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Введите код из письма"
              />

              <Button
                className={classes.codeConfirm__send}
                onClick={sendCode}
                disabled={countdown > 0 || isLoading}

              >
                {countdown > 0 ? `Повторно через: ${countdown}с.` : 'Отправить код снова'}
              </Button>
            </motion.div>
            : null
        }

      </AnimatePresence>
    </>

  )
})

export default CodeConfirm
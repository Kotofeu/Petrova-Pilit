import { memo, FC, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { classConnection } from '../../utils/function';

import classes from './Message.module.scss'
export type MessageType = 'error' | 'message' | 'complete'
interface IMessage {
    type?: MessageType;
    text: string;
    liveTime?: number;
}
const Message: FC<IMessage> = memo(({
    type = 'message',
    text,
    liveTime = 3000
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(true)
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsOpen(false)
        }, liveTime)
        return () => {
            clearTimeout(timeout)
            setIsOpen(true)
        }
    }, [type, text, liveTime])
    if (!text) return null
    return (
        <AnimatePresence>
            {
                isOpen &&
                <motion.div
                    animate={{ x: 0, opacity: 0.8}}
                    exit={{ x: 100, opacity: 0 }}
                    initial={{ x: 100, opacity: 0}}
                    className={classConnection(classes.message, classes[`message_${type}`])}
                >
                    <p
                        className={classes.message__text}
                    >
                        {text}
                    </p>

                </motion.div>
            }
        </AnimatePresence>
    )
})

export default Message
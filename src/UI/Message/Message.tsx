import { memo, FC, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { classConnection } from '../../utils/function';

import classes from './Message.module.scss'
export type MessageType = 'error' | 'message' | 'complete'
interface IMessage {
    className?: string;
    type?: MessageType;
    text: string;
    liveTime?: number;
}
const Message: FC<IMessage> = memo(({
    className,
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
                    animate={{ x: 0, opacity: 0.8 }}
                    exit={{ x: 100, opacity: 0 }}
                    initial={{ x: 100, opacity: 0 }}
                    className={classConnection(classes.message, className)}
                >
                    <p
                        className={classConnection(classes.message__text, classes[`message__text_${type}`])}

                    >
                        {text}
                    </p>

                </motion.div>
            }
        </AnimatePresence>
    )
})

export default Message
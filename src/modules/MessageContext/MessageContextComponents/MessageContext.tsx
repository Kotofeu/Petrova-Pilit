import React, { createContext, useContext, useState, ReactNode } from 'react';

import Message, { MessageType } from '../../../UI/Message/Message';
import classes from './MessageContext.module.scss'

interface Message {
    id: string;
    text: string;
    type: MessageType;
}

interface MessageContextType {
    addMessage: (text: string, type: MessageType) => void;
}
const LIVE_TIME = 3500
const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a MessageProvider');
    }
    return context;
};

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<Message[]>([]);

    const addMessage = (text: string, type: MessageType) => {
        const id = Date.now().toString();
        setMessages((prev) => [...prev, { id, text, type }]);

        setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.id !== id));
        }, LIVE_TIME);
    };

    return (
        <MessageContext.Provider value={{ addMessage }}>
            {children}
            <div className={classes.messageProvider}>
                <div className={classes.messageProvider__inner}>
                    {messages.map((msg) => (
                        <Message key={msg.id} text={msg.text} type={msg.type} liveTime={LIVE_TIME - 500} />
                    ))}
                </div>
            </div>
        </MessageContext.Provider>
    );
};
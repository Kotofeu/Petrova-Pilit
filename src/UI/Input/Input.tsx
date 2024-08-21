import { memo, FC, ChangeEvent, HTMLInputTypeAttribute } from 'react'
import classes from './Input.module.scss'
import classConnection from '../../utils/function/classConnection';
export interface IInput {
    className?: string;
    value: string;
    title?: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    autoComplete?: string;
    name?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const Input: FC<IInput> = memo((props) => {
    const {
        className = '',
        title,
        type = 'text',
        value,
        placeholder,
        autoComplete = 'off',
        name,
        onChange,
    } = props
    return (
        <input
            name={name}
            className={classConnection(classes.input, className)}
            type={type}
            autoComplete={autoComplete}
            title={title}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />)
})

export default Input
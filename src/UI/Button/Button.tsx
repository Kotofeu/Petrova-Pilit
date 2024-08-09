import { FC, memo, ReactNode } from 'react'
import classConnection from '../../utils/function/classConnection'
import classes from './Button.module.scss'
interface IButton {
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children?: string | ReactNode,
    type?: "button" | "submit" | "reset";
}
const Button: FC<IButton> = memo((props) => {
    return (
        <button
            className={classConnection(classes.button, props.className)}
            onClick={props.onClick}
            type={props.type ? props.type : 'button'}
        >
            {props.children}
        </button>
    )
})

export default Button
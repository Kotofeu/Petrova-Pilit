import { FC, memo, ReactNode } from 'react'
import classes from './Button.module.scss'
import { classConnection } from '../../utils/function';
interface IButton {
    className?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    children?: string | ReactNode,
    type?: "button" | "submit" | "reset";
    title?: string;
    style?: React.CSSProperties;
    disabled?: boolean

}
const Button: FC<IButton> = memo((props) => {
    return (
        <button
            style={props.style}
            className={classConnection(classes.button, props.className)}
            onClick={props.onClick}
            type={props.type ? props.type : 'button'}
            title={props.title}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
})

export default Button
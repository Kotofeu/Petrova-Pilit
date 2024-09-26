import { memo, FC } from 'react'
import pencil from '../../assets/icons/pencil.svg'
import { classConnection } from '../../utils/function';
import classes from './ControllerButton.module.scss'
interface IControllerButton {
    className?: string;
    title?: string
    type: 'edit' | 'add' | 'delete'
    onClick: () => void
}
const ControllerButton: FC<IControllerButton> = memo(({ className, type, title, onClick }) => {
    if (type === 'edit') return (
        <button
            className={classConnection(classes.button, classes.button_edit, className)}
            type='button'
            onClick={onClick}
            title={title || 'Редактировать'}
            aria-label={title || 'Редактировать'}
        >
            <img src={pencil} alt="Редактировать" aria-hidden />
        </button>)
    if (type === 'add') return (
        <button
            className={classConnection(classes.button, classes.button_add, className)}
            type='button'
            onClick={onClick}
            title={title || 'Добавить'}
            aria-label={title || 'Добавить'}
        >
            <span/>
        </button>
    )
    return (
        <button
            className={classConnection(classes.button, classes.button_delete, className)}
            type='button'
            onClick={onClick}
            title={title || 'Удалить'}
            aria-label={title || 'Удалить'}
        />
    )
})

export default ControllerButton
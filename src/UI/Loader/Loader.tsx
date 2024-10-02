import { FC, memo } from 'react'
import classes from './Loader.module.scss'
import { classConnection } from '../../utils/function';

interface ILoader {
    className?: string;
    isLoading: boolean;
}
const Loader: FC<ILoader> = memo(({ className, isLoading }) => {
    if (!isLoading) return null
    return (
        <div className={classConnection(classes.loader, className)}><div></div><div></div><div></div><div></div></div>
    )
})

export default Loader
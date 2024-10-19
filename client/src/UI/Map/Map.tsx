import { memo, FC, HTMLAttributeReferrerPolicy } from 'react'
import classes from './Map.module.scss'
import { classConnection } from '../../utils/function';
export type loadingTypes = "lazy" | "eager" | undefined
interface IMap {
    className?: string;
    name: string;
    src: string;
    width?: string;
    height?: string;
    allowFullScreen?: boolean;
    loading?: loadingTypes;
    referrerPolicy?: HTMLAttributeReferrerPolicy;
    frameBorder?: number;
}
const Map: FC<IMap> = memo((props) => {
    const {
        className,
        name,
        src,
        width = '100%',
        height = '100%',
        allowFullScreen = false,
        loading = "lazy",
        referrerPolicy = "no-referrer-when-downgrade",
        frameBorder = 0,
    } = props
    return (
        <iframe
            className={classConnection(classes.map, className)}
            title={name}
            src={src}
            width={width}
            height={height}
            allowFullScreen={allowFullScreen}
            loading = {loading}
            referrerPolicy= {referrerPolicy}
            frameBorder = {frameBorder}
        />)
})

export default Map
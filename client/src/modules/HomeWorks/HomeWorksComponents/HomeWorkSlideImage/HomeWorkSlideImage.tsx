import { FC, memo } from 'react'
import classes from './HomeWorkSlideImage.module.scss'
import { classConnection } from '../../../../utils/function';

interface IHomeWorkSlideImage {
    className?: string
    imageSrc?: string | null;
    alt?: string;
    type?: 'after' | 'before'
}

export const HomeWorkSlideImage: FC<IHomeWorkSlideImage> = memo((props) => {
    if (!props.imageSrc) return null
    return (
        <div
            className={classConnection(
                classes.slideImageBox,
                props.type ? classes[`slideImageBox_${props.type}`] : '',
                props.className
            )}>
            <img
                className={classes.slideImageBox__image}
                src={props.imageSrc}
                alt={props.alt} />
        </div>
    )
})

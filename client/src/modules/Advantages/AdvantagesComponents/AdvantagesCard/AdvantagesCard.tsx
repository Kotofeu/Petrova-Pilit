import { FC, memo } from 'react'

import classes from './AdvantagesCard.module.scss'
import { classConnection } from '../../../../utils/function';
interface IAdvantagesCard {
    className?: string;
    title?: string;
    description?: string;
    imageSrc?: string;
}
export const AdvantagesCard: FC<IAdvantagesCard> = memo(({
    className,
    title,
    description,
    imageSrc
}) => {
    if (!title || !description || !imageSrc) return null
    return (
        <div className={classConnection(classes.advantagesCard, className)} >
            <div className={classes.advantagesCard__imageBox}>
                <img className={classes.advantagesCard__image} src={imageSrc} alt={title} />
            </div>
            <h4 className={classes.advantagesCard__title} >{title}</h4>
            <p className={classes.advantagesCard__description} >{description}</p>
        </div>
    )
})

import { FC, memo } from 'react'

import classes from './HomeAdvantagesCard.module.scss'
import classConnection from '../../../../utils/function/classConnection';
interface IHomeAdvantagesCard {
    className?: string;
    title: string;
    description: string;
    imageSrc: string;
}
export const HomeAdvantagesCard: FC<IHomeAdvantagesCard> = memo(({
    className,
    title,
    description,
    imageSrc
}) => {
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

import { FC, memo } from 'react'
import classes from './WorkCard.module.scss'
import classConnection from '../../../../utils/function/classConnection';

interface IWorkCard {
    className?: string;
    image?: string;
    title?: string;
}

const WorkCard: FC<IWorkCard> = memo(({ className, title, image }) => {
    if (!image) return null
    return (
        <article className={classConnection(classes.workCard, className)}>
            <img className={classes.workCard__image} src={image} alt={title} />
        </article>
    )
})

export default WorkCard
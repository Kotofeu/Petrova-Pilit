import { FC, memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import classes from './WorkCard.module.scss';
import classConnection from '../../../../utils/function/classConnection';
import { WORKS_ROUTE } from '../../../../utils/const/routes';
import Button from '../../../../UI/Button/Button';

interface IWorkCard {
    id: number;
    className?: string;
    image?: string;
    title?: string;
}

const WorkCard: FC<IWorkCard> = memo(({ id, className, title, image }) => {
    const router = useNavigate();
    const [isShowMore, setIsShowMore] = useState<boolean>(false)

    const onCardClick = useCallback(() => {
        router(`${WORKS_ROUTE}/${id}`);
    }, [id]);

    if (!image) return null;

    return (
        <motion.article
            className={classConnection(classes.workCard, isShowMore ? classes.workCard_active : '', className)}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            exit={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <img className={classes.workCard__image} src={image} alt={title} />
            <h4 className={classes.workCard__title}>{title}</h4>
            <Button onClick={onCardClick} className={classes.workCard__button}>Посмотреть подробнее</Button>
            <Button onClick={() => setIsShowMore(prev => !prev)} className={classes.workCard__show} />
        </motion.article>
    );
});

export default WorkCard;
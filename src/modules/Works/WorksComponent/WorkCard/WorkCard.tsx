import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import classes from './WorkCard.module.scss';
import classConnection from '../../../../utils/function/classConnection';
import { WORKS_ROUTE } from '../../../../utils/const/routes';

interface IWorkCard {
    id: number;
    className?: string;
    image?: string;
    title?: string;
}

const WorkCard: FC<IWorkCard> = memo(({ id, className, title, image }) => {
    const router = useNavigate();
    
    const onCardClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        router(`${WORKS_ROUTE}/${id}`);
    }, [id]);

    if (!image) return null;

    return (
        <motion.article 
            className={classConnection(classes.workCard, className)} 
            onClick={onCardClick}
            layout // Позволяет анимировать изменения в расположении элементов
            initial={{ opacity: 0, scale: 0.9 }} 
            exit={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
        >
            <img className={classes.workCard__image} src={image} alt={title} />
        </motion.article>
    );
});

export default WorkCard;
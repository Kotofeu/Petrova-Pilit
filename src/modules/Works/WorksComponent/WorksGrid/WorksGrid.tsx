import { memo, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './WorksGrid.module.scss';
import { IWorks } from '../../../../store';
import WorkCard from '../WorkCard/WorkCard';
import { classConnection } from '../../../../utils/function';

interface IWorksGrid {
    className?: string;
    works: IWorks[];
}

export const WorksGrid: FC<IWorksGrid> = memo(({ className, works }) => {
    return (
        <motion.div
            className={classConnection(classes.grid, className)}
        >
            {
                works.length
                    ? <AnimatePresence mode={'wait'}>
                        {works.map(work => (
                            <WorkCard
                                className={classes.grid__card}
                                key={work.id}
                                id={work.id}
                                image={work.beforeImage?.imageSrc || work.afterImage?.imageSrc}
                                title={work.title}
                                date={work.time}
                            />
                        ))}
                    </AnimatePresence>
                    : <div className={classes.grid__empty}>
                        К сожалению, работы в эту категорию <br/>ещё не добавлены
                    </div>
            }


        </motion.div>
    );
});
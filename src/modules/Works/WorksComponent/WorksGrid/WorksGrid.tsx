import { memo, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classes from './WorksGrid.module.scss';
import { IWorks, worksStore } from '../../../../store';
import WorkCard from '../WorkCard/WorkCard';
import classConnection from '../../../../utils/function/classConnection';

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
                                image={work.beforeImage || work.beforeImage}
                                title={work.title}
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
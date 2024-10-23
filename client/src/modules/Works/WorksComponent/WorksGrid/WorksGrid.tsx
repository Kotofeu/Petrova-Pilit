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
    if (!works.length) return null
    return (
        <motion.div
            className={classConnection(classes.grid, className)}
        >
            <AnimatePresence mode={'sync'}>
                {works.map((work, index) => {
                    if (work.id === -1) {
                        return (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={classConnection(classes.grid__card, classes.grid__card_empty)}
                                key={0 - (index + 1)} 
                            />
                        )
                    }
                    return (
                        <WorkCard
                            className={classes.grid__card}
                            key={work.id}
                            id={work.id}
                            image={work.imageBeforeSrc || work.imageAfterSrc}
                            title={work.name}
                            date={work.time}
                        />
                    )
                })}
            </AnimatePresence>
        </motion.div>
    );
});
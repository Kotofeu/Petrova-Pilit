import { useState, useEffect, memo, FC } from 'react'
import classes from './WorksGrid.module.scss'
import { IWorks } from '../../../../store';
import WorkCard from '../WorkCard/WorkCard';
import classConnection from '../../../../utils/function/classConnection';

interface IWorksGrid {
    className?: string;
    works: IWorks[];
}

export const WorksGrid: FC<IWorksGrid> = memo(({ className, works }) => {
    if (!works.length) return null
    return (
        <div className={classConnection(classes.grid, className)}>
            {works.map(work =>
                <WorkCard
                    className = {classes.grid__card}
                    key={work.id}
                    image={work.beforeImage || work.beforeImage}
                    title={work.title}
                />
            )}
        </div>
    )
})

import { useState, useEffect } from 'react'
import Section from '../../../../components/Section/Section'
import classes from './WorksSection.module.scss'
import Tabs from '../../../../components/Tabs/Tabs'
import { worksStore } from '../../../../store'
import { observer } from 'mobx-react-lite'
import { WorksGrid } from '../WorksGrid/WorksGrid'
import Button from '../../../../UI/Button/Button'
import Background from '../../../../assets/images/works-background.jpg'
export const WorksSection = observer(() => {
    const [workTypes, setWorkTypes] = useState<number | null>(null)
    useEffect(() => {
        worksStore.loadWorks()
    }, [])
    const setActiveType = (activeType: number | null) => {
        setWorkTypes(activeType)
        worksStore.setWorkType(activeType)
    }
    return (
        <Section
            className={classes.works}
        >   
           
            <div className={classes.works__inner}>
                <h1 className={classes.works__title}>Мои работы</h1>
                <Tabs
                    className={classes.works__tabs}
                    name='Выбор вида работы'
                    tabs={worksStore.workTypes}
                    addAll
                    activeId={workTypes}
                    setActiveID={setActiveType}
                />
                <WorksGrid className={classes.works__grid} works={worksStore.works} />
                {
                    worksStore.hasMoreWorks &&
                    <Button className={classes.works__showMore}>
                        <span>Показать ещё</span>
                    </Button>
                }
            </div>

        </Section>
    )
})
import { useState, useEffect, FC } from 'react'
import Section from '../../../../components/Section/Section'
import classes from './WorksSection.module.scss'
import Tabs from '../../../../components/Tabs/Tabs'
import { userStore, worksStore } from '../../../../store'
import { observer } from 'mobx-react-lite'
import { WorksGrid } from '../WorksGrid/WorksGrid'
import Button from '../../../../UI/Button/Button'
import { WorkTypesModal } from '../WorkTypesModal/WorkTypesModal'


export const WorksSection: FC = observer(() => {
    const [workTypes, setWorkTypes] = useState<number | null>(null)
    const [isTypesModalOpen, setIsTypesModalOpen] = useState<boolean>(false)
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
                {
                    userStore.isAdmin
                        ? <div className={classes.works__buttons}>
                            <Button
                                className={classes.works__button}
                                onClick={() => setIsTypesModalOpen(true)}
                            >
                                Изменить теги
                            </Button>
                            <Button
                                className={classes.works__button}
                                onClick={() => worksStore.setIsWorkCreating(true)}
                            >
                                Добавить запись
                            </Button>
                        </div>
                        : null
                }
                <WorksGrid className={classes.works__grid} works={worksStore.works} />
                {
                    worksStore.hasMoreWorks &&
                    <Button className={classes.works__showMore}>
                        <span>Показать ещё</span>
                    </Button>
                }
            </div>
            <WorkTypesModal
                isOpen={isTypesModalOpen}
                closeModal={() => setIsTypesModalOpen(false)}
                tabs={worksStore.workTypes}
            />
        </Section>
    )
})
import { useState, useEffect, FC, useMemo } from 'react'
import classes from './WorksSection.module.scss'
import { userStore, worksStore } from '../../../../store'
import { observer } from 'mobx-react-lite'
import { WorksGrid } from '../WorksGrid/WorksGrid'
import Button from '../../../../UI/Button/Button'
import { WorkTypesModal } from '../WorkTypesModal/WorkTypesModal'
import { classConnection } from '../../../../utils/function'
import { WorkTab } from '../WorkTab/WorkTab'


export const WorksSection: FC = observer(() => {
    const [workTypes, setWorkTypes] = useState<number | null>(null)
    const [isTypesModalOpen, setIsTypesModalOpen] = useState<boolean>(false)
    useEffect(() => {
        worksStore.loadWorks()
    }, [])
    const setActiveType = (activeType: number | null) => {
        setWorkTypes(activeType)
        worksStore.setWorkType(activeType)
        window.scrollTo(0, 0);
    }

    const items = Array.from(worksStore.works || []);
    const gridItems = [...items];
    const emptyCellsCount = useMemo(() => {
        if (items.length < 4) {
            return 4 - items.length;
        } else if (items.length > 4 && items.length % 2 !== 0) {
            return 1;
        } else {
            return 0;
        }
    }, [items.length]);
    if (items.length > 0) {
        for (let i = 0; i < emptyCellsCount; i++) {
            gridItems.push({ id: -1, name: '', createdAt: 0 });
        }
    }

    return (
        <div className={classes.works}>
            <aside className={classes.works__aside}>
                <h1 className={classes.works__title}>Мои работы</h1>
                <nav
                    className={classConnection(classes.works__tabs)}
                    aria-label={'Виды работ'}
                >
                    <WorkTab
                        className={classConnection(
                            classes.works__tab,
                            workTypes === null ? classes.works__tab_active : ''
                        )}
                        onClick={() => setActiveType(null)}
                        title='Все работы'
                        isActive={workTypes === null}
                    />
                    {
                        worksStore.workTypes.map(tab => {
                            if (!tab.name) return
                            return (
                                <WorkTab
                                    className={classConnection(
                                        classes.works__tab,
                                        workTypes === tab.id ? classes.works__tab_active : ''
                                    )}
                                    key={tab.id}
                                    onClick={() => setActiveType(tab.id)}
                                    title={tab.name}
                                    isActive={workTypes === tab.id}
                                />

                            )
                        })
                    }
                </nav>
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
            </aside>
            <div className={classes.works__content}>

                <WorksGrid
                    className={classes.works__list}
                    works={gridItems}
                />
                {
                    worksStore.hasMoreWorks &&
                    <Button className={classes.works__showMore}>
                        <span>Показать ещё</span>
                    </Button>
                }
                {
                    !worksStore.works.length
                        ? <div className={classes.works__empty}>
                            К сожалению, работы в эту категорию <br />ещё не добавлены
                        </div>
                        : null
                }

            </div>

            <WorkTypesModal
                isOpen={isTypesModalOpen}
                closeModal={() => setIsTypesModalOpen(false)}
                tabs={worksStore.workTypes}
            />
        </div>


    )
})
import { useState, useEffect, FC, useMemo, useCallback } from 'react'
import classes from './WorksSection.module.scss'
import { applicationStore, IGetAllJSON, IWork, IWorksType, userStore, worksStore } from '../../../../store'
import { observer } from 'mobx-react-lite'
import { WorksGrid } from '../WorksGrid/WorksGrid'
import Button from '../../../../UI/Button/Button'
import { WorkTypesModal } from '../WorkTypesModal/WorkTypesModal'
import { classConnection } from '../../../../utils/function'
import { WorkTab } from '../WorkTab/WorkTab'
import useRequest from '../../../../utils/hooks/useRequest'
import { IWorkGetParam, workApi, workTypeApi } from '../../../../http'
import { useMessage } from '../../../MessageContext'
import { Pagination } from '../../../../components/Pagination/Pagination'

export const WorksSection: FC = observer(() => {
    const [isTypesModalOpen, setIsTypesModalOpen] = useState<boolean>(false)
    const [currentParam, setCurrentParam] = useState<IWorkGetParam>({
        page: 1,
        limit: 10,
        typeId: undefined
    })
    const [
        works,
        worksIsLoading,
        worksError,
        _,
        setFetchParam
    ] = useRequest<IGetAllJSON<IWork>>(workApi.getWorks, currentParam);
    const [
        workTypes,
        workTypesIsLoading,
        workTypesError,
    ] = useRequest<IGetAllJSON<IWorksType>>(workTypeApi.getWorkTypes);
    const { addMessage } = useMessage()
    useEffect(() => {
        worksStore.setWorks(works?.rows || [])
    }, [works])
    useEffect(() => {
        if (workTypes?.count) {
            worksStore.setWorkTypes(workTypes.rows)
        }
    }, [workTypes])
    useEffect(() => {
        if (worksError && worksError !== applicationStore.error) {
            applicationStore.setError(worksError)
            addMessage(worksError, 'error')
        }
    }, [worksError])
    useEffect(() => {
        if (workTypesError && workTypesError !== applicationStore.error) {
            applicationStore.setError(workTypesError)
            addMessage(workTypesError, 'error')
        }
    }, [workTypesError])
    useEffect(() => {
        window.scrollTo(0, 0);
        setFetchParam(currentParam)
    }, [currentParam])
    const changeActiveTab = useCallback((id?: number) => {
        setCurrentParam(prev => ({ ...prev, typeId: id, page: 1 }))
    }, [setCurrentParam])
    return (
        <div className={classes.works}>
            <aside className={classes.works__aside}>
                <h1 className={classes.works__title}>Мои работы</h1>
                <nav
                    className={classConnection(classes.works__tabs)}
                    aria-label={'Виды работ'}
                >
                    {
                        workTypesIsLoading
                            ? [1, 2, 3, 4].map(i => (<div key={i} className={classConnection(classes.works__tab, classes.works__tab_empty, 'loading')}>{i}</div>))
                            : null
                    }
                    {
                        !!worksStore.workTypes.length
                            ? <>
                                <WorkTab
                                    className={classConnection(
                                        classes.works__tab,
                                        !currentParam.typeId ? classes.works__tab_active : ''
                                    )}
                                    onClick={() => changeActiveTab(undefined)}
                                    title='Все работы'
                                    isActive={currentParam.typeId === undefined}
                                />
                                {
                                    worksStore.workTypes.map(tab => {
                                        if (!tab.name) return
                                        return (
                                            <WorkTab
                                                className={classConnection(
                                                    classes.works__tab,
                                                    currentParam.typeId === tab.id
                                                        ? classes.works__tab_active
                                                        : ''
                                                )}
                                                key={tab.id}
                                                onClick={() => changeActiveTab(tab.id)}
                                                title={tab.name}
                                                isActive={currentParam.typeId === tab.id}
                                            />

                                        )
                                    })
                                }</>
                            : null
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
                    works={worksStore.works}
                    isLoading={worksIsLoading}
                />
                <Pagination
                    className={classes.works__pagination}
                    currentPage={currentParam.page || 1}
                    itemCount={works?.count || 0}
                    limit={currentParam.limit || 10}
                    onChange={(page) => setCurrentParam((prev) => ({ ...prev, page }))}
                />
                {
                    !worksStore.works.length && !worksIsLoading
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
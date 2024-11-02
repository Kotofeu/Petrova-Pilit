import { FC, memo, useState } from 'react'
import classes from './WorkByIdSection.module.scss'
import Section from '../../../../components/Section/Section'
import DateTime from '../../../../UI/DateTime/DateTime'
import BeforeAfterSlider from '../../../../components/BeforeAfterSlider/BeforeAfterSlider'
import { WorkImagesGrid } from '../WorkImagesGrid/WorkImagesGrid'
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton'
import ModalOk from '../../../../components/Modal/ModalOk'
import Error404 from '../../../../components/Error404/Error404'
import { WORKS_ROUTE } from '../../../../utils/const/routes'
import { IWork } from '../../../../store'
import { classConnection } from '../../../../utils/function'

interface IWorkByIdSection {
    work?: IWork;
    isAdmin?: boolean;
    isLoading?: boolean;
    openModal: () => void;
    deleteWork: () => void;
}

export const WorkByIdSection: FC<IWorkByIdSection> = memo(({
    work,
    isAdmin = false,
    isLoading,
    openModal,
    deleteWork
}) => {
    const [isDelete, setIsDelete] = useState<boolean>(false)

    if ((!work || (!work.imageAfterSrc && !work.imageBeforeSrc) || !work.name) || isLoading) {

        if (isLoading) {
            return (
                <Section className={classes.workById}>
                    <div className={classConnection(classes.workById__inner, 'loading')}>
                        <div className={classes.workById__inner_empty}>
                            
                        </div>
                    </div>
                </Section>
            )
        }
        else {
            return (
                <Error404
                    page={WORKS_ROUTE}
                    text='Работа не найдена'
                    buttonText='Вернуться к работам'
                />
            )
        }
    }

    return (
        <>
            <Section className={classes.workById} isUnderline={!!work.images?.length}>
                {
                    isAdmin
                        ? <div className={classes.workById__buttons}>
                            <ControllerButton
                                className={classes.workById__button}
                                onClick={openModal}
                                title='Редактировать пост'
                                type='edit'
                            />
                            <ControllerButton
                                className={classes.workById__button}
                                onClick={() => setIsDelete(true)}
                                title='Удалить пост'
                                type='delete'
                            />
                        </div>
                        : null
                }

                <div className={classes.workById__inner}>
                    {
                        (work.imageAfterSrc && work.imageBeforeSrc)
                            ? <BeforeAfterSlider
                                className={classes.workById__slider}
                                before={work.imageBeforeSrc || ''}
                                after={work.imageAfterSrc || ''}

                            />
                            : <img
                                className={classes.workById__preview}
                                src={work.imageAfterSrc || work.imageBeforeSrc || ''}
                                alt={work.name}
                            />
                    }
                    <div className={classes.workById__text}>
                        <h1 className={classes.workById__title}>{work.name}</h1>
                        {
                            work.createdAt
                                ? <DateTime
                                    className={classes.workById__date}
                                    date={work.createdAt}
                                    addTime
                                />
                                : null
                        }

                        <div
                            className={classes.workById__desc}
                        >
                            {
                                !!work.description && work.description?.split('\n').map(paragraph =>
                                    <p
                                        className={classes.workById__paragraph}
                                        key={paragraph}
                                    >
                                        {paragraph}
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </div>
            </Section>
            {
                work.images?.length ?
                    <WorkImagesGrid
                        images={work.images}
                    />
                    : null
            }
            <ModalOk
                isOpen={isDelete}
                closeModal={() => setIsDelete(false)}
                onOkClick={deleteWork}
            />
        </>


    )
})

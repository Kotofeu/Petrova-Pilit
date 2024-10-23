import { FC, memo, useState } from 'react'
import classes from './WorkByIdSection.module.scss'
import Section from '../../../../components/Section/Section'
import { IWorks } from '../../../../store'
import DateTime from '../../../../UI/DateTime/DateTime'
import BeforeAfterSlider from '../../../../components/BeforeAfterSlider/BeforeAfterSlider'
import { WorkImagesGrid } from '../WorkImagesGrid/WorkImagesGrid'
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton'
import ModalOk from '../../../../components/Modal/ModalOk'
import Error404 from '../../../../components/Error404/Error404'
import { WORKS_ROUTE } from '../../../../utils/const/routes'

interface IWorkByIdSection {
    work?: IWorks;
    isAdmin?: boolean;
    openModal: () => void;
    deleteWork: (id: number) => void;
}

export const WorkByIdSection: FC<IWorkByIdSection> = memo(({
    work,
    isAdmin = false,
    openModal,
    deleteWork
}) => {
    const [isDelete, setIsDelete] = useState<boolean>(false)
    if (!work || (!work.imageAfterSrc && !work.imageBeforeSrc) || !work.name) {
        return (
            <Error404
                page={WORKS_ROUTE}
                text='Работа не найдена'
                buttonText='Вернуться к работам'
            />
        )
    }
    return (
        <>
            <Section className={classes.workById} isUnderline={!!work.othersImage?.length}>
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
                                src={work.imageAfterSrc || work.imageBeforeSrc}
                                alt={work.name}
                            />
                    }
                    <div className={classes.workById__text}>
                        <h1 className={classes.workById__title}>{work.name}</h1>
                        <DateTime
                            className={classes.workById__date}
                            date={work.time}
                            addTime
                        />
                        <div
                            className={classes.workById__desc}
                        >
                            {
                                work.description?.split('\n').map(paragraph =>
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
                work.othersImage?.length ?
                    <WorkImagesGrid
                        images={work.othersImage}
                    />
                    : null
            }
            <ModalOk
                isOpen={isDelete}
                closeModal={() => setIsDelete(false)}
                onOkClick={() => deleteWork(work.id)}
            />
        </>


    )
})

/**
 * 
const images: IImages[] = useMemo(() => {
    if (!work) return [];
    return [
        work.afterImage,
        work.beforeImage,
        ...(work.othersImage !== undefined
            ? work.othersImage.filter(image => image !== null)
            : []),
    ].filter(image => image !== null) as IImages[];
}, [work]);



<Slider
    className={classes.workById__slider}
    items={images}
    renderItem={
        (work) =>
            <img
                className={classes.workById__image}
                key={work.id}
                src={work.imageSrc}
            />
    }
    slideClassName={classes.workById__slide}
    draggable
    looped
    slidesToShow={1}
    slidesToScroll={1}
/>
                        
 */
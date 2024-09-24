import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import classes from './WorkByIdSection.module.scss'
import Section from '../../../../components/Section/Section'
import { observer } from 'mobx-react-lite'
import { worksStore } from '../../../../store'
import DateTime from '../../../../UI/DateTime/DateTime'
import BeforeAfterSlider from '../../../../components/BeforeAfterSlider/BeforeAfterSlider'
import { WorkImagesGrid } from '../WorkImagesGrid/WorkImagesGrid'

export const WorkByIdSection = observer(() => {
    const params = useParams();

    const work = useMemo(() => {
        if (params.id) return worksStore.loadWorkById(+params.id)
    }, [params])


    if (!work) return null
    if (!work.afterImage?.imageSrc && !work.beforeImage?.imageSrc) return null
    if (!work.title) return null
    return (
        <>
            <Section className={classes.workById} isUnderline={!!work.othersImage?.length}>
                <div className={classes.workById__inner}>
                    {
                        (work.afterImage?.imageSrc && work.beforeImage?.imageSrc)
                            ? <BeforeAfterSlider
                                className={classes.workById__slider}
                                before={work.beforeImage?.imageSrc || ''}
                                after={work.afterImage?.imageSrc || ''}

                            />
                            : <img
                                className={classes.workById__preview}
                                src={work.afterImage?.imageSrc || work.beforeImage?.imageSrc}
                                alt={work.title}
                            />
                    }
                    <div className={classes.workById__text}>
                        <h1 className={classes.workById__title}>{work.title}</h1>
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
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import classes from './WorkByIdSection.module.scss'
import Section from '../../../../components/Section/Section'
import { observer } from 'mobx-react-lite'
import { IImages, worksStore } from '../../../../store'
import { Slider } from '../../../../components/Slider'

export const WorkByIdSection = observer(() => {
    const params = useParams();

    const work = useMemo(() => {
        if (params.id) return worksStore.loadWorkById(+params.id)
    }, [params])


    if (!work) return null

    return (
        <Section className={classes.workById}>
            <div className={classes.workById__inner}>
                <h1 className={classes.workById__title}>{work.title}</h1>
                {
                    work.description?.split('\n').map(paragraph=> 
                        <p className={classes.workById__desc}>{paragraph}</p>

                    )
                }
            </div>
        </Section>

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
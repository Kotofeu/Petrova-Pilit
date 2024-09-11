import { useEffect } from 'react'
import { Slider } from '../../../../components/Slider'
import { observer } from 'mobx-react-lite'


import classes from './HomeWorksSlider.module.scss'
import { HomeWorkSlide } from '../HomeWorkSlide/HomeWorkSlide'
import { worksStore } from '../../../../store'

export const HomeWorksSlider = observer(() => {
    useEffect(() => {
        worksStore.loadWorks()
    }, [])
    return (
        <Slider
            className={classes.homeWorksSlider}
            items={worksStore.works}
            renderItem={
                (work) =>
                    <HomeWorkSlide
                        className={classes.homeWorksSlider__slide}
                        key={work.id}
                        work={work}
                    />
            }
            addDots
            autoplay
            autoplayDelay={5000}
            draggable
            looped
            slidesToShow={3}
            slidesToScroll={1}

        />)
})
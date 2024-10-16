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
            breakpoints={[
                {
                    width: 550,
                    slideToShow: 2,
                    slideToScroll: 1,
                },
                {
                    width: 1000,
                    slideToShow: 3,
                    slideToScroll: 1,
                },
            ]}
            addDots
            autoplay
            autoplayDelay={5000}
            draggable
            looped
            slidesToShow={1}
            slidesToScroll={1}

        />)
})
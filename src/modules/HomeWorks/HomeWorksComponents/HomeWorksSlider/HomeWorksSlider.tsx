import { Slider } from '../../../../components/Slider'
import { observer } from 'mobx-react-lite'


import classes from './HomeWorksSlider.module.scss'
import { HomeWorkSlide } from '../HomeWorkSlide/HomeWorkSlide'
import { worksStore } from '../../../../store'

export const HomeWorksSlider = observer(() => {
    return (
        <Slider
            className={classes.homeWorksSlider}
            items={worksStore.works}
            renderItem={
                (work) =>
                    <HomeWorkSlide
                        className={classes.homeWorksSlider__slide}
                        key={work.id}
                        id = {work.id}
                        afterImage={work.afterImage}
                        beforeImage={work.beforeImage}
                        rating={work.rating}
                        title={work.title}
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
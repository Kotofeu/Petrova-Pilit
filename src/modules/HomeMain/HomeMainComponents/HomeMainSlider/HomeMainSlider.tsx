import {memo} from 'react'
import { Slider } from '../../../../components/Slider'

import sliderImage1 from '../../../../assets/images/12_11zon.jpg'
import sliderImage2 from '../../../../assets/images/background/1.png'
import sliderImage3 from '../../../../assets/images/background/2.png'

import classes from './HomeMainSlider.module.scss'
const slides = [
    {
        id: 1,
        image: sliderImage1,
    },
    {
        id: 2,
        image: sliderImage2,
    },
    {
        id: 3,
        image: sliderImage3,
    },
]
export const HomeMainSlider = memo(() => {
    return (
        <Slider
            className={classes.homeMainSlider}
            items={slides}
            renderItem={
                (item) =>
                    <div className={classes.homeMainSlider__slide}>
                        <img className={classes.homeMainSlider__image} src={item.image} alt={item.image}/>
                    </div>
            }
            addArrows
            draggable
            looped
            autoplay
            autoplayDelay={5000}
            slidesToShow={1}
            slidesToScroll={1}
        />)
})

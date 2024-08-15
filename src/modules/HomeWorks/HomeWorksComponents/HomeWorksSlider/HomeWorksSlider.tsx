import { memo } from 'react'
import { Slider } from '../../../../components/Slider'

import sliderImage1 from '../../../../assets/images/nails/1.jpg'
import sliderImage2 from '../../../../assets/images/nails/2.jpg'
import sliderImage3 from '../../../../assets/images/nails/3.jpg'
import sliderImage4 from '../../../../assets/images/nails/4.jpg'
import sliderImage5 from '../../../../assets/images/nails/5.jpg'

import classes from './HomeWorksSlider.module.scss'
import { HomeWorkSlide } from '../HomeWorkSlide/HomeWorkSlide'
const slides = [
    {
        id: 1,
        after: sliderImage5,
        before: sliderImage1,
        title: 'Я выбираю пилить ноготочки, а не мозги😏',
        rating: 5

    },
    {
        id: 2,
        after: sliderImage4,
        before: sliderImage3,
        title: 'Восстановление архитектуры? WTF?🤔',
        rating: 4
    },
    {
        id: 3,
        before: sliderImage4,
        title: 'Закрываем апрель🔥🔥'
    },
    {
        id: 4,
        after: sliderImage3,
        before: sliderImage1,
        title: 'Очень Очень БОЛЬШОООООООЙ ТЕКСТ БЛА БЛА БЛА БЛА'
    },
    {
        id: 5,
        before: sliderImage4,
        title: 'Очень Очень БОЛЬШОООООООЙ ТЕКСТ  БЛА БЛА'
    },
]

export const HomeWorksSlider = memo(() => {
    return (
        <Slider
            className={classes.homeWorksSlider}
            items={slides}
            renderItem={
                (item) =>
                    <HomeWorkSlide
                        className={classes.homeWorksSlider__slide}
                        key={item.title}
                        afterImage={item.after}
                        beforeImage={item.before}
                        rating={item.rating}
                        title={item.title}
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

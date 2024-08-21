import { observer } from 'mobx-react-lite'

import classes from './HomeReviewsSlider.module.scss'
import { Slider } from '../../../../components/Slider'
import { HomeReviewsSlide } from '../HomeReviewsSlide/HomeReviewsSlide'
import { reviewsStore } from '../../../../store'

export const HomeReviewsSlider = observer(() => {
    return (
        <Slider
            className={classes.homeReviewsSlider}
            items={reviewsStore.reviews}
            renderItem={
                (review) =>
                    <HomeReviewsSlide
                        className={classes.homeReviewsSlider__review}
                        key={review.id}
                        review={review}
                    />
            }
            autoplay
            autoplayDelay={5000}
            slideClassName={classes.homeReviewsSlider__slide}
            addDots
            draggable
            looped
            slidesToShow={3}
            slidesToScroll={1}

        />)
})
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import { observer } from 'mobx-react-lite'

import { ID_PARAM, REVIEWS_ROUTE } from '../../../../utils/const/routes'

import { Slider } from '../../../../components/Slider'
import { reviewsStore } from '../../../../store'
import ReviewCard from '../../../../components/ReviewCard/ReviewCard'
import classes from './HomeReviewsSlider.module.scss'


export const HomeReviewsSlider = observer(() => {
    const router = useNavigate()

    const onSlideClick = useCallback((event: React.MouseEvent<HTMLElement>, id: number) => {
        event.preventDefault()
        window.scrollTo(0, 0)
        router(`${REVIEWS_ROUTE}/?${ID_PARAM}=${id}`)
    }, [])

    return (
        <Slider
            className={classes.homeReviewsSlider}
            items={reviewsStore.reviews}
            renderItem={
                (review) =>
                    <ReviewCard
                        className={classes.homeReviewsSlider__review}
                        key={review.id}
                        review={review}
                        onClick={(event) => onSlideClick(event, review.id)}
                        isShortCard
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

        />
    )
})
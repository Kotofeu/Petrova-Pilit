import React, { FC, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { IReviews } from '../../../../store';
import { REVIEWS_ROUTE } from '../../../../utils/const/routes';
import classConnection from '../../../../utils/function/classConnection';
import classes from './HomeReviewsSlide.module.scss'
import StarRating from '../../../../UI/StarRating/StarRating';
import DateTime from '../../../../UI/DateTime/DateTime';
import defaultUSerIcon from '../../../../assets/icons/User-icon.svg'
interface IHomeReviewsSlide {
    className?: string;
    review: IReviews;
}

export const HomeReviewsSlide: FC<IHomeReviewsSlide> = memo((props) => {
    const { className, review } = props
    const { id, user, title, time, rating, imagesSrc } = review
    const router = useNavigate()

    const onSlideClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        router(`${REVIEWS_ROUTE}/${id}`)
    }, [id])
    if (!title || !rating || !time) return null
    return (
        <article className={classConnection(classes.homeReviewsSlide, className)}>
            <header className={classes.homeReviewsSlide__header}>
                <div className={classes.homeReviewsSlide__userIcon}>
                    <img src={user.imageSrc || defaultUSerIcon} alt={user.name} />
                </div>
                <div className={classes.homeReviewsSlide__reviewInfo}>
                    <div className={classes.homeReviewsSlide__reviewUser}>
                        <h6 className={classes.homeReviewsSlide__userName}>{user.name}</h6>
                        <StarRating className={classes.homeReviewsSlide__rating} rating={rating} />
                    </div>

                    <DateTime className={classes.homeReviewsSlide__date} date={time} />
                </div>
            </header>
            <div className={classes.homeReviewsSlide__text}>
                {title}
            </div>
            {
                imagesSrc?.length
                    ?
                    <div className={classes.homeReviewsSlide__lookMore} onClick={onSlideClick}>
                        Посмотреть подробнее
                    </div>
                    : null
            }

        </article >
    )
})

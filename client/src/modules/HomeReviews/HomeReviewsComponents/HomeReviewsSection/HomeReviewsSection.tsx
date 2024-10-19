import {memo} from 'react'
import Section from '../../../../components/Section/Section'
import Background from '../../../../assets/images/heart.png';
import classes from './HomeReviewsSection.module.scss'
import { NavLink } from 'react-router-dom';
import { IS_WRITING_PARAM, REVIEWS_ROUTE } from '../../../../utils/const/routes';
import { HomeReviewsSlider } from '../HomeReviewsSlider/HomeReviewsSlider';
export const HomeReviewsSection = memo(() => {
    return (
        <Section className={classes.homeReviews} backgroundImage={Background}>
            <div className={classes.homeReviews__titleBox}>
                <h2 className={classes.homeReviews__title}>
                    Узнайте, что думают<br/><span> клиенты </span>о моей работе
                </h2>
                <NavLink to={`${REVIEWS_ROUTE}/?${IS_WRITING_PARAM}=${true}`} className={classes.homeReviews__button} onClick={() => window.scrollTo(0, 0)}>
                    <span className={classes.homeReviews__buttonDecoration}>Были у меня? Оставьте свой отзыв!</span>
                </NavLink>
            </div>
            <HomeReviewsSlider className={classes.homeReviews__slider} />
        </Section>
    )
})

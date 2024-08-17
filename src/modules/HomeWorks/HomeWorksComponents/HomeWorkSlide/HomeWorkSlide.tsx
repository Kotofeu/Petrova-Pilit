import { memo, FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

import classConnection from '../../../../utils/function/classConnection';
import StarRating from '../../../../UI/StarRating/StarRating';
import { WORKS_ROUTE } from '../../../../utils/const/routes';

import { HomeWorkSlideImage } from '../HomeWorkSlideImage/HomeWorkSlideImage';

import classes from './HomeWorkSlide.module.scss'


interface IHomeWorkSlide {
    className?: string;
    id: number;
    afterImage?: string;
    beforeImage?: string;
    title?: string;
    rating?: number;
}
export const HomeWorkSlide: FC<IHomeWorkSlide> = memo((props) => {
    const { className, id, afterImage, beforeImage, title, rating } = props
    const router = useNavigate()

    const onSlideClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        router(`${WORKS_ROUTE}/${id}`)
    }, [id])
    if (!afterImage && !beforeImage) return null
    const isSlice: boolean = !!afterImage && !!beforeImage
    return (
        <div className={classConnection(classes.homeWorkSlide, className)}>
            <div className={classes.homeWorkSlide__preview}>
                {
                    isSlice ?
                        <>

                            <HomeWorkSlideImage
                                className={classes.homeWorkSlide__image}
                                type='before'
                                imageSrc={beforeImage}
                                alt={`${title} до работы`}
                            />
                            <HomeWorkSlideImage
                                className={classes.homeWorkSlide__image}
                                type='after'
                                imageSrc={afterImage}
                                alt={`${title} после работы`}
                            />
                        </>
                        :
                        <HomeWorkSlideImage
                            className={classes.homeWorkSlide__image}
                            imageSrc={afterImage || beforeImage}
                            alt={title}
                        />
                }
            </div >
            <div
                className={classes.homeWorkSlide__content}
                onClick={onSlideClick}
            >
                <h6 className={classes.homeWorkSlide__title}>
                    {title}
                </h6>
                {
                    rating && <StarRating
                        className={classes.homeWorkSlide__rating}
                        rating={rating}
                    />
                }

            </div>
        </div >
    )
})

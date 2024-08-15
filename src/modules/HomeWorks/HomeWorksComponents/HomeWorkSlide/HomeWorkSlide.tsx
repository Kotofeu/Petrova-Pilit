import { memo, FC } from 'react'
import classConnection from '../../../../utils/function/classConnection';
import classes from './HomeWorkSlide.module.scss'
import StarRating from '../../../../UI/StarRating/StarRating';

interface IHomeWorkSlide {
    className?: string;
    afterImage?: string;
    beforeImage?: string;
    title?: string;
    rating?: number;
}
export const HomeWorkSlide: FC<IHomeWorkSlide> = memo((props) => {
    const { className, afterImage, beforeImage, title, rating } = props

    if (!afterImage && !beforeImage) return null
    const isSlice: boolean = !!afterImage && !!beforeImage
    return (
        <div className={classConnection(classes.homeWorkSlide, className)}>
            <div className={classes.homeWorkSlide__preview}>
                {
                    isSlice ?
                        <>
                            <div className={classConnection(classes.homeWorkSlide__imageBox, classes.homeWorkSlide__imageBox_before)}>
                                <img
                                    className={classes.homeWorkSlide__image}
                                    src={beforeImage}
                                    alt={`${title} до работы`}
                                />
                            </div>

                            <div className={classConnection(classes.homeWorkSlide__imageBox, classes.homeWorkSlide__imageBox_after)}>
                                <img
                                    className={classes.homeWorkSlide__image}
                                    src={afterImage}
                                    alt={`${title} после работы`}
                                />
                            </div>
                        </>
                        :
                        <img className={classes.homeWorkSlide__image} src={afterImage || beforeImage} alt={title} />
                }
            </div>
            <div className={classes.homeWorkSlide__content}>
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
        </div>
    )
})

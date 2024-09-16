import { memo, FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

import classConnection from '../../../../utils/function/classConnection';
import { WORKS_ROUTE } from '../../../../utils/const/routes';

import { HomeWorkSlideImage } from '../HomeWorkSlideImage/HomeWorkSlideImage';

import classes from './HomeWorkSlide.module.scss'
import { IWorks } from '../../../../store';


interface IHomeWorkSlide {
    className?: string;
    work: IWorks;
}
export const HomeWorkSlide: FC<IHomeWorkSlide> = memo((props) => {
    const { className, work } = props
    const {id, afterImage, beforeImage, title} = work
    const router = useNavigate()

    const onSlideClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        window.scrollTo(0, 0)
        router(`${WORKS_ROUTE}/${id}`)
    }, [id])
    if (!afterImage && !beforeImage) return null
    const isSlice: boolean = !!afterImage && !!beforeImage
    return (
        <article className={classConnection(classes.homeWorkSlide, className)}>
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
            </div>
        </article >
    )
})

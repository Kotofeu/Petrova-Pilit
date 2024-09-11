import React, { FC, memo, ReactNode, useMemo} from 'react'; 
import { IReviews } from '../../store'; 
import classConnection from '../../utils/function/classConnection'; 
import StarRating from '../../UI/StarRating/StarRating'; 
import DateTime from '../../UI/DateTime/DateTime'; 
import defaultUSerIcon from '../../assets/icons/User-icon.svg'; 

import classes from './ReviewCard.module.scss'; 

interface IReviewCard { 
    className?: string; 
    review: IReviews; 
    isShortCard?: boolean; 
    onClick?: (event: React.MouseEvent<HTMLElement>) => void; 
    children?: ReactNode; 
} 

const ReviewCard: FC<IReviewCard> = memo((props) => { 
    const { className, review, isShortCard, onClick, children } = props; 
    const { user, title, time, rating } = review; 
    const memoizedChildren = useMemo(() => {
        return children;
    }, [children]);

    if (!title || !rating || !time) return null; 

    return ( 
        <article 
            className={classConnection( 
                classes.reviewCard, 
                isShortCard ? classes.reviewCard_short : '', 
                className 
            )} 
            onClick={onClick} 
        > 
            <header className={classes.reviewCard__header}> 
                <div className={classes.reviewCard__userIcon}> 
                    <img src={user.imageSrc || defaultUSerIcon} alt={user.name} /> 
                </div> 
                <div className={classes.reviewCard__reviewInfo}> 
                    <div className={classes.reviewCard__reviewUser}> 
                        <h6 className={classes.reviewCard__userName} title={user.name}>{user.name}</h6> 
                        <StarRating className={classes.reviewCard__rating} rating={rating} /> 
                    </div> 
                    <DateTime className={classes.reviewCard__date} date={time} /> 
                </div> 
            </header> 
            <div className={classes.reviewCard__text}> 
                {title} 
            </div> 
            <footer className={classes.reviewCard__footer}> 
                {
                    memoizedChildren
                }
                {isShortCard && ( 
                    <div className={classes.reviewCard__lookMore}> 
                        Посмотреть подробнее 
                    </div> 
                )} 
            </footer> 
        </article> 
    ); 
}); 

export default ReviewCard;
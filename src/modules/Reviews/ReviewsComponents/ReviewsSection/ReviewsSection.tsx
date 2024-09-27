import { ReviewsNavbar } from '../ReviewsNavbar/ReviewsNavbar'
import classes from './ReviewsSection.module.scss'
import { ReviewCardImages } from '../ReviewCardImages/ReviewCardImages'
import { reviewsStore } from '../../../../store'
import { observer } from 'mobx-react-lite'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { ID_PARAM } from '../../../../utils/const/routes'
import { classConnection } from '../../../../utils/function'
export const ReviewsSection = observer(() => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get(ID_PARAM);
    const parsedId = id ? parseInt(id) : undefined;
    const selectedReview = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedReview.current) {
            selectedReview.current.scrollIntoView(
                {
                    behavior: "smooth",
                    block: "center",
                    inline: "nearest"
                }
            );
        }
    }, [selectedReview, reviewsStore.reviews, selectedReview.current])
    return (
        <div className={classes.reviewsSection}>
            <ReviewsNavbar />
            <div className={classes.reviewsSection__list}>
                {
                    reviewsStore.reviews.map(review =>
                        <div
                            ref={parsedId === review.id ? selectedReview : undefined}
                            key={review.id}
                        >
                            <ReviewCardImages
                                className={
                                    classConnection(
                                        classes.reviewsSection__review,
                                        parsedId === review.id ? classes.reviewsSection__review_selected : ''
                                    )
                                }
                                review={review}
                            />
                        </div>

                    )
                }
            </div>
        </div>
    )
})

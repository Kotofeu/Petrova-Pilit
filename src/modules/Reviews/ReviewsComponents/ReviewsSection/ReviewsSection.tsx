import { ReviewsNavbar } from '../ReviewsNavbar/ReviewsNavbar'
import classes from './ReviewsSection.module.scss'
import { ReviewCardImages } from '../ReviewCardImages/ReviewCardImages'
import { reviewsStore } from '../../../../store'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
export const ReviewsSection = observer(() => {
    const params = useParams();
    const selectedReview = useRef<HTMLDivElement>(null)
    const id: number | undefined = params.id ? +params.id : undefined
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
                            ref={id === review.id ? selectedReview : undefined}
                            key={review.id}
                        >
                            <ReviewCardImages
                                className={id === review.id ? classes.reviewsSection__review_selected : ''}
                                review={review}
                            />
                        </div>

                    )
                }
            </div>
        </div>
    )
})

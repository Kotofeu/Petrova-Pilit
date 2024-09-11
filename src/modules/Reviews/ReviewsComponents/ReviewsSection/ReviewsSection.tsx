import { ReviewsNavbar } from '../ReviewsNavbar/ReviewsNavbar'
import classes from './ReviewsSection.module.scss'
import { ReviewCardImages } from '../ReviewCardImages/ReviewCardImages'
import { reviewsStore } from '../../../../store'
import { observer } from 'mobx-react-lite'
export const ReviewsSection = observer(() => {
    return (
        <div className={classes.reviewsSection}>
            <ReviewsNavbar />
            <div className={classes.reviewsSection__list}>
                {
                    reviewsStore.reviews.map(review =>
                        <ReviewCardImages key={review.id} review={review} />
                    )
                }
            </div>
        </div>
    )
})

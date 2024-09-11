import { FC, memo, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { IReviews } from '../../../../store';
import ReviewCard from '../../../../components/ReviewCard/ReviewCard';
import { ModalSlider } from '../../../../components/Slider';
import classes from './ReviewCardImages.module.scss'
import classConnection from '../../../../utils/function/classConnection';
interface IReviewCard {
    className?: string;
    review: IReviews;
}

export const ReviewCardImages: FC<IReviewCard> = memo((props) => {
    const { className, review } = props
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [activeImage, setActiveImage] = useState<number>(0)
    const openModal = (index: number) => {
        setIsOpen(true)
        document.body.style.overflowY = 'hidden';
        setActiveImage(index)
    }
    const closeModal = () => {
        setIsOpen(false)
        document.body.style.overflowY = 'auto';
        setActiveImage(0)
    }
    const images = useMemo(() => {
        const maxLength = 6
        if (!review.images?.length) return null
        return review.images.length > maxLength
            ? review.images.slice(0, maxLength)
            : review.images;
    }, [review])
    return (
        <ReviewCard
            className={classConnection(classes.reviewCard, className)}
            review={review}
        >
            {
                images ?
                    <div>
                        <div className={classes.reviewCard__userImages}>
                            {images.map((image, index) =>
                                <div
                                    className={classes.reviewCard__imageBox}
                                    key={image.id}
                                    onClick={() => openModal(index)}
                                >
                                    <img
                                        className={classes.reviewCard__image}
                                        src={image.imageSrc}
                                        alt={`Фотография к отзыву пользователя ${review.user.name} №${index+1}`}

                                    />
                                </div>
                            )}
                        </div>
                        <ModalSlider
                            isOpen={isOpen}
                            closeModal={closeModal}
                            items={images}
                            renderItem={(image, index) => (
                                <motion.img
                                    className={classes.reviewCard__modalImage}
                                    key={image.id}
                                    src={image.imageSrc}
                                    alt={`Фотография к отзыву пользователя ${review.user.name} №${index+1}`}
                                />
                            )}
                            initialSlide={activeImage}
                            addArrows
                            slideClassName={classes.reviewCard__slide}
                            draggable
                        />

                    </div>
                    : null
            }
        </ReviewCard>
    )
})
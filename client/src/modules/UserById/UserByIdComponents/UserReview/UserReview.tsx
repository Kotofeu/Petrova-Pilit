import { useMemo, FC, useCallback, useState } from 'react'
import ReviewCard from '../../../../components/ReviewCard/ReviewCard'
import { IReviews, IUser, reviewsStore } from '../../../../store'

import classes from './UserReview.module.scss'
import { observer } from 'mobx-react-lite';
import ModalOk from '../../../../components/Modal/ModalOk';
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton';
import Button from '../../../../UI/Button/Button';
import { useMessage } from '../../../MessageContext';

interface IUserReview {
    user: IUser;
    userReview: IReviews;
}

export const UserReview: FC<IUserReview> = observer(({ user, userReview }) => {
    // Если number - удалить изображение, число это id изображения
    const [action, setAction] = useState<'deleteReview' | number | undefined>()
    const { addMessage } = useMessage();
    const images = useMemo(() => {
        if (!userReview) return null
        if (!userReview.reviews_images?.length) return null
        return userReview.reviews_images
    }, [userReview])
    const userAction = useCallback(() => {
        if (action === 'deleteReview') {
            reviewsStore.deleteReviewById(userReview.id)
            addMessage('Вы удалили отзыв', 'message')
        }
        else if (action && Number(action)) {
            reviewsStore.deleteReviewImageById(action)
            addMessage('Вы удалили фото', 'message')

        }
    }, [action, reviewsStore])
    return (
        <div className={classes.userReview}>

            <ReviewCard
                className={classes.userReview__review}
                review={userReview}
            >
                <Button
                    className={classes.userReview__deleteReview}
                    title='Удалить отзыв'
                    onClick={() => setAction('deleteReview')}
                >
                    Удалить отзыв
                </Button>
                {
                    images?.length
                        ? <div className={classes.userReview__images}>

                            {images.map((image, index) =>
                                <div
                                    className={classes.userReview__imageBox}
                                    key={image.id}
                                >
                                    <ControllerButton
                                        className={classes.userReview__deleteImage}
                                        type='delete'
                                        onClick={() => setAction(image.id)}
                                        title='Удалить изображение'
                                    />
                                    <img
                                        className={classes.userReview__image}
                                        src={image.imageSrc}
                                        alt={`Фотография к отзыву пользователя ${user?.name} №${index + 1}`}
                                        aria-label={`Фотография к отзыву пользователя ${user?.name} №${index + 1}`}
                                    />

                                    <img
                                        className={classes.userReview__background}
                                        src={image.imageSrc}
                                        alt={`Фотография к отзыву пользователя ${user?.name} №${index + 1}`}
                                        aria-hidden
                                    />
                                </div>
                            )}
                        </div>
                        : null
                }

            </ReviewCard>
            <ModalOk
                isOpen={action !== undefined}
                closeModal={() => setAction(undefined)}
                onOkClick={userAction}
            />
        </div >
    )

})

import { FC, useState } from 'react';
import classes from './ReviewsNavbar.module.scss';
import Button from '../../../../UI/Button/Button';
import { ReviewModal } from '../ReviewModal/ReviewModal';
import { useSearchParams } from 'react-router-dom';
import { IS_WRITING_PARAM } from '../../../../utils/const/routes';
import { userStore } from '../../../../store';
import { observer } from 'mobx-react-lite';
import { classConnection } from '../../../../utils/function';

interface IReviewsNavbar {
    className?: string;
}
export const ReviewsNavbar: FC<IReviewsNavbar> = observer(({className}) => {
    const [searchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(searchParams.get(IS_WRITING_PARAM) === 'true');
    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <>
            <aside className={classConnection(classes.reviewsNavbar, className)}>
                <div className={classes.reviewsNavbar__inner}>
                    <h1 className={classes.reviewsNavbar__title}>
                        Отзывы моих <br />
                        клиентов
                    </h1>
                    <Button
                        className={classes.reviewsNavbar__button}
                        onClick={openModal}
                    >
                        {
                            userStore.user?.review ? 'Редактируйте отзыв' : 'Напишите и свой'
                        }
                    </Button>

                </div>
            </aside>
            <ReviewModal
                isOpen={isOpen}
                closeModal={closeModal}
            />
        </>

    );
});
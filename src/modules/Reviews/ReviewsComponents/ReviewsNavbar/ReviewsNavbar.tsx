import React, { memo, useState } from 'react';
import classes from './ReviewsNavbar.module.scss';
import Button from '../../../../UI/Button/Button';
import { ReviewModal } from '../ReviewModal/ReviewModal';

export const ReviewsNavbar: React.FC = memo(() => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openModal = () => {
        setIsOpen(true)
        document.body.style.overflowY = 'hidden';
    }
    const closeModal = () => {
        setIsOpen(false)
        document.body.style.overflowY = 'auto';
    }
    return (
        <>
            <aside className={classes.reviewsNavbar}>
                <div className={classes.reviewsNavbar__inner}>
                    <h1 className={classes.reviewsNavbar__title}>
                        Отзывы моих <br />
                        клиентов
                    </h1>
                    <Button
                        className={classes.reviewsNavbar__button}
                        onClick={openModal}
                    >
                        Напишите и свой
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
import React, { memo, useState } from 'react';
import classes from './ReviewsNavbar.module.scss';
import Button from '../../../../UI/Button/Button';
import { ReviewModal } from '../ReviewModal/ReviewModal';
import { useSearchParams } from 'react-router-dom';
import { IS_WRITING_PARAM } from '../../../../utils/const/routes';

export const ReviewsNavbar: React.FC = memo(() => {
    const [searchParams] = useSearchParams();
    const [isOpen, setIsOpen] = useState<boolean>(searchParams.get(IS_WRITING_PARAM) === 'true');
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
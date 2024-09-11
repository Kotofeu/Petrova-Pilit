import React, { memo } from 'react';
import classes from './ReviewsNavbar.module.scss';
import Button from '../../../../UI/Button/Button';

export const ReviewsNavbar: React.FC = memo(() => {



    return (
        <aside className={classes.reviewsNavbar}>
            <div className={classes.reviewsNavbar__inner}>
                <h1 className={classes.reviewsNavbar__title}>
                    Отзывы моих <br />
                    клиентов
                </h1>
                <Button className={classes.reviewsNavbar__button}>
                    Напишите и свой
                </Button>
            </div>
            
        </aside>
    );
});
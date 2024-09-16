import { memo, FC, useState, useCallback } from 'react'
import { motion } from 'framer-motion';
import Input from '../../../../UI/Input/Input';
import StarRating from '../../../../UI/StarRating/StarRating';
import Button from '../../../../UI/Button/Button';
import classConnection from '../../../../utils/function/classConnection';
import { COMMENT, MAX_COMMENT_NAME, MAX_COMMENT_LENGTH, NAME, RATING, IReviewForm } from './const';

import classes from './ReviewModal.module.scss'


export const ReviewFormMain: FC<IReviewForm> = memo(({ isUserAuth, isOpen, closeModal, formValues, setFormValues }) => {
    const [commentError, setCommentError] = useState(false);
    const [nameError, setNameError] = useState(false);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        if (value.length > MAX_COMMENT_NAME) {
            setNameError(true)
            return
        }
        setNameError(false)
        setFormValues(prev => ({ ...prev, [NAME]: value }));
    }, []);

    const handleCommentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target;
        if (value.length > MAX_COMMENT_LENGTH) {
            setCommentError(true)
            return
        }
        setCommentError(false)
        setFormValues(prev => ({ ...prev, [COMMENT]: value }));
    }, []);

    const handleRatingChange = useCallback((rating: number) => {
        setFormValues(prev => ({ ...prev, [RATING]: rating }));
    }, []);

    if (!isOpen) return null

    return (

        <motion.div
            className={classes.modalContent}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
        >
            <h3 className={classes.modalContent__title}>Ваше честное мнение</h3>
            <div className={classes.modalContent__inner}>
                {!isUserAuth && (
                    <div className={classes.modalContent__inputRow}>
                        <h6 className={classes.modalContent__label} style={{ alignSelf: 'center' }}>
                            Как Вас зовут
                        </h6>
                        <div className={classes.modalContent__nameInputContainer}>
                            <Input
                                className={classConnection(
                                    classes.modalContent__nameInput,
                                    nameError ? classes.modalContent__nameInput_error : ''
                                )}
                                type="text"
                                name="name"
                                value={formValues.name}
                                onChange={handleInputChange}
                            />
                            <span>или</span>
                            <Button className={classes.modalContent__registerButton}>
                                Зарегистрируйтесь
                            </Button>
                        </div>
                    </div>
                )}

                <div className={classes.modalContent__inputRow}>
                    <h6 className={classes.modalContent__label} style={{ alignSelf: 'center' }}>
                        Ваша оценка
                    </h6>
                    <StarRating
                        className={classes.modalContent__rating}
                        name="rating"
                        rating={formValues.rating}
                        setRating={handleRatingChange}
                        starDimension="32px"
                    />
                </div>

                <div className={classes.modalContent__inputRow}>
                    <h6 className={classes.modalContent__label}>Комментарий</h6>
                    <div className={classes.modalContent__commentContainer}>
                        <textarea
                            className={classes.modalContent__textArea}
                            name="comment"
                            value={formValues.comment}
                            onChange={handleCommentChange}
                            placeholder="Помогите другим людям узнать о моей работе подробнее"
                        />
                        <span
                            className={`${classes.modalContent__charCount} ${commentError ? classes.modalContent__charCount_error : ''}`}
                        >
                            {`${formValues.comment.length}/${MAX_COMMENT_LENGTH}`}
                        </span>
                    </div>
                </div>

                <Button
                    className={classes.modalContent__send}
                    onClick={closeModal}
                >
                    Далее
                </Button>
            </div>
        </motion.div>
    );
})
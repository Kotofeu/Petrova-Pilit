import { memo, FC, useCallback } from 'react'
import { motion } from 'framer-motion';
import { ReviewImages } from '../ReviewImages/ReviewImages';
import Button from '../../../../UI/Button/Button';
import { IMAGES, IReviewForm } from './const';

import classes from './ReviewModal.module.scss'
import { Link } from 'react-router-dom';
import { POLICY_ROUTE } from '../../../../utils/const/routes';

export const ReviewFormImages: FC<IReviewForm> = memo(({ isOpen, closeModal, formValues, setFormValues }) => {


    const handleImagesChange = useCallback((images: FileList | null) => {
        setFormValues(prev => ({ ...prev, [IMAGES]: images }));
    }, []);
    if (!isOpen) return null
    return (
        <motion.div
            className={classes.modalContent}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
        >
            <h3 className={classes.modalContent__title}>
                Добавьте фотографии, <br />
                <span>если есть и если хочется 😉</span>
            </h3>
            <div className={classes.modalContent__inner}>
                <ReviewImages
                    className={classes.modalContent__imagesContainer}
                    images={formValues.images}
                    handleFilesChange={handleImagesChange}
                />
                <Button className={classes.modalContent__send} onClick={closeModal}>
                    Отправить
                </Button>
                <p className={classes.modalContent__policy}>
                    **Нажимая на кнопку "Отправить" Вы соглашаетесь с
                    <Link
                        to={POLICY_ROUTE}
                        target="_blank"
                        rel="noopener noreferrer"

                    >
                        <span> политикой конфиденциальности</span>
                    </Link>
                </p>

            </div>
        </motion.div>
    );
})
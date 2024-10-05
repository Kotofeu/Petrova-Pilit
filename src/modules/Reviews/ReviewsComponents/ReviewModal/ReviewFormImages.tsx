import { memo, FC, useCallback } from 'react'
import { motion } from 'framer-motion';
import { ReviewImages } from '../ReviewImages/ReviewImages';
import Button from '../../../../UI/Button/Button';
import { IMAGES, IReviewForm } from './const';

import classes from './ReviewModal.module.scss'
import PolicyAgree from '../../../../UI/PolicyAgree/PolicyAgree';

export const ReviewFormImages: FC<IReviewForm> = memo(({ isOpen, closeModal, formValues, setFormValues }) => {


    const handleImagesChange = useCallback((images: FileList | null) => {
        setFormValues(prev => ({ ...prev, [IMAGES]: images }));
    }, []);
    const handleImagesDelete = useCallback((index: number) => {
        if (!formValues[IMAGES] || formValues[IMAGES].length === 0) return;
        const imagesArray = Array.from(formValues[IMAGES]);
        const updatedImagesArray = imagesArray.filter((_, i) => i !== index);
        const newFileList = new DataTransfer();
        updatedImagesArray.forEach(file => newFileList.items.add(file));
        setFormValues(prevValues => ({
            ...prevValues,
            [IMAGES]: newFileList.files
        }));
    }, [formValues, setFormValues]);
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
                    handleImagesDelete={handleImagesDelete}
                />
                <Button className={classes.modalContent__send} onClick={closeModal}>
                    Отправить
                </Button>
                <PolicyAgree
                    className={classes.modalContent__policy}
                    buttonName='Отправить'
                />
            </div>
        </motion.div>
    );
})
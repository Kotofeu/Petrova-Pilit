import { memo, FC, useState, useEffect } from 'react'
import Modal from '../../../../components/Modal/Modal';
import { ReviewFormMain } from './ReviewFormMain';
import { ReviewFormImages } from './ReviewFormImages';
import { COMMENT, IMAGES, IValues, NAME, RATING } from './const';

import classes from './ReviewModal.module.scss'
import { AnimatePresence } from 'framer-motion';

interface IReviewModal {
    isUserAuth?: boolean;
    isOpen: boolean;
    closeModal: () => void;
}

const initialValues: IValues = {
    [NAME]: "",
    [RATING]: 0,
    [COMMENT]: "",
    [IMAGES]: null,
};

export const ReviewModal: FC<IReviewModal> = memo(({ isUserAuth, isOpen, closeModal }) => {
    const [formValues, setFormValues] = useState(initialValues);
    const [isMainOpen, setIsMainOpen] = useState<boolean>(true)
    useEffect(() => {
        if (!isOpen) {
            setFormValues(initialValues);
            setIsMainOpen(true);
        }
    }, [isOpen, closeModal, isUserAuth]);

    return (
        <Modal className={classes.reviewModal} isOpen={isOpen} closeModal={closeModal} >
            <AnimatePresence>
                <ReviewFormMain
                    key={'ReviewFormMain'}
                    isOpen={isMainOpen}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    closeModal={() => setIsMainOpen(false)}
                    isUserAuth={false}
                />
                <ReviewFormImages
                    key={'ReviewFormImages'}
                    isOpen={!isMainOpen}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    closeModal={closeModal}
                />
            </AnimatePresence>
        </Modal>
    );
})
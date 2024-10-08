import { FC, useState, useEffect } from 'react'
import Modal from '../../../../components/Modal/Modal';
import { ReviewFormMain } from './ReviewFormMain';
import { ReviewFormImages } from './ReviewFormImages';
import { COMMENT, IMAGES, IValues, NAME, RATING } from './const';

import classes from './ReviewModal.module.scss'
import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { registrationStore, reviewsStore, userStore } from '../../../../store';

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

export const ReviewModal: FC<IReviewModal> = observer(({ isOpen, closeModal }) => {
    const [formValues, setFormValues] = useState(initialValues);
    const [isMainOpen, setIsMainOpen] = useState<boolean>(true)
    useEffect(() => {
        if (!isOpen) {
            if (userStore.user?.name) {
                setFormValues({...initialValues, [NAME]: userStore.user?.name});
            }
            else {
                setFormValues(initialValues);
            }
            setIsMainOpen(true);
        }
    }, [isOpen, closeModal, userStore]);
    const createReview = () => {
        reviewsStore.createReview({
            id: Date.now(),
            user: {
                id: userStore.user?.id || Date.now(),
                name: userStore.user?.name || formValues[NAME],
                imageSrc: userStore.user?.imageSrc,
                visitsNumber: userStore.user?.visitsNumber
            },
            comment: formValues[COMMENT],
            time: Date.now(),
            rating: formValues[RATING],
            images: Array.from(formValues[IMAGES] || []).map((image, index) => {
                return {
                    id: index,
                    imageSrc: URL.createObjectURL(image)
                }
            })
        })
        closeModal()
    }
    const startAuth = () => {
        registrationStore.setIsOpen(true)
        closeModal()
    }
    return (
        <Modal className={classes.reviewModal} isOpen={isOpen} closeModal={closeModal} >
            <AnimatePresence>
                <ReviewFormMain
                    key={'ReviewFormMain'}
                    isOpen={isMainOpen}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    closeModal={() => setIsMainOpen(false)}
                    isUserAuth={userStore.isAuth}
                    startAuth={startAuth}
                />
                <ReviewFormImages
                    key={'ReviewFormImages'}
                    isOpen={!isMainOpen}
                    formValues={formValues}
                    setFormValues={setFormValues}
                    closeModal={createReview}
                />
            </AnimatePresence>
        </Modal>
    );
})
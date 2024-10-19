import { FC, memo, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MultipleFileInput from '../../../../components/MultipleFileInput/MultipleFileInput'


import classes from './ReviewImages.module.scss'
import { classConnection } from '../../../../utils/function'
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton'

const MAX_IMAGE_COUNT = 6
const MAX_IMAGES_WEIGHT = 10485760

interface IReviewImages {
    className?: string;
    images: FileList | null;
    handleFilesChange: (images: FileList | null) => void;
    handleImagesDelete: (index: number) => void;
}
export const ReviewImages: FC<IReviewImages> = memo(({
    className,
    images,
    handleFilesChange,
    handleImagesDelete
}) => {
    const generalWeight = useMemo(() => {
        if (!images?.length) return null
        return Math.round(Array.from(images).reduce((acc, curr) => acc + curr.size, 0) / 1024 / 1024 * 100) / 100
    }, [images])

    const memoImages = useMemo(() => {
        if (images?.length) return Array.from(images)
    }, [images])

    return (
        <div className={classConnection(classes.reviewImages, className)}>
            <MultipleFileInput
                className={classes.reviewImages__fileInput}
                handleFilesChange={handleFilesChange}
                maxFilesCount={MAX_IMAGE_COUNT}
                maxTotalSize={MAX_IMAGES_WEIGHT}
            />
            {
                (!!memoImages?.length) &&
                <>
                    <div className={classes.reviewImages__filesInfo}>
                        <span>{`${memoImages.length}/${MAX_IMAGE_COUNT}`}</span>
                        <span>{`${generalWeight}Мб/${MAX_IMAGES_WEIGHT / 1024 / 1024}Мб`}</span>
                    </div>
                    <div className={classConnection(
                        classes.reviewImages__images,
                        memoImages.length > 3 ? classes.reviewImages__images_grid : ''
                    )}>
                        <AnimatePresence>
                            {
                                memoImages.map((image, index) => {
                                    return (
                                        <motion.div
                                            className={classes.reviewImages__imageBox}
                                            key={image.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                        >
                                            <img
                                                className={classes.reviewImages__background}
                                                src={URL.createObjectURL(image)}
                                                alt={image.name}
                                            />
                                            <img
                                                className={classes.reviewImages__image}
                                                src={URL.createObjectURL(image)}
                                                alt={image.name}
                                            />
                                            <ControllerButton
                                                className={classes.reviewImages__button}
                                                type='delete'
                                                onClick={() => handleImagesDelete(index)}
                                                title='Удалить фото'
                                            />
                                        </motion.div>

                                    )
                                })
                            }
                        </AnimatePresence>

                    </div>

                </>

            }

        </div>
    )
})
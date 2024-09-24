import { FC, memo, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MultipleFileInput from '../../../../components/MultipleFileInput/MultipleFileInput'

import classConnection from '../../../../utils/function/classConnection'

import classes from './ReviewImages.module.scss'

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

    const items = Array.from(images || []);
    const gridItems: (File | null)[] = [...items];

    const emptyCellsCount = (3 - (gridItems.length % 3)) % 3;
    for (let i = 0; i < emptyCellsCount; i++) {
        gridItems.push(null);
    }

    return (
        <div className={classConnection(classes.reviewImages, className)}>
            <MultipleFileInput
                className={classes.reviewImages__fileInput}
                handleFilesChange={handleFilesChange}
                maxFilesCount={MAX_IMAGE_COUNT}
                maxTotalSize={MAX_IMAGES_WEIGHT}
            />
            {
                (!!images?.length) &&
                <>
                    <div className={classes.reviewImages__filesInfo}>
                        <span>{`${images.length}/${MAX_IMAGE_COUNT}`}</span>
                        <span>{`${generalWeight}Мб/${MAX_IMAGES_WEIGHT / 1024 / 1024}Мб`}</span>
                    </div>
                    <div className={classConnection(
                        classes.reviewImages__images,
                        images.length > 3 ? classes.reviewImages__images_grid : ''
                    )}>
                        <AnimatePresence mode={'popLayout'}>
                            {Array.from(gridItems).map((image, index) => {
                                if (image == null) return (
                                    <div
                                        key={index}
                                        className={classConnection(
                                            classes.reviewImages__image,
                                            classes.reviewImages__image_empty
                                        )}
                                    >
                                    </div>
                                )
                                const imageUrl = URL.createObjectURL(image)
                                return (
                                    <motion.div
                                        className={classes.reviewImages__image}
                                        key={image.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        layout
                                    >
                                        <span
                                            className={classes.reviewImages__background}
                                            style={{
                                                backgroundImage: `url(${imageUrl})`
                                            }}
                                        />
                                        <img
                                            src={imageUrl}
                                            alt={image.name}
                                        />
                                        <button
                                            className={classes.reviewImages__button}
                                            onClick={() => handleImagesDelete(index)}
                                            type='button'
                                            title='delete'
                                        />
                                    </motion.div>

                                )
                            }
                            )}
                        </AnimatePresence>

                    </div>

                </>

            }

        </div>
    )
})
import { FC, memo, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Grid from '../../../../components/Grid/Grid';
import { IImages } from '../../../../store';
import classes from './WorkImagesGrid.module.scss';
import { ModalSlider } from '../../../../components/Slider';
import Section from '../../../../components/Section/Section';
import Background from '../../../../assets/images/heart.png';
export interface IWorkImagesGrid {
    images: IImages[];
}
const title = 'Другие фотографии'
export const WorkImagesGrid: FC<IWorkImagesGrid> = memo(({
    images

}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [activeImage, setActiveImage] = useState<number>(0)
    const modalHandler = useCallback((index: number) => {
        setActiveImage(index)
        setIsOpen(true)
    }, [])
    return (
        <Section className={classes.workImages} backgroundImage={Background}>
            <h2 className={classes.workImages__title}>
                Другие <span>фотографии</span>
            </h2>
            <Grid
                className={classes.workImages__grid}
                items={images}
                renderItem={(image, index) => (
                    <img
                        className={classes.workImages__image}
                        key={image.id}
                        src={image.imageSrc}
                        alt={`${title}: ${index + 1}`}
                        onClick={() => modalHandler(index)}
                    />
                )}
            />
            <ModalSlider
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
                items={images}
                renderItem={(image, index) => (
                    <motion.img
                        className={classes.workImages__modalImg}
                        key={image.id}
                        src={image.imageSrc}
                        alt={`${title}: ${index + 1}`}
                    />
                )}
                initialSlide={activeImage}
                addArrows
                slideClassName={classes.workImages__slide}
                draggable
            />
        </Section>

    )
});
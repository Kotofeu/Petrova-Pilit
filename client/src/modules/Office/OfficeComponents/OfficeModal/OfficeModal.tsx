import { FC } from 'react'
import { motion } from 'framer-motion'
import { observer } from 'mobx-react-lite';
import { ModalSlider } from '../../../../components/Slider';
import { applicationStore } from '../../../../store';
import classes from './OfficeModal.module.scss'

interface IOfficeModal {
  isOpen: boolean;
  closeModal: () => void;
  activeImage: number;
}

export const OfficeModal: FC<IOfficeModal> = observer(({ isOpen, closeModal, activeImage }) => (
  <ModalSlider
    isOpen={isOpen}
    closeModal={closeModal}
    items={applicationStore.officeImages}
    renderItem={(image, index) => {
      if (!image.imageSrc || !image.id) return null
      return (
        <motion.img
          className={classes.officeModal__image}
          key={image.id}
          src={image.imageSrc}
          alt={`Мой офис:${index + 1}`}
        />
      )
    }}
    initialSlide={activeImage}
    addArrows
    slideClassName={classes.officeModal__slide}
    draggable
  />
));

import {FC} from 'react'
import {motion} from 'framer-motion'
import { observer } from 'mobx-react-lite';
import Modal from '../../../../components/Modal/Modal'
import { Slider } from '../../../../components/Slider';
import { applicationStore } from '../../../../store';
import classes from './OfficeModal.module.scss'

interface IOfficeModal {
  isOpen: boolean;
  closeModal: () => void;
  activeImage: number;
}

export const OfficeModal: FC<IOfficeModal> = observer(({ isOpen, closeModal, activeImage }) => (
  <Modal isOpen={isOpen} closeModal={closeModal}>
    <div className={classes.officeModal}>
      <Slider
        className={classes.officeModal__slider}
        items={applicationStore.officeImages}
        renderItem={(image, index) => (
          <motion.img
            className={classes.officeModal__image}
            key={image.id}
            src={image.imageSrc}
            alt={`Мой офис:${index}`}
      />
              )}
      initialSlide={activeImage}
      addArrows
      slideClassName={classes.officeModal__slide}
      draggable
      
      customArrow={<button className={classes.officeModal__arrow} />}
          />
    </div>
  </Modal>
));
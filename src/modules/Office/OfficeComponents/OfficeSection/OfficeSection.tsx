import { useState, memo } from 'react'
import Background from '../../../../assets/images/heart.png';

import Section from '../../../../components/Section/Section'
import classes from './OfficeSection.module.scss'
import { OfficeModal } from '../OfficeModal/OfficeModal';
import { OfficeGrid } from '../OfficeGrid/OfficeGrid';
export const OfficeSection = memo(() => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [activeImage, setActiveImage] = useState<number>(0)
    const openModal = (index: number) => {
        setIsOpen(true)
        setActiveImage(index)
    }
    const closeModal = () => {
        setIsOpen(false)
        setActiveImage(0)
    }
    return (
        <Section className={classes.officeSection} backgroundImage={Background}>
            <h2 className={classes.officeSection__title}>
                Моя <span> мастерская </span>
            </h2>
            <OfficeGrid openModal={openModal}/>
            <OfficeModal isOpen={isOpen} closeModal={closeModal} activeImage={activeImage} />
        </Section>
    )
})

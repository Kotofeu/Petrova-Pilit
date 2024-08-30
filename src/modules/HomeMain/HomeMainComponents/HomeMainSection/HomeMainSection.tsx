import { useRef, memo } from "react"

import Section from "../../../../components/Section/Section"
import classConnection from "../../../../utils/function/classConnection"
import { HomeMainSlider } from "../HomeMainSlider/HomeMainSlider"
import Arrow from '../../../../assets/icons/Arrow.svg'

import classes from './HomeMainSection.module.scss'
import ContactList from "../../../../components/ContactList/ContactList"

export const HomeMainSection = memo(() => {
    const homeMainBottom = useRef<HTMLDivElement>(null)
    const lookMoreClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()
        if (homeMainBottom.current) {
            homeMainBottom.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

    }

    return (
        <Section className={classes.homeMain} isUnderline>
            <div className={classes.homeMain__titleBox}>
                <span className={classConnection(classes.homeMain__titleDecoration, classes.homeMain__titleDecoration_reverse)} />
                <h1 className={classes.homeMain__title}>PETROVA PILIT</h1>
                <span className={classes.homeMain__titleDecoration} />
            </div>
            <div className={classes.homeMain__content}>
                <div className={classes.homeMain__contact}>
                    <ContactList
                        className={classes.homeMain__links}
                    />
                    <h6 className={classes.homeMain__contactDecoration}>Связь со мной</h6>

                </div>
                <HomeMainSlider />
                <div className={classes.homeMain__lookMore}>
                    <button
                        className={classes.homeMain__lookMoreArrow}
                        onClick={lookMoreClick}
                        type="button"
                        aria-label="Перемотать ниже"
                        title="Перемотать ниже"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span>
                            <img className={classes.homeMain__lookMoreIcon} src={Arrow} alt='arrow' />
                        </span>

                    </button>
                </div>
            </div>
            <div ref={homeMainBottom} />
        </Section>
    )
})
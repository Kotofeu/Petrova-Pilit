import { NavLink } from 'react-router-dom'

import Section from '../../../../components/Section/Section'
import { HomeWorksSlider } from '../HomeWorksSlider/HomeWorksSlider'

import { WORKS_ROUTE } from '../../../../utils/const/routes'
import Background from '../../../../assets/images/hand.png';

import classes from './HomeWorksSection.module.scss'

export const HomeWorksSection = () => {
    return (
        <Section className={classes.homeWorks} backgroundImage={Background}>
            <div className={classes.homeWorks__titleBox}>
                <h2 className={classes.homeWorks__title}>Последние <span>работы</span></h2>
                <h4 className={classes.homeWorks__subtitle}>Приходите и ваши ручки будут здесь</h4>
                <NavLink to={WORKS_ROUTE} className={classes.homeWorks__button} onClick={() => window.scrollTo(0, 0)}>
                    <span className={classes.homeWorks__buttonDecoration}>Смотреть больше работ</span>
                </NavLink>
            </div>
            <HomeWorksSlider />
        </Section>
    )
}
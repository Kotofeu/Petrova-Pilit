import { NavLink } from 'react-router-dom'

import Section from '../../../../components/Section/Section'
import { HomeWorksSlider } from '../HomeWorksSlider/HomeWorksSlider'

import { WORKS_ROUTE } from '../../../../utils/const/routes'
import Background from '../../../../assets/images/hand.png';

import classes from './HomeWorksSection.module.scss'

export const HomeWorksSection = () => {
    return (
        <Section className={classes.homeWorks}>
            <img className={classes.homeWorks_background} src={Background} alt='Задний фон ладони' />
            <div className={classes.homeWorks__titleBox}>
                <h2 className={classes.homeWorks__title}>Последние работы</h2>
                <h4 className={classes.homeWorks__subtitle}>Приходите и ваши ручки будут здесь</h4>
                <NavLink to={WORKS_ROUTE} className={classes.homeWorks__button}>
                    <span className={classes.homeWorks__buttonDecoration}>Смотреть больше работ</span>
                </NavLink>
            </div>
            <HomeWorksSlider />

        </Section>
    )
}
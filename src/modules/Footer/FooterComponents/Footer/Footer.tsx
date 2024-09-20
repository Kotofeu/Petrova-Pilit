import { useCallback, useState } from 'react'
import classes from './Footer.module.scss'
import Map from '../../../../UI/Map/Map'
import { applicationStore } from '../../../../store'
import { observer } from 'mobx-react-lite'
import { ContactLinks } from '../ContactLinks/ContactLinks'
import { PageLinks } from '../PageLinks/PageLinks'

export const Footer = observer(() => {

    const onLinkClick = useCallback(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <footer className={classes.footer}>
            <div className={classes.footer__inner}>
                <div className={classes.footer__column}>
                    <Map
                        className={classes.footer__map}
                        name='Моя мастерская'
                        src={applicationStore.addressMap || ''}
                        height='300px'
                        width='300px'
                    />
                </div>
                <ContactLinks />
                <PageLinks onLinkClick={onLinkClick} />
                <div className={classes.footer__workSchedule}>
                    <h6 className={classes.footer__columnTitle}>График работы</h6>
                    <div className={classes.footer__linksList}>
                        <p className={classes.footer__workDay}><span>Понеденьник</span><span>08:00 - 20:00</span></p>
                        <p className={classes.footer__workDay}><span>Вторник</span><span>08:00 - 20:00</span></p>
                        <p className={classes.footer__workDay}><span>Среда</span><span>08:00 - 20:00</span></p>
                        <p className={classes.footer__workDay}><span>Четвер:</span><span>08:00 - 20:00</span></p>
                        <p className={classes.footer__workDay}><span>Пятница</span><span>08:00 - 20:00</span></p>
                        <p className={classes.footer__workDay}><span>Суббота</span><span>08:00 - 18:00</span></p>
                        <p className={classes.footer__workDay}><span>Воскресенье</span><span>Выходной</span></p>
                    </div>
                </div>
            </div>
            <div className={classes.footer__copyrighting}>© Petrova Pilit, 2024</div>
        </footer >
    );
});
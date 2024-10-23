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
                <Map
                    className={classes.footer__map}
                    name='Моя мастерская'
                    src={applicationStore.addressMap || ''}
                    height='300px'
                    width='300px'
                />
                <ContactLinks />
                <PageLinks onLinkClick={onLinkClick} />
                {
                    applicationStore.workSchedule
                        ? <div className={classes.footer__workSchedule}>
                            <h6 className={classes.footer__columnTitle}>График работы</h6>
                            <div className={classes.footer__linksList}>
                                {
                                    applicationStore.workSchedule.map(workDay => (
                                        <p className={classes.footer__workDay} key={workDay.id}><span>{workDay.name}</span><span>{workDay.value}</span></p>
                                    ))
                                }
                            </div>
                        </div>
                        : null
                }

            </div>
            <div className={classes.footer__copyrighting}>© Petrova Pilit, 2024</div>
        </footer >
    );
});
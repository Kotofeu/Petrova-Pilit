import { useCallback, useState } from 'react'
import classes from './Footer.module.scss'
import Map from '../../../../UI/Map/Map'
import { applicationStore } from '../../../../store'
import { observer } from 'mobx-react-lite'
import { ContactLinks } from '../ContactLinks/ContactLinks'
import { PageLinks } from '../PageLinks/PageLinks'
import { NewsletterSubscription } from '../NewsletterSubscription/NewsletterSubscription'

export const Footer = observer(() => {
    const [email, setEmail] = useState<string>('');
    
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
                <NewsletterSubscription email={email} setEmail={setEmail} />
            </div>
        </footer>
    );
});
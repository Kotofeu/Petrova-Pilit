import { observer } from 'mobx-react-lite';
import ContactLink from '../../../../UI/ContactLink/ContactLink';
import { applicationStore } from '../../../../store';
import classes from '../Footer/Footer.module.scss';

export const ContactLinks = observer(() => (
    <div className={classes.footer__column}>
        <h6 className={classes.footer__columnTitle}>Контакты</h6>
        <div className={classes.footer__linksList}>
            {applicationStore.contactLinks.map(link => (
                <ContactLink
                    className={classes.footer__link}
                    key={link.title}
                    href={link.link}
                    title={link.title}
                    linkType="socialLink"
                    imageSrc={link.imageLightSrc}
                >
                    {link.title}
                </ContactLink>
            ))}
        </div>
    </div>
));
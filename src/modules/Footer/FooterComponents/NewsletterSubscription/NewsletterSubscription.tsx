
import { FC, memo} from 'react';
import Input from '../../../../UI/Input/Input';
import classes from '../Footer/Footer.module.scss';
interface INewsletterSubscription{
    email: string;
    setEmail: (email: string) => void
}
export const NewsletterSubscription: FC<INewsletterSubscription> = memo(({ email, setEmail }) => (
    <div className={classes.footer__column}>
        <h6 className={classes.footer__columnTitle}>Подписаться на новости</h6>
        <form className={classes.footer__form} action="">
            <Input
                className={classes.footer__input}
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)}
            />
            <button className={classes.footer__button}>Отправить</button>
        </form>
        <p className={classes.footer__policy}>
            **Нажимая на кнопку вы соглашаетесь с политикой конфиденциальности
        </p>
    </div>
));
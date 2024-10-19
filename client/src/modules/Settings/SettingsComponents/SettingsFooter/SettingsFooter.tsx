import { memo, FC } from 'react'
import Button from '../../../../UI/Button/Button'
import classes from './SettingsFooter.module.scss'


interface ISettingsFooter {
    onExitClick: () => void;
    onChangePasswordClick: () => void;
    onDeleteClick: () => void;
}
export const SettingsFooter: FC<ISettingsFooter> = memo(({
    onExitClick,
    onChangePasswordClick,
    onDeleteClick
}) => {
    return (
        <footer className={classes.settingsFooter}>
            <div className={classes.settingsFooter__footerFlex}>
                <Button
                    className={classes.settingsFooter__footerBtn}
                    type='button'
                    onClick={onExitClick}
                    title='Выйти из аккаунта'
                >
                    Выйти
                </Button>
                <Button
                    className={classes.settingsFooter__footerBtn}
                    type='button'
                    onClick={onChangePasswordClick}
                    title='Сменить пароль'
                >
                    Сменить пароль
                </Button>
            </div>
            <Button
                className={classes.settingsFooter__footerBtn}
                type='button'
                onClick={onDeleteClick}
                title='Удалить аккаунт'
            >
                Удалить аккаунт
            </Button>
        </footer>)
})

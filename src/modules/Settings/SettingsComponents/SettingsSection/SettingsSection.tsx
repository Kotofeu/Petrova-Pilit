import React from 'react'
import classes from './SettingsSection.module.scss'
import Section from '../../../../components/Section/Section'
import { observer } from 'mobx-react-lite'
import { userStore } from '../../../../store'
import defaultUser from '../../../../assets/icons/User-icon.svg'
export const SettingsSection = observer(() => {
    return (
        <Section className={classes.settings}>
            <div className={classes.settings__inner}>
                <div className={classes.settings__content}>
                    <div className={classes.settings__cropperBox}>
                        <div className={classes.settings__imageBox}>
                            <img
                                className={classes.settings__image}
                                src={userStore.user?.imageSrc || defaultUser}
                                alt="User icon"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
})
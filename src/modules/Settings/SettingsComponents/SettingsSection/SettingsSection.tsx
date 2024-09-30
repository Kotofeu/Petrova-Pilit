import classes from './SettingsSection.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import Section from '../../../../components/Section/Section'
import { observer } from 'mobx-react-lite'
import { userStore } from '../../../../store'
import { useCallback, useEffect, useState } from 'react'
import { UserCropper } from '../UserCropper/UserCropper'
import { useMessage } from '../../../MessageContext'
export const SettingsSection = observer(() => {
    const { addMessage } = useMessage();
    const [userImage, setUserImage] = useState<File | null>()
    useEffect(() => {
        if (userImage !== undefined) {
            userStore.setUserImage(userImage)
        }
    }, [userImage])
    const userImageHandler = useCallback((image: File | null) => {
        image
            ? addMessage('Новое фото загружено', 'complete')
            : addMessage('Фото удалено', 'complete')
        setUserImage(image)
    }, [])
    return (
        <Section className={classes.settings}>
            <div className={classes.settings__inner}>
                <div className={classes.settings__content}>
                    <UserCropper
                        onImageSave={userImageHandler}
                        userIcon={userStore.user?.imageSrc}
                        className={classes.settings__userCropper}
                    />
                    <div>

                    </div>
                </div>
            </div>
        </Section>
    )
})
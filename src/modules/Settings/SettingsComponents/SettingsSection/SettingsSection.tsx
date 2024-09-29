import classes from './SettingsSection.module.scss'
import Section from '../../../../components/Section/Section'
import { observer } from 'mobx-react-lite'
import { userStore } from '../../../../store'
import defaultUser from '../../../../assets/icons/User-icon.svg'
import { useCallback, useEffect, useState } from 'react'
import Button from '../../../../UI/Button/Button'
import FileInput from '../../../../components/FileInput/FileInput'
export const SettingsSection = observer(() => {
    const [image, setImage] = useState<File | null>(null)

    return (
        <Section className={classes.settings}>
            <div className={classes.settings__inner}>
                <div className={classes.settings__content}>
                    <div className={classes.settings__cropperBox}>
                        <div className={classes.settings__cropper}>
                            <div className={classes.settings__imageBox}>
                                {
                                    image
                                        ? <img
                                            className={classes.settings__cropperImage}
                                            src={URL.createObjectURL(image)}
                                            alt="Изображение для закгрузки"
                                        />
                                        : <img
                                            className={classes.settings__image}
                                            src={userStore.user?.imageSrc || defaultUser}
                                            alt="User icon"
                                        />

                                }

                            </div>
                        </div>
                        <div className={classes.settings__cropperBtn}>
                            {
                                !image
                                    ? <FileInput
                                        className={classes.settings__cropperInput}
                                        handleFileChange={setImage}
                                    />
                                    : <>
                                        <Button
                                            className={classes.settings__cropperButton}
                                            type='button'
                                            onClick={() => setImage(null)}
                                            title='Отмена'>
                                            Отмена
                                        </Button>
                                        <Button
                                            className={classes.settings__cropperButton}
                                            type='button'
                                            onClick={() => console.log(image)}
                                            title='Сохранить'>
                                            Сохранить
                                        </Button>
                                    </>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </Section>
    )
})
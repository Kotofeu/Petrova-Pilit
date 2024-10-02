import classes from './SettingsSection.module.scss'
import Section from '../../../../components/Section/Section'
import { observer } from 'mobx-react-lite'
import { userStore } from '../../../../store'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { UserCropper } from '../UserCropper/UserCropper'
import { useMessage } from '../../../MessageContext'
import ModalOk from '../../../../components/Modal/ModalOk'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input/input';
import Input from '../../../../UI/Input/Input'
import { SettingsFooter } from '../SettingsFooter/SettingsFooter'
import { SettingsRow } from '../SettingsRow/SettingsRow'
import { SettingsEmailInput } from '../SettingsEmailInput/SettingsEmailInput'
export const SettingsSection = observer(() => {
    const { addMessage } = useMessage();
    const [userImage, setUserImage] = useState<File | null>()
    const [userName, setUserName] = useState<string>(userStore.user?.name || '')
    const [userPhone, setUserPhone] = useState<string>(userStore.user?.phone || '')
    const [isUserPhoneChange, setIsUserPhoneChange] = useState<boolean>(false)
    const [areUShure, setAreUShure] = useState<boolean>(false)
    useEffect(() => {
        if (userImage !== undefined) {
            userStore.setUserImage(userImage)
        }
    }, [userImage,])
    useEffect(() => {
        if (userPhone && isValidPhoneNumber(userPhone) && isUserPhoneChange && userStore.user?.phone !== userPhone) {
            userStore.setUserPhone(userPhone)
            addMessage('Номер телефона обновлён', 'complete')
            setIsUserPhoneChange(false)
        }
    }, [userPhone, isUserPhoneChange])
    const userImageHandler = useCallback((image: File | null) => {
        image
            ? addMessage('Новое фото загружено', 'complete')
            : addMessage('Фото удалено', 'complete')
        setUserImage(image)
    }, [])

    const userNameHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value)
    }, [])

    const userPhoneHandler = useCallback((value: any) => {
        setUserPhone(value)
        setIsUserPhoneChange(true)
    }, [])



    const userEmailHandler = useCallback((email: string) => {
        userStore.setUserEmail(email)
    }, [])

    const onExitClick = useCallback(() => {

    }, [])

    const onChangePasswordClick = useCallback(() => {

    }, [])


    const deleteAccount = useCallback(() => {
        userStore.setUser(null)
    }, [])

    return (
        <Section >
            <div className={classes.settings}>
                <div className={classes.settings__inner}>
                    <div className={classes.settings__content}>
                        <UserCropper
                            onImageSave={userImageHandler}
                            userIcon={userStore.user?.imageSrc}
                            className={classes.settings__userCropper}
                        />
                        <div className={classes.settings__values}>
                            <SettingsRow
                                className={classes.settings__inputRow}
                                title='Ваше имя'
                                subtitle={'* до 80 символов'}
                            >
                                <Input
                                    className={classes.settings__input}
                                    title='Ваше имя'
                                    value={userName}
                                    onChange={userNameHandler}
                                    name='username'
                                    type='text'
                                />
                            </SettingsRow>
                            <SettingsRow
                                className={classes.settings__inputRow}
                                title='Номер телефона'
                                subtitle={'* Это необязательно, но так вас легче найти мастеру'}
                                error={!isValidPhoneNumber(userPhone? userPhone : '+7') && isUserPhoneChange ? 'Номер телефона некорректный' : ''}
                            >
                                <PhoneInput
                                    className={classes.settings__input}
                                    value={userPhone}
                                    country="RU"
                                    international
                                    withCountryCallingCode
                                    onChange={userPhoneHandler}
                                    placeholder="Введите номер телефона"
                                />
                            </SettingsRow>
                            <SettingsEmailInput
                                className={classes.settings__inputRow}
                                inputClassName={classes.settings__input}
                                email={userStore.user?.email || ''}
                                setEmail={userEmailHandler}
                            />
                        </div>
                    </div>
                    <SettingsFooter
                        onChangePasswordClick={onChangePasswordClick}
                        onDeleteClick={() => setAreUShure(true)}
                        onExitClick={onExitClick}
                    />
                </div>
            </div>
            <ModalOk
                isOpen={areUShure}
                closeModal={() => setAreUShure(false)}
                onOkClick={deleteAccount}
            />
        </Section>
    )
})
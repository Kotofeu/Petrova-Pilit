import classes from './SettingsSection.module.scss'
import Section from '../../../../components/Section/Section'
import { observer } from 'mobx-react-lite'
import { emailConfirmStore, registrationStore, userStore } from '../../../../store'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { UserCropper } from '../UserCropper/UserCropper'
import { useMessage } from '../../../MessageContext'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input/input';
import Input from '../../../../UI/Input/Input'
import { SettingsFooter } from '../SettingsFooter/SettingsFooter'
import { SettingsRow } from '../SettingsRow/SettingsRow'
import { SettingsEmailInput } from '../SettingsEmailInput/SettingsEmailInput'
import useDebounce from '../../../../utils/hooks/useDebounce'
import { MAX_NAME_LENGTH } from '../../../Reviews/ReviewsComponents/ReviewModal/const'
import { classConnection } from '../../../../utils/function'
import Loader from '../../../../UI/Loader/Loader'
export const SettingsSection = observer(() => {
    const nameIsEmail: boolean = !!(userStore.user?.email && userStore.user.email.length > 0 && userStore.user?.name === userStore.user?.email)
    const startName: string | undefined = nameIsEmail ? '' : userStore.user?.name || ''

    const { addMessage } = useMessage();

    const [userImage, setUserImage] = useState<File | null>()
    const [userName, setUserName] = useState<string>(startName || '')
    const [userPhone, setUserPhone] = useState<string>(userStore.user?.phone || '')


    const debouncePhone = useDebounce<string>(userPhone, 800)
    const debounceName = useDebounce<string>(userName, 1500)

    useEffect(() => {
        if (userImage !== undefined) {
            userStore.setUserImage(userImage)
        }
    }, [userImage])

    useEffect(() => {
        if (debounceName) {
            if (userStore.user?.name !== debounceName) {
                if (debounceName.length >= 2 && debounceName.length <= MAX_NAME_LENGTH) {
                    userStore.setUserName(debounceName)
                    addMessage(`Ваше имя обновлено, ${debounceName}`, 'complete')
                }
            }
        }
        else {
            if (userStore.user?.name !== userStore.user?.email) {
                userStore.setUserName(userStore.user?.email || '')
                addMessage(`Ваше имя заменено на электронную почту`, 'complete')
            }
        }
    }, [debounceName])
    useEffect(() => {
        if (debouncePhone && isValidPhoneNumber(debouncePhone) && userStore.user?.phone !== debouncePhone) {
            userStore.setUserPhone(debouncePhone)
            addMessage('Номер телефона обновлён', 'complete')
        }
    }, [debouncePhone])
    const userImageHandler = useCallback((image: File | null) => {
        image
            ? addMessage('Новое фото загружено', 'complete')
            : addMessage('Фото удалено', 'complete')
        setUserImage(image)
    }, [])

    const userNameHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length > MAX_NAME_LENGTH) {
            return
        }
        setUserName(event.target.value)

    }, [])

    const userPhoneHandler = useCallback((value: any) => {
        setUserPhone(value)
    }, [])

    const isNameError = !(debounceName.length >= 2 && debounceName.length <= MAX_NAME_LENGTH) && debounceName
    const isPhoneError = !isValidPhoneNumber(userPhone ? userPhone : '+7') && userStore.user?.phone !== debouncePhone && userPhone
    return (
        <Section >
            <div className={classes.settings}>
                <Loader
                    className={classes.settings__loader}
                    isLoading={userStore.isLoading || emailConfirmStore.isLoading || registrationStore.isLoading}
                />
                <div className={classes.settings__inner}>
                    <div className={classes.settings__content}>
                        <UserCropper
                            onImageSave={userImageHandler}
                            userIcon={userStore.user?.imageSrc || ''}
                            className={classes.settings__userCropper}
                        />
                        <div className={classes.settings__values}>
                            <SettingsRow
                                title='Ваше имя'
                                subtitle={'* от 2 до 80 символов'}
                                error={isNameError ? 'Ваше имя должно состоять от 2 до 80 символов' : ''}
                            >
                                <Input
                                    className={classConnection(
                                        classes.settings__input,
                                        isNameError ? classes.settings__input_error : '')}
                                    title='Ваше имя'
                                    value={userName}
                                    onChange={userNameHandler}
                                    name='username'
                                    type='text'
                                    placeholder={userStore.user?.email}
                                />
                            </SettingsRow>
                            <SettingsRow
                                title='Номер телефона'
                                subtitle={'* Это необязательно, но так вас легче найти мастеру'}
                                error={isPhoneError ? 'Номер телефона некорректный' : ''}
                            >
                                <PhoneInput
                                    className={classConnection(
                                        classes.settings__input,
                                        isPhoneError ? classes.settings__input_error : '')}
                                    value={userPhone}
                                    country="RU"
                                    international
                                    withCountryCallingCode
                                    onChange={userPhoneHandler}
                                    placeholder="Введите номер телефона"
                                />
                            </SettingsRow>
                            <SettingsEmailInput
                                inputClassName={classes.settings__input}
                                emailFieldClassName={classes.settings__inputRow}
                                email={userStore.user?.email || ''}
                            />
                        </div>
                    </div>
                    <SettingsFooter />
                </div>
            </div>

        </Section>
    )
})
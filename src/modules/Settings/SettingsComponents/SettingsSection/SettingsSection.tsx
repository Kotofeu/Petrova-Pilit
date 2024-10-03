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
import { useNavigate } from 'react-router-dom'
import { HOME_ROUTE } from '../../../../utils/const/routes'
import useDebounce from '../../../../utils/hooks/useDebounce'
import { MAX_COMMENT_NAME } from '../../../Reviews/ReviewsComponents/ReviewModal/const'
export const SettingsSection = observer(() => {
    const nameIsEmail: boolean = !!(userStore.user?.email && userStore.user.email.length > 0 && userStore.user?.name === userStore.user?.email)
    const startName: string | undefined = nameIsEmail ? '' : userStore.user?.name
    const { addMessage } = useMessage();
    const [userImage, setUserImage] = useState<File | null>()
    const [userName, setUserName] = useState<string>(startName || '')
    const [userPhone, setUserPhone] = useState<string>(userStore.user?.phone || '')
    const [areUShure, setAreUShure] = useState<boolean>(false)
    const router = useNavigate();

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
                if (debounceName.length >= 2 && debounceName.length <= MAX_COMMENT_NAME) {
                    userStore.setUserName(debounceName)
                    addMessage(`Ваше имя обновлено, ${debounceName}`, 'complete')
                }
                else {
                    addMessage(`Ваше имя должно состоять от 2 до 80 символов`, 'message')
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
        if (event.target.value.length > MAX_COMMENT_NAME) {
            return
        }
        setUserName(event.target.value)

    }, [])

    const userPhoneHandler = useCallback((value: any) => {
        setUserPhone(value)
    }, [])
    const userEmailHandler = useCallback((email: string) => {
        userStore.setUserEmail(email)
    }, [])

    const onExitClick = useCallback(() => {
        router(`${HOME_ROUTE}`);
        userStore.setUser(null)
        addMessage('Ждём вашего возвращения!', 'complete')
        // Удаление токенов
    }, [])

    const onChangePasswordClick = useCallback(() => {
        addMessage('Фото удалено', 'complete')
    }, [])


    const deleteAccount = useCallback(() => {
        router(`${HOME_ROUTE}`);
        userStore.setUser(null)
        addMessage('Ваш аккаунт удалён(', 'complete')
        // Запрос на удаление аккаунта
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
                                subtitle={'* от 2 до 80 символов'}
                            >
                                <Input
                                    className={classes.settings__input}
                                    title='Ваше имя'
                                    value={userName}
                                    onChange={userNameHandler}
                                    name='username'
                                    type='text'
                                    placeholder={userStore.user?.email}
                                />
                            </SettingsRow>
                            <SettingsRow
                                className={classes.settings__inputRow}
                                title='Номер телефона'
                                subtitle={'* Это необязательно, но так вас легче найти мастеру'}
                                error={!isValidPhoneNumber(userPhone ? userPhone : '+7') && userStore.user?.phone !== debouncePhone ? 'Номер телефона некорректный' : ''}
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
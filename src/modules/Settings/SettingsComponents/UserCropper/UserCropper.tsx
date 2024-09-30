import { memo, FC, useState, useCallback } from 'react'

import defaultUser from '../../../../assets/icons/User-icon.svg'
import FileInput from '../../../../components/FileInput/FileInput'
import Button from '../../../../UI/Button/Button'

import classes from './UserCropper.module.scss'
import { classConnection } from '../../../../utils/function'
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton'


interface IUserCropper {
    className?: string;
    userIcon?: string;
    onImageSave: (image: File | null) => void;
}
export const UserCropper: FC<IUserCropper> = memo(({
    className,
    onImageSave,
    userIcon
}) => {

    const [image, setImage] = useState<File | null>(null)
    const imageSave = useCallback(() => {
        onImageSave(image)
        setImage(null)
    }, [image])
    const imageDelete = useCallback(() => {
        onImageSave(null)
    }, [image])
    return (
        <div className={classConnection(classes.userCropper, className)}>
            <div className={classes.userCropper__cropper}>
                <div className={classes.userCropper__imageBox}>
                    {
                        image
                            ? <img
                                className={classes.userCropper__cropperImage}
                                src={URL.createObjectURL(image)}
                                alt="Изображение для закгрузки"
                            />
                            : <>
                                {
                                    userIcon
                                        ? <Button
                                            className={classes.userCropper__delete}
                                            type='button'
                                            onClick={imageDelete}
                                            title='Удалить текущее фото'>
                                            Удалить фото
                                        </Button>
                                        : null
                                }
                                <img
                                    className={classes.userCropper__image}
                                    src={userIcon || defaultUser}
                                    alt="User icon"
                                />
                            </>
                    }
                </div>
            </div>
            <div className={classes.userCropper__cropperBtn}>
                {
                    !image
                        ? <FileInput
                            className={classes.userCropper__cropperInput}
                            handleFileChange={setImage}
                            title='Загрузить фото'
                        />
                        : <>
                            <Button
                                className={classes.userCropper__cropperButton}
                                type='button'
                                onClick={() => setImage(null)}
                                title='Отмена'>
                                Отмена
                            </Button>
                            <Button
                                className={classes.userCropper__cropperButton}
                                type='button'
                                onClick={imageSave}
                                title='Сохранить'>
                                Сохранить
                            </Button>
                        </>
                }
            </div>
        </div>
    )
})

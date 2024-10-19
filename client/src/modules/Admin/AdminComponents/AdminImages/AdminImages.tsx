import { FC, memo, useCallback, useState } from 'react'
import FileInput from '../../../../components/FileInput/FileInput'
import ImageCropper from '../../../../components/ImageCropper/ImageCropper'

import classes from './AdminImages.module.scss'
import { IImages } from '../../../../store'
import { useMessage } from '../../../MessageContext'
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton'

interface IAdminImages {
    images?: IImages[];
    addImage: (image: File) => void;
    deleteImage: (id: number) => void;
    title?: string;
    aspect?: number;
}
export const AdminImages: FC<IAdminImages> = memo(({
    images,
    addImage,
    deleteImage,
    title,
    aspect,
}) => {
    const { addMessage } = useMessage()

    const loadImage = useCallback((file: File | null) => {
        if (file) {
            addImage(file)
            addMessage('Изображение добавлено', 'complete')
        }
    }, [])

    const onDeleteImage = useCallback((id: number) => {
        deleteImage(id)
        addMessage('Изображение удалено', 'complete')
    }, [])



    return (
        <div className={classes.adminImages}>
            <div
                className={classes.adminImages__addImage}
                style={{ aspectRatio: aspect || 1 }}
            >
                <FileInput
                    className={classes.adminImages__imageInput}
                    handleFileChange={loadImage}
                    name={title}
                    title={title}
                    maxFileSize={7340032}
                />
            </div>
            {
                images?.length
                    ? images.map((image, index) => (
                        <div
                            className={classes.adminImages__imageBox}
                            key={image.id}
                            style={{ aspectRatio: aspect || 1 }}
                        >
                            <img
                                className={classes.adminImages__imageBackground}
                                src={image.imageSrc}
                                alt={`Задний фот изображения №${index}`}
                            />
                            <img
                                className={classes.adminImages__image}
                                src={image.imageSrc}
                                alt={image.title || image.description || `Изображение №${index}`}
                            />
                            <ControllerButton
                                className={classes.adminImages__deleteImage}
                                onClick={() => onDeleteImage(image.id)}
                                type='delete'
                            />
                            <span>{index + 1}</span>
                        </div>
                    ))
                    : null
            }
        </div>
    )
})

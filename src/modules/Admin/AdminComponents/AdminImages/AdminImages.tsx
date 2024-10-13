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
    const [loadedFile, setLoadedFile] = useState<File>()
    const { addMessage } = useMessage()

    const loadImage = useCallback((file: File | null) => {
        setLoadedFile(file || undefined)
    }, [setLoadedFile])

    const onDeleteImage = useCallback((id: number) => {
        deleteImage(id)
        addMessage('Изображение удалено', 'complete')
    }, [setLoadedFile])


    const cropImage = useCallback((file: File | null) => {
        if (file) {
            addImage(file)
            addMessage('Изображение добавлено', 'complete')
        }
        setLoadedFile(undefined)
    }, [setLoadedFile, addImage])


    return (
        <div className={classes.adminImages}>
            <div
                className={classes.adminImages__addImage}
                style={{ aspectRatio: aspect || 1 }}
            >
                {
                    loadedFile
                        ? <ImageCropper
                            className={classes.adminImages__cropper}
                            image={URL.createObjectURL(loadedFile)}
                            onSave={cropImage}
                            aspect={aspect || 1}
                            onClose={() => setLoadedFile(undefined)}
                        />
                        : null
                }
                {
                    !loadedFile
                        ? <FileInput
                            className={classes.adminImages__imageInput}
                            handleFileChange={loadImage}
                            name={title}
                            title={title}
                        />
                        : null
                }
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
                        </div>
                    ))
                    : null
            }
        </div>
    )
})

import { memo, FC, useCallback, useState } from 'react'
import ImageCropper from '../../../../components/ImageCropper/ImageCropper'
import FileInput from '../../../../components/FileInput/FileInput'

import classes from './WorkImageCropper.module.scss'
import { classConnection } from '../../../../utils/function';
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton';

interface IWorkImageCropper {
    className?: string;
    setImage: (file: File | undefined) => void;
    initialImage?: string;
    title?: string;
    name?: string;
}

export const WorkImageCropper: FC<IWorkImageCropper> = memo(({
    className,
    setImage,
    initialImage,
    title,
    name
}) => {
    const [loadedFile, setLoadedFile] = useState<File>()
    const [croppedFile, setCroppedFile] = useState<string>(initialImage || '')

    const loadImage = useCallback((file: File | null) => {
        setLoadedFile(file || undefined)
        setCroppedFile('')
    }, [setLoadedFile])

    const cropImage = useCallback((file: File | null) => {
        setImage(file || undefined)
        setCroppedFile(file ? URL.createObjectURL(file) : '')
        setLoadedFile(undefined)
    }, [setImage, setLoadedFile, setCroppedFile])

    const onCloseCrop = useCallback(() => {
        setLoadedFile(undefined)
        setCroppedFile('')
    }, [setLoadedFile, setCroppedFile])

    return (
        <div className={classConnection(classes.workImageCropper, className)}>
            {
                croppedFile
                    ? <img src={croppedFile} alt={title} />
                    : null
            }
            {
                croppedFile
                    ? <ControllerButton
                        className={classes.workImageCropper__delete}
                        type='delete'
                        title='Удалить фото'
                        onClick={() => cropImage(null)}
                    />
                    : null
            }
            {
                loadedFile && !croppedFile
                    ? <ImageCropper
                        className={classes.workImageCropper__cropper}
                        image={URL.createObjectURL(loadedFile)}
                        onSave={cropImage}
                        aspect={6 / 4}
                        onClose={onCloseCrop}
                    />
                    : null
            }
            {
                !loadedFile
                    ? <FileInput
                        className={classes.workImageCropper__preview}
                        handleFileChange={loadImage}
                        name={name}
                        title={title}
                    />
                    : null
            }
        </div>
    )
})
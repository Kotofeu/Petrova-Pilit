import { FC, memo, useCallback, useEffect, useState } from 'react'
import MultipleFileInput from '../../../../components/MultipleFileInput/MultipleFileInput';
import { WorkImageCropper } from '../WorkImageCropper/WorkImageCropper';
import ControllerButton from '../../../../UI/ControllerButton/ControllerButton';
import { IImages } from '../../../../store';
import { classConnection } from '../../../../utils/function';

import classes from './WorkModalImages.module.scss';

interface IWorkModalImages {
    className?: string;
    title?: string;
    initialAfter?: string;
    initialBefore?: string;
    initialOtherImages?: IImages[];
    setAfter: (file: File | undefined) => void;
    setBefore: (file: File | undefined) => void;
    setOthers: (file: FileList | undefined) => void;
}

export const WorkModalImages: FC<IWorkModalImages> = memo(({
    className,
    title,
    initialAfter,
    initialBefore,
    initialOtherImages,
    setAfter,
    setBefore,
    setOthers
}) => {
    const [otherImages, setOtherImages] = useState<FileList>()


    useEffect(() => {
        const fetchFiles = async () => {
            if (initialOtherImages?.length) {
                const files = await Promise.all(initialOtherImages.map(async (image) => {
                    const response = await fetch(image.imageSrc);
                    const blob = await response.blob();
                    return new File([blob],`image_${image.id}.png`, { type: blob.type });
                }));

                const dataTransfer = new DataTransfer();
                files.forEach(file => dataTransfer.items.add(file));
                setOtherImages(dataTransfer.files);
            }
        };

        fetchFiles();
    }, [initialOtherImages, setOtherImages]);
    
    useEffect(() => {
        setOthers(otherImages)
    }, [otherImages])
    const handleImagesDelete = useCallback((index: number) => {
        if (!otherImages || otherImages.length === 0) return;
        const imagesArray = Array.from(otherImages);
        const updatedImagesArray = imagesArray.filter((_, i) => i !== index);
        const newFileList = new DataTransfer();
        updatedImagesArray.forEach(file => newFileList.items.add(file));
        setOtherImages(newFileList.files);
    }, [otherImages, setOtherImages]);

    return (
        <div className={classConnection(classes.workModalImages, className)}>
            <div className={classes.workModalImages__previews}>
                <WorkImageCropper
                    className={classes.workModalImages__previewBox}
                    title='Фото до'
                    name='beforeImage'
                    setImage={(file) => setBefore(file)}
                    initialImage={initialBefore || ''}

                />
                <WorkImageCropper
                    className={classes.workModalImages__previewBox}
                    title='Фото после'
                    name='afterImage'
                    setImage={(file) => setAfter(file)}
                    initialImage={initialAfter || ''}

                />
            </div>
            <div className={classes.workModalImages__othersPhotos}>
                <MultipleFileInput
                    className={classes.workModalImages__photosInput}
                    maxFilesCount={12}
                    handleFilesChange={(files) => setOtherImages(files || undefined)}
                    title='Другие фотографии'
                />

                {
                    !!otherImages?.length
                        ? <div className={classes.workModalImages__photosList}>
                            {
                                Array.from(otherImages).map((image, index) => {
                                    const imageUrl = URL.createObjectURL(image)
                                    return (
                                        <div
                                            className={classes.workModalImages__photosItem}
                                            key={index}
                                        >
                                            <img

                                                src={imageUrl}
                                                alt={`Изображение №${index + 1} к посту ${title}`}
                                            />
                                            <ControllerButton
                                                className={classes.workModalImages__photosDelete}
                                                type='delete'
                                                title={`Удалить фото №${index + 1}`}
                                                onClick={() => handleImagesDelete(index)}
                                            />
                                        </div>

                                    )


                                })
                            }

                        </div>

                        : null
                }


            </div>
        </div>
    )
})

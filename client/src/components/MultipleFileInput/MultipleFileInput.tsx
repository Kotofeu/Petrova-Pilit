import React, { memo, useState } from 'react';
import classes from './MultipleFileInput.module.scss';
import { classConnection } from '../../utils/function';
import { useMessage } from '../../modules/MessageContext';
import heic2any from 'heic2any';
import Loader from '../../UI/Loader/Loader';

interface IMultipleFileInput {
    className?: string;
    title?: string;
    handleFilesChange: (images: FileList | null) => void
    maxFileSize?: number;
    maxTotalSize?: number;
    maxFilesCount?: number;
    name?: string;
}

const MultipleFileInput: React.FC<IMultipleFileInput> = memo(({
    className = '',
    title = 'Выбрать файлы',
    handleFilesChange,
    maxTotalSize = 10485760,
    maxFileSize = maxTotalSize,
    maxFilesCount = 10,
    name,
}) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const allowedExtensions = /\.(jpg|jpeg|png|gif|webp|bmp|heic|heif)$/i;
    const { addMessage } = useMessage();

    const validateFiles = (files: FileList) => {
        const totalSize = Array.from(files).reduce((acc, curr) => acc + curr.size, 0);

        if (totalSize > maxTotalSize) {
            addMessage(`Превышен максимальный общий размер файлов: ${maxTotalSize / 1024 / 1024}Мб`, 'error');
            setIsError(true)
            handleFilesChange(null);
            return false;
        }

        if (files.length > maxFilesCount) {
            addMessage(`Превышено максимальное количество файлов: ${maxFilesCount}шт.`, 'error');
            setIsError(true)
            handleFilesChange(null);
            return false;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.size > maxFileSize) {
                addMessage(`Превышен размер файла ${file.name}.Максимальный размер: ${maxFileSize / 1024 / 1024}Мб`, 'error');
                setIsError(true)
                handleFilesChange(null);
                return false;
            }

            if (!allowedExtensions.exec(file.name)) {
                addMessage(`Неподдерживаемый формат файла ${file.name}`, 'error');
                setIsError(true)
                handleFilesChange(null);
                return false;
            }
        }

        return true;
    };
    const convertHeicToJpg = (fileList: FileList): Promise<FileList> => {
        return new Promise((resolve, reject) => {
            let isConvert = true
            const promises = Array.from(fileList).map(file => {
                if (/.(heic|heif)$/i.exec(file.name)) {
                    if (isConvert) {
                        addMessage(`Конвертация фотографии типа heic`, 'message')
                        isConvert = false
                    }
                    return heic2any({ blob: file, toType: 'image/jpeg' })
                        .then((blobs) => {
                            const blob = Array.isArray(blobs) ? blobs[0] : blobs;
                            return new File([blob], file.name.replace(/.heic$|.heif$/i, '.jpg'), { type: 'image/jpeg' });
                        });
                } else {
                    return Promise.resolve(file);
                }
            });

            Promise.all(promises)
                .then((convertedFiles) => {
                    const newFileList = new DataTransfer();
                    convertedFiles.forEach(file => newFileList.items.add(file));
                    resolve(newFileList.files);
                })
                .catch(reject);
        });
    };
    const handleInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        fileLoad(event.target.files)
    };

    const handleDrop = async (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsHovering(false);
        fileLoad(event.dataTransfer.files)
    };

    const fileLoad = async (files: FileList | null) => {
        setIsLoading(true)
        setIsError(false);
        if (files && validateFiles(files)) {
            try {
                const jpgFileList = await convertHeicToJpg(files);
                handleFilesChange(jpgFileList);
                setIsError(false)
            } catch (error) {
                setIsError(true)
                addMessage(`Ошибка конвертации heic файла: ${error}`, 'error')
            }
        }
        setIsLoading(false)

    }

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsHovering(true);
    };

    const handleDragLeave = () => {
        setIsHovering(false);
    };

    return (
        <>
            <label
                className={classConnection(
                    classes.multipleFileInput,
                    isError ? classes.multipleFileInput_error : '',
                    isHovering ? classes.multipleFileInput_hover : '',
                    className
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {
                    !isLoading
                        ? <span className={classes.multipleFileInput__cam} />
                        : null
                }
                {
                    isLoading && !isError
                        ? <Loader className={classes.multipleFileInput__loader} isLoading />
                        : null
                }

                <span className={classes.multipleFileInput__text}>
                    {title}
                </span>
                <input
                    name={name}
                    type="file"
                    multiple={maxFilesCount > 1}
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.heic,.webp,.heif"
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                    onClick={(event) => event.currentTarget.value = ''}
                />
            </label>
        </>
    );
});

export default MultipleFileInput;
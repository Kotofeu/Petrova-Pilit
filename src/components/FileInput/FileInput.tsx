import React, { memo, useEffect, useState } from 'react';
import classes from './FileInput.module.scss';
import { classConnection } from '../../utils/function';
import { useMessage } from '../../modules/MessageContext';

interface IFileInput {
    className?: string;
    title?: string;
    handleFileChange: (images: File | null) => void
    maxFileSize?: number;
    name?: string;
    type?: 'photo' | 'icon' | 'video'
}

const FileInput: React.FC<IFileInput> = memo(({
    className = '',
    title = 'Выбрать файл',
    handleFileChange,
    maxFileSize = 4194304,
    name,
    type = 'photo',
}) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const allowedExtensions = type === 'photo' 
        ? /.(jpg|jpeg|png|gif|bmp|webp|tiff)$/i 
        : type === 'icon' 
            ? /.(svg|png|ico)$/i 
            : /.(mp4|mov|mp3|wmv|avi|mpeg)$/i;
    const { addMessage } = useMessage();
    const validateFile = (file: File) => {
        if (file.size > maxFileSize) {
            addMessage(`Превышен максимальный размер (${maxFileSize / 1024 / 1024}Мб) файла: "${file.name}" (${Math.round(file.size / 1024 / 1024 * 100) / 100}Мб.)`, 'error')
            setIsError(true);
            handleFileChange(null);
            return false;
        }
        if (!allowedExtensions.exec(file.name)) {
            addMessage(`Неподдерживаемый формат файла ${file.name}`, 'error')
            setIsError(true);
            handleFileChange(null);
            return false;
        }
        return true;
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const image = event.target.files ? event.target.files[0] : null;
        if (image) {
            if (validateFile(image)) {
                handleFileChange(image);
                setIsError(false);
            }
        }
        event.target.value = '';
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsHovering(false);
        const image = event.dataTransfer.files ? event.dataTransfer.files[0] : null
        if (image && validateFile(image)) {
            handleFileChange(image);
            setIsError(false);
        }
    };

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
                    classes.fileInput,
                    isError ? classes.fileInput_error : '',
                    isHovering ? classes.fileInput_hover : '',
                    className
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <span className={classes.fileInput__text}>
                    {title}
                </span>
                <input
                    name={name}
                    type="file"
                    accept={
                        type === 'photo' ? '.jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff' :
                        type === 'icon' ? '.svg,.png,.ico' : '.mp4,.mov,.mp3,.wmv,.avi,.mpeg'
                    }
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                />
            </label>
        </>
    );
});

export default FileInput;
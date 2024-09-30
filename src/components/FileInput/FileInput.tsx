import React, { memo, useEffect, useState } from 'react';
import classes from './FileInput.module.scss';
import { classConnection } from '../../utils/function';
import Message from '../../UI/Message/Message';
import { useMessage } from '../../modules/MessageContext';

interface IFileInput {
    className?: string;
    title?: string;
    handleFileChange: (images: File | null) => void
    maxFileSize?: number;
    name?: string;
}

const FileInput: React.FC<IFileInput> = memo(({
    className = '',
    title = 'Выбрать файл',
    handleFileChange,
    maxFileSize = 4194304,
    name,
}) => {
    const [error, setError] = useState<string>('');
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const allowedExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|tiff)$/i;
    const { addMessage } = useMessage();
    useEffect(() => {
        if (error) addMessage(error, 'error')
    }, [error])
    const validateFile = (file: File) => {

        if (file.size > maxFileSize) {
            setError(`Превышен максимальный размер (${maxFileSize / 1024 / 1024}Мб) файла: "${file.name}" (${Math.round(file.size / 1024 / 1024 * 100) / 100}Мб.)`);
            handleFileChange(null);
            return false;
        }
        if (!allowedExtensions.exec(file.name)) {
            setError(`Неподдерживаемый формат файла ${file.name}`);
            handleFileChange(null);
            return false;
        }
        return true;
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const image = event.target.files ? event.target.files[0] : null
        if (image && validateFile(image)) {
            handleFileChange(image);
            setError('');
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsHovering(false);
        const image = event.dataTransfer.files ? event.dataTransfer.files[0] : null
        if (image && validateFile(image)) {
            handleFileChange(image);
            setError('');
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
                    error ? classes.fileInput_error : '',
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
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff"
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                />
            </label>
        </>
    );
});

export default FileInput;
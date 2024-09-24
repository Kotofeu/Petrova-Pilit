import React, { memo, useState } from 'react';
import classes from './MultipleFileInput.module.scss';
import classConnection from '../../utils/function/classConnection';

interface IMultipleFileInput {
    className?: string;
    title?: string;
    showFileName?: boolean;
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
    const [error, setError] = useState<string>('');
    const [isHovering, setIsHovering] = useState<boolean>(false);
    const allowedExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|tiff)$/i;

    const validateFiles = (files: FileList) => {
        const totalSize = Array.from(files).reduce((acc, curr) => acc + curr.size, 0);

        if (totalSize > maxTotalSize) {
            setError(`Превышен максимальный общий размер файлов: ${maxTotalSize / 1024 / 1024}Мб`);
            handleFilesChange(null);
            return false;
        }

        if (files.length > maxFilesCount) {
            setError(`Превышено максимальное количество файлов: ${maxFilesCount}шт.`);
            handleFilesChange(null);
            return false;
        }

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.size > maxFileSize) {
                setError(`Превышен размер файла ${file.name}.Максимальный размер: ${maxFileSize / 1024 / 1024}Мб`);
                handleFilesChange(null);
                return false;
            }

            if (!allowedExtensions.exec(file.name)) {
                setError(`Неподдерживаемый формат файла ${file.name}`);
                handleFilesChange(null);
                return false;
            }
        }

        return true;
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && validateFiles(files)) {
            handleFilesChange(files);
            setError('');
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsHovering(false);
        const files = event.dataTransfer.files;

        if (files && validateFiles(files)) {
            handleFilesChange(files);
            setError('');
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsHovering(true);
    };

    const handleDragLeave = () => {
        setIsHovering(false);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <label
                className={classConnection(
                    classes.multipleFileInput,
                    error ? classes.multipleFileInput_error : '',
                    isHovering ? classes.multipleFileInput_hover : '',
                    className
                )}
            >
                <span className={classes.multipleFileInput__cam} />
                <span className={classes.multipleFileInput__text}>
                    {error || title}
                </span>
                <input
                    name={name}
                    type="file"
                    multiple accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff"
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                />
            </label>
        </div>
    );
});

export default MultipleFileInput;
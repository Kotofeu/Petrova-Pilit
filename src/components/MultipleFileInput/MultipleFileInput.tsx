import React, { memo, useState } from 'react';
import classes from './MultipleFileInput.module.scss';
import { classConnection } from '../../utils/function';
import { useMessage } from '../../modules/MessageContext';

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
    const allowedExtensions = /\.(jpg|jpeg|png|gif|bmp|webp|tiff)$/i;
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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && validateFiles(files)) {
            handleFilesChange(files);
            setIsError(false)
        }

    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        setIsHovering(false);
        const files = event.dataTransfer.files;

        if (files && validateFiles(files)) {
            handleFilesChange(files);
            setIsError(false)

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
                    classes.multipleFileInput,
                    isError ? classes.multipleFileInput_error : '',
                    isHovering ? classes.multipleFileInput_hover : '',
                    className
                )}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <span className={classes.multipleFileInput__cam} />
                <span className={classes.multipleFileInput__text}>
                    {title}
                </span>
                <input
                    name={name}
                    type="file"
                    multiple={maxFilesCount > 1}
                    accept=".jpg,.jpeg,.png,.gif,.bmp,.webp,.tiff"
                    onChange={handleInputChange}
                    style={{ display: 'none' }}
                    onClick={(event) => event.currentTarget.value = ''}
                />
            </label>
        </>
    );
});

export default MultipleFileInput;
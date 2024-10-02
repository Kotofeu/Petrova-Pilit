import React, { memo, FC, ChangeEvent, HTMLInputTypeAttribute, LegacyRef, forwardRef } from 'react';
import classes from './Input.module.scss';
import { classConnection } from '../../utils/function';

export interface IInput {
    className?: string;
    value: string;
    title?: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    autoComplete?: string;
    name?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    style?: React.CSSProperties;
}

const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
    const {
        className = '',
        title,
        type = 'text',
        value,
        placeholder,
        autoComplete = 'off',
        name,
        onChange,
        style
    } = props;

    return (
        <input
            ref={ref}
            style={style}
            name={name}
            className={classConnection(classes.input, className)}
            type={type}
            autoComplete={autoComplete}
            title={title}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            aria-label={title}
        />
    );
});

export default memo(Input);
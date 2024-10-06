import "./InputComponent.scss";
import { MantineRadius, MantineSize, TextInput } from '@mantine/core';
import {HTMLInputTypeAttribute, ReactNode, useCallback, useState} from 'react';
import { ImageConfig } from "../../constants";

interface InputComponentProps {
    readOnly?: boolean;
    label?: ReactNode;
    variant?: "unstyled" | "filled" | 'default';
    inputWrapperOrder?: ("input" | "label" | "description" | "error")[];
    required?: boolean;
    prefixElement?: ReactNode;
    suffixElement?: ReactNode;
    size?: MantineSize | (string & {});
    radius?: MantineRadius | number;
    error?: ReactNode;
    disabled?: boolean;
    description?: ReactNode;
    placeholder?: string;
    value?: string | number;
    clearable?: boolean;
    inputType?: HTMLInputTypeAttribute;
    onChange?: (value: string | number) => void;
    inputRef?: React.Ref<HTMLInputElement>;
    autoFocus?: boolean;
    onEnterPress?: (value:string|number) => void;
}

const InputComponent = (props: InputComponentProps) => {
    const {
        onChange,
        required = false,
        prefixElement,
        suffixElement,
        size ,
        radius = 'md',
        error,
        disabled = false,
        description,
        inputWrapperOrder = ['label', 'description', 'input', 'error'],
        placeholder = '',
        value,
        label,
        variant = 'default',
        readOnly = false,
        clearable = false,
        inputType = 'text', // Default input type is text
        inputRef,
        autoFocus,
        onEnterPress,
    } = props;

    // Manage the value internally if `onChange` is not provided
    const [inputValue, setInputValue] = useState<string | number>(value || '');

    // Handle changes either with internal state or the provided onChange
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        if (onChange) {
            onChange(newValue);
        } else {
            setInputValue(newValue);
        }
    };

    // Clear the input if clearable
    const handleClear = () => {
        if (onChange) {
            onChange('');
        } else {
            setInputValue('');
        }
    };

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onEnterPress) {
            onEnterPress(inputValue)
        }
    },[inputValue, onEnterPress]);

    return (
        <TextInput
            ref={inputRef}
            type={inputType} // Allow input types like password, email, etc.
            readOnly={readOnly}
            withAsterisk={required}
            error={error}
            disabled={disabled}
            label={label}
            description={description}
            placeholder={placeholder}
            value={onChange ? value : inputValue} // Conditionally control value
            variant={variant}
            leftSection={prefixElement} // Use prefixElement as-is
            rightSection={clearable ? (
                <ImageConfig.CloseIcon onClick={handleClear} style={{ cursor: 'pointer' }} />
            ) : suffixElement} // Handle clearable icon or suffix
            size={size}
            radius={radius}
            onChange={handleChange}
            inputWrapperOrder={inputWrapperOrder}
            autoFocus={autoFocus}
            onKeyDown={handleKeyDown}
        />
    );
};

export default InputComponent;

import "./TextAreaComponent.scss";
import {MantineRadius, MantineSize, Textarea} from "@mantine/core";
import {ReactNode, useCallback} from "react";

interface TextAreaComponentProps {
    value?: string;
    onChange: (value: string) => void;
    autoSize?: boolean;
    className?: string;
    description?: ReactNode;
    disabled?: boolean;
    error?: ReactNode;
    label?: ReactNode;
    prefixElement?: ReactNode;
    suffixElement?: ReactNode;
    maxRows?: number;
    minRows?: number;
    radius?: MantineRadius | number;
    required?: boolean;
    size?: MantineSize | (string & {}),
    variant?: 'filled' | 'unstyled';
    resize?: 'both' | 'horizontal' | 'vertical' | 'none';
    autoFocus?: boolean;
}

const TextAreaComponent = (props: TextAreaComponentProps) => {
    const {
        value,
        onChange,
        className,
        label,
        description,
        placeholder,
        variant,
        required,
        resize,
        autoSize,
        disabled,
        error,
        prefixElement,
        suffixElement,
        maxRows,
        minRows,
        radius,
        size,
        autoFocus,
    } = props;

    const handleChange = useCallback((e) => {
        onChange(e.target.value);
    }, [onChange])

    return (
        <Textarea
            value={value}
            className={`text-area-component ${className || ''}`}
            label={label}
            description={description}
            placeholder={placeholder}
            withAsterisk={required}
            variant={variant}
            resize={resize}
            autosize={autoSize}
            disabled={disabled}
            error={error}
            leftSection={prefixElement}
            rightSection={suffixElement}
            maxRows={maxRows}
            minRows={minRows}
            radius={radius}
            size={size}
            spellCheck={false}
            onChange={handleChange}
            autoFocus={autoFocus}
        />
    );
};

export default TextAreaComponent;

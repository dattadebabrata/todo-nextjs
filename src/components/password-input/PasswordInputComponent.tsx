import "./PasswordInputComponent.scss";
import {MantineRadius, MantineSize, PasswordInput} from "@mantine/core";
import {ReactNode, useState} from "react";
import {ImageConfig} from "../../constants"; // Assuming ImageConfig contains CloseIcon and visibility icons

interface PasswordInputComponentProps {
    label?: ReactNode;
    inputWrapperOrder?: ("input" | "label" | "description" | "error")[];
    variant?: "unstyled" | "filled" | "default";
    required?: boolean;
    prefixElement?: ReactNode;
    suffixElement?: ReactNode;
    size?: MantineSize | (string & {});
    radius?: MantineRadius | number;
    error?: ReactNode;
    description?: ReactNode;
    onChange?: (value: string | number) => void;
    inputRef?: React.Ref<HTMLInputElement>;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    value?: string | number;
    clearable?: boolean;
    toggleVisibility?: boolean;
}

const PasswordInputComponent = (props: PasswordInputComponentProps) => {
    const {
        onChange,
        required = false,
        prefixElement,
        suffixElement,
        size,
        radius = 'md',
        error,
        description,
        inputWrapperOrder = ['label', 'description', 'input', 'error'],
        placeholder = '',
        value,
        label,
        variant = 'default',
        readOnly = false,
        disabled = false,
        clearable = false,
        toggleVisibility = false,
    } = props;

    const [inputValue, setInputValue] = useState<string | number>(value || '');
    const [visible, setVisible] = useState(false); // Control password visibility

    // Handle input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        if (onChange) {
            onChange(newValue);
        } else {
            setInputValue(newValue);
        }
    };

    // Handle clear input
    const handleClear = () => {
        if (onChange) {
            onChange('');
        } else {
            setInputValue('');
        }
    };

    // Right section logic based on priority: clearable > suffixElement > toggleVisibility
    const getRightSection = () => {
        if (clearable) {
            return (
                <ImageConfig.CloseIcon
                    onClick={handleClear}
                    style={{cursor: 'pointer'}}
                />
            );
        }
        if (suffixElement) {
            return suffixElement;
        }
        if (toggleVisibility) {
            return visible ? (
                <ImageConfig.EyeOpen
                    onClick={() => setVisible(false)}
                    style={{cursor: 'pointer'}}
                />
            ) : (
                <ImageConfig.EyeClosed
                    onClick={() => setVisible(true)}
                    style={{cursor: 'pointer'}}
                />
            );
        }
        return null;
    };

    return (
        <PasswordInput
            className="password-input-component"
            label={label}
            description={description}
            placeholder={placeholder}
            visible={visible}
            variant={variant}
            defaultVisible={false}
            onVisibilityChange={() => setVisible((prev) => !prev)} // Toggle visibility
            withAsterisk={required}
            error={error}
            disabled={disabled}
            readOnly={readOnly}
            value={onChange ? value : inputValue} // Conditionally control value
            leftSection={prefixElement} // Prefix element for icons or additional elements
            rightSection={getRightSection()} // Handle right section based on priority
            size={size}
            radius={radius}
            onChange={handleChange}
            inputWrapperOrder={inputWrapperOrder}
        />
    );
};

export default PasswordInputComponent;

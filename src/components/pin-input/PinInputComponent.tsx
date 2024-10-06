import "./PinInputComponent.scss";
import {Input, PinInput} from "@mantine/core";
import {MantineRadius, MantineSize} from "@mantine/core/lib/core";

interface PinInputComponentProps {
    variant?: "unstyled" | "filled";
    length: number;
    label?: string;
    musk?: boolean;
    error?: string;
    description?: string;
    onChange?: (value: string) => void;
    onComplete?: (value: string) => void;
    placeholder?: string;
    type?: 'alphanumeric' | 'number' | RegExp;
    readOnly?: boolean;
    disabled?: boolean;
    radius?: MantineRadius;
    size?: MantineSize;
    autoFocus?: boolean;
    value?: string;
    required?: boolean;
}

const PinInputComponent = (props: PinInputComponentProps) => {
    const {
        length,
        musk = true,
        label,
        error,
        description,
        onChange,
        onComplete,
        placeholder,
        type,
        readOnly,
        disabled,
        radius,
        size,
        autoFocus,
        value,
        variant,
        required
    } = props;

    return (
        <Input.Wrapper
            label={label}
            description={description}
            error={error}
            required={required}
        >
            <PinInput
                variant={variant}
                length={length}
                mask={musk}
                error={error}
                onChange={onChange}
                onComplete={onComplete}
                placeholder={placeholder}
                type={type}
                readOnly={readOnly}
                disabled={disabled}
                radius={radius}
                size={size}
                autoFocus={autoFocus}
                value={value}
            />
        </Input.Wrapper>
    );

};

export default PinInputComponent;

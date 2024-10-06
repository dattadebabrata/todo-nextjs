import "./RadioInputComponent.scss";
import {Group, MantineColor, Radio} from "@mantine/core";
import {ReactNode, useCallback} from "react";

interface RadioInputComponentProps {
    radioOptions: RadioOption[];
    direction?: "row" | "column";
    variant?: 'outline';
    label?: string;
    description?: string;
    error?: ReactNode;
    readOnly?: boolean;
    onChange?: (value: string | RadioOption) => void; // Change to accept full option
    className?: string;
    color?: MantineColor;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    value: string | undefined | null | any;
    displayWith?: (option: RadioOption) => ReactNode;
    valueExtractor?: (option: RadioOption) => string;
    disableOption?: (option: RadioOption) => boolean;
    getEntireValue?: boolean; // New prop to get the entire option
}

interface RadioOption {
    [key: string]: any;
}

const RadioInputComponent = (props: RadioInputComponentProps) => {
    const {
        label,
        description,
        onChange,
        readOnly,
        direction = 'row',
        variant,
        radioOptions,
        error,
        value,
        size,
        displayWith = (option: RadioOption) => option.label,
        valueExtractor = (option: RadioOption) => option.value,
        disableOption = (option: RadioOption) => option.disabled,
        getEntireValue = false, // Default to false
    } = props;

    // Handler for change events
    const handleChange = (value: string) => {
        const selectedOption = radioOptions.find(option => valueExtractor(option) === value);
        if (onChange) {
            // If getEntireValue is true, send the whole option; otherwise, send just the value
            onChange(getEntireValue && selectedOption ? selectedOption : value);
        }
    };

    return (
        <Radio.Group
            className='radio-input-component'
            label={label}
            description={description}
            onChange={handleChange} // Use the new handler
            readOnly={readOnly}
            error={error}
            value={getEntireValue ? valueExtractor(value) : value}
        >
            <Group
                mt="xs"
                styles={{
                    root:{
                        flexDirection: direction,
                        alignItems: direction === 'column' ? "flex-start" : "center",
                        marginBottom:5
                    }
                }}
            >
                {
                    radioOptions.map((option) => (
                        <Radio
                            variant={variant}
                            key={option.value}
                            value={valueExtractor(option)}
                            label={displayWith(option)}
                            disabled={disableOption(option)}
                            size={size}
                        />
                    ))
                }
            </Group>
        </Radio.Group>
    );
};

export default RadioInputComponent;

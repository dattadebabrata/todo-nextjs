import "./CheckboxInputComponent.scss";
import {ReactNode, useCallback} from "react";
import {Group, MantineColor, Checkbox, MantineRadius} from "@mantine/core";

interface CheckboxInputComponentProps {
    checkBoxOptions?: checkboxOptions[]; // Optional for single checkbox usage
    value: any[] | boolean; // Can be a boolean for single checkbox or array for group
    single?: boolean; // Prop to differentiate between single and group checkbox usage
    direction?: "row" | "column";
    variant?: "outline";
    label?: string;
    description?: string;
    error?: ReactNode;
    readOnly?: boolean;
    required?: boolean;
    onChange?: (value: any) => void;
    className?: string;
    color?: MantineColor;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    radius?: MantineRadius | number;
    displayWith?: (option: checkboxOptions) => any;
    valueExtractor?: (option: checkboxOptions) => any;
    disableOption?: (option: checkboxOptions) => boolean;
    getEntireValue?: boolean;
    indeterminate?: boolean; // Indeterminate state for single checkbox
}

interface checkboxOptions {
    [key: string]: any;
}

const CheckboxInputComponent = (props: CheckboxInputComponentProps) => {
    const {
        value,
        single = false, // Default to false (group by default)
        checkBoxOptions = [],
        direction = 'row',
        variant,
        size,
        radius,
        label,
        description,
        error,
        readOnly,
        required,
        onChange,
        displayWith = (option: checkboxOptions) => option.label,
        valueExtractor = (option: checkboxOptions) => option.value,
        disableOption = (option: checkboxOptions) => option.disabled,
        getEntireValue = false,
        indeterminate = false, // Default indeterminate state to false
    } = props;

    // Handle change for group checkboxes
    const handleOnChange = (selectedValues: string[]) => {
        const selectedObjects = checkBoxOptions.filter((option) =>
            selectedValues.includes(valueExtractor(option))
        );
        if (onChange) {
            onChange(getEntireValue ? selectedObjects : selectedValues);
        }
    };

    // Handle change for single checkbox
    const handleSingleChange = (checked: boolean) => {
        if (onChange) {
            onChange(checked);
        }
    };

    // Extract values if getEntireValue is true (for group)
    const getValueFromObject = (selectedValues: any[]) => {
        return selectedValues.map((selectedValue: any) => valueExtractor(selectedValue));
    };

    return single ? (
        // Single Checkbox (supports indeterminate)
        <Checkbox
            className={'checkbox-input-component single-checkbox'}
            checked={value as boolean} // Single checkbox uses boolean value
            indeterminate={indeterminate} // Handle indeterminate state
            onChange={(event) => handleSingleChange(event.currentTarget.checked)}
            label={label}
            description={description}
            withAsterisk={required}
            error={error}
            readOnly={readOnly}
            size={size}
            radius={radius}
            variant={variant}
        />
    ) : (
        // Group of Checkboxes
        <Checkbox.Group
            onChange={handleOnChange}
            className={'checkbox-input-component checkbox-group'}
            value={getEntireValue ? getValueFromObject(value as any[]) : (value as any[])}
            label={label}
            description={description}
            withAsterisk={required}
            error={error}
            readOnly={readOnly}
        >
            <Group
                mt="xs"
                styles={{
                    root: {
                        flexDirection: direction === 'column' ? 'column' : 'row',
                        alignItems: direction === 'column' ? 'flex-start' : undefined,
                        marginBottom: 5,
                    },
                }}
            >
                {checkBoxOptions.map((option) => (
                    <Checkbox
                        radius={radius}
                        size={size}
                        variant={variant}
                        key={option.value}
                        value={valueExtractor(option)}
                        label={displayWith(option)}
                        disabled={disableOption(option)}
                    />
                ))}
            </Group>
        </Checkbox.Group>
    );
};

export default CheckboxInputComponent;

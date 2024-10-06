import "./SwitchComponent.scss";
import {ReactNode, useCallback, useEffect} from "react";
import {Group, MantineColor, MantineRadius, Switch, rem} from "@mantine/core";
import {ImageConfig} from '../../constants'

interface SwitchComponentProps {
    switchOptions?: switchOptions[]; // Optional for single switch usage
    value: any[] | boolean; // Can be a boolean for single switch or array for group
    single?: boolean; // Prop to differentiate between single and group switch usage
    direction?: "row" | "column";
    label?: string;
    description?: string;
    error?: ReactNode;
    readOnly?: boolean;
    required?: boolean;
    onChange?: (value: any) => void;
    className?: string;
    color?: MantineColor | 'primary' | 'secondary';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    radius?: MantineRadius | number;
    displayWith?: (option: switchOptions) => any;
    valueExtractor?: (option: switchOptions) => any;
    disableOption?: (option: switchOptions) => boolean;
    getEntireValue?: boolean;
    onLabel?: ReactNode;
    offLabel?: ReactNode;
}

interface switchOptions {
    [key: string]: any;
}

const getThumbIcon = (checked: boolean) => {
    return checked ? (
        <ImageConfig.CheckIcon
            color={'green'}
        />
    ) : (
        <ImageConfig.CrossIcon
            color={'red'}
        />
    )
}

const SwitchComponent = (props: SwitchComponentProps) => {
    const {
        color,
        value,
        single = false, // Default to false (group by default)
        switchOptions = [],
        direction = 'row',
        size,
        radius,
        label,
        description,
        error,
        readOnly,
        required,
        onChange,
        displayWith = (option: switchOptions) => option.label,
        valueExtractor = (option: switchOptions) => option.value,
        disableOption = (option: switchOptions) => option.disabled,
        getEntireValue = false,
        onLabel,
        offLabel,
    } = props;


    // Handle change for group switches
    const handleOnChange = (selectedValues: string[]) => {
        const selectedObjects = switchOptions.filter((option) =>
            selectedValues.includes(valueExtractor(option))
        );
        if (onChange) {
            onChange(getEntireValue ? selectedObjects : selectedValues);
        }
    };

    // Handle change for single switch
    const handleSingleChange = (checked: boolean) => {
        if (onChange) {
            onChange(checked);
        }
    };

    // Extract values if getEntireValue is true (for group)
    const getValueFromObject = useCallback((selectedValues: any[]) => {
        return selectedValues?.map && selectedValues?.map((selectedValue: any) => valueExtractor(selectedValue));
    },[]);
    const groupedSelectedList = getEntireValue ? getValueFromObject(value as any[]) : (value as any[])

    return single ? (
        // Single Sswitch (supports indeterminate)
        <Switch
            color={color as MantineColor}
            className={'switch-input-component single-switch'}
            checked={value as boolean} // Single switch uses boolean value
            onChange={(event) => handleSingleChange(event.currentTarget.checked)}
            label={label}
            description={description}
            withAsterisk={required}
            error={error}
            readOnly={readOnly}
            size={size}
            radius={radius}
            onLabel={onLabel}
            offLabel={offLabel}
            thumbIcon={getThumbIcon(!!value)}
        />
    ) : (
        // Group of Sswitches
        <Switch.Group
            onChange={handleOnChange}
            className={'switch-input-component switch-group'}
            value={groupedSelectedList}
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
                {switchOptions.map((option, index) => {
                    const currentOptionValue = valueExtractor(option);
                    return <Switch
                        color={color as MantineColor}
                        radius={radius}
                        size={size}
                        key={option.value}
                        value={valueExtractor(option)}
                        label={displayWith(option)}
                        disabled={disableOption(option)}
                        onLabel={onLabel}
                        offLabel={offLabel}
                        thumbIcon={getThumbIcon(groupedSelectedList.includes(currentOptionValue))}
                    />
                })}
            </Group>
        </Switch.Group>
    );
};

export default SwitchComponent;

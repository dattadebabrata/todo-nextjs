import "./TimePickerComponent.scss";
import TimePicker from 'rc-time-picker';
import {ITimePickerProps} from "../../../models/form-controls.model";
import React, {useCallback, useEffect, useState} from "react";
import LabelComponent from "../../label/LabelComponent";
import ErrorTextComponent from "../../error-text/ErrorTextComponent";
import 'rc-time-picker/assets/index.css';
import {ImageConfig} from "../../../../constants";
import moment from "moment";

interface TimePickerComponentProps extends ITimePickerProps {
    name?: string;
    value?: string;
    hasError?: boolean;
    errorMessage?: any;
    size?: "small" | "medium";
}

const TimePickerComponent = (props: TimePickerComponentProps) => {

    const {
        className,
        hasError,
        required,
        fullWidth,
        disabled,
        label,
        onChange,
        errorMessage,
        disabledHours,
        disabledMinutes,
        disabledSeconds,
        size,
    } = props;

    const format = props.format || "hh:mm a";
    const placeholder = props.placeholder || 'Time';
    const [value, setValue] = useState<any>(props.value ? moment(props.value, format) : null);
    const showSeconds = props.showSeconds || false;
    const showHours = props.showHours !== undefined ? props.showHours : true;
    const showMinutes = props.showMinutes !== undefined ? props.showMinutes : true;
    const use12Hours = props.use12Hours !== undefined ? props.use12Hours : true;
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

    const handleChange = useCallback((newValue: any) => {
        try {

            setValue(newValue);
            if (showSeconds) {
                if (newValue && newValue.hours() !== null && newValue.minutes() !== null && newValue.seconds() !== null) {
                    if (onChange) {
                        onChange(newValue && newValue.format(format));
                    }
                }
            } else {
                if (newValue && newValue.hours() !== null && newValue.minutes() !== null) {
                    if (onChange) {
                        onChange(newValue && newValue.format(format));
                    }
                }
            }
        } catch (error) {
            console.error("Error in TimePickerComponent handleChange", error);
        }
    }, [onChange, format, showSeconds]);

    const handleTimePickerOpen = useCallback(() => {
        if(disabled) return;
        setIsTimePickerOpen(true);
        document.documentElement.style.overflow = "hidden"; // Prevent scrolling
    }, [disabled]);

    const handleTimePickerClose = useCallback(() => {
        setIsTimePickerOpen(false);
        document.documentElement.style.overflow = "auto"; // Restore scrolling
    }, []);

    useEffect(() => {
        if (props.value && moment(props.value, format).isValid()) {
            setValue(moment(props.value, format));
        } else {
            setValue(null);
        }
    }, [props.value, format]);

    return (
        <div
            className={`time-picker-component ${fullWidth ? "fullWidth" : ''} ${disabled ? 'disabled' : ''} ${hasError ? 'has-error' : ''} ${size ? size : ""}`}>
            {label && <LabelComponent title={label || ''} required={required}/>}
            <div className={"time-picker-container"}>
                <TimePicker
                    disabled={disabled}
                    placeholder={placeholder}
                    className={`time-picker-field ${className}`}
                    onChange={handleChange}
                    showSecond={showSeconds}
                    showHour={showHours}
                    showMinute={showMinutes}
                    open={isTimePickerOpen}
                    onOpen={handleTimePickerOpen}
                    onClose={handleTimePickerClose}
                    value={value}
                    format={format}
                    disabledHours={disabledHours}
                    disabledMinutes={disabledMinutes}
                    disabledSeconds={disabledSeconds}
                    use12Hours={use12Hours}
                    clearIcon={<span>
                    </span>}
                    clearText={""}
                    inputReadOnly
                    addon={() => <div className="time-picker-close" onClick={handleTimePickerClose}>
                        Close
                    </div>
                    }
                />
                {/*{!value &&*/}
                <ImageConfig.CalendarTimePicker className="time-picker-icon" onClick={handleTimePickerOpen}/>
                {/*}*/}
            </div>
            {(errorMessage && hasError) && (
                <ErrorTextComponent error={errorMessage}/>
            )}
        </div>
    );
};

export default TimePickerComponent;

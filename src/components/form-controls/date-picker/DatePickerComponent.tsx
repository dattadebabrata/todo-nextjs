import "./DatePickerComponent.scss";
import React, {useCallback, useEffect, useState} from "react";

import {IDatePickerProps} from "../../../models/form-controls.model";
import LabelComponent from "../../label/LabelComponent";
import ErrorTextComponent from "../../error-text/ErrorTextComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ImageConfig} from "../../../../constants";
import moment, {Moment} from "moment";

interface DatePickerComponentProps extends IDatePickerProps {
    value?: any;
    monthSelection?: boolean;
    showArrow?: boolean;
}

const DatePickerComponent = (props: DatePickerComponentProps) => {

    const {
        name,
        label,
        hasError,
        errorMessage,
        className,
        fullWidth,
        onChange,
        minDate,
        maxDate,
        required,
        monthSelection,
        showArrow=true
    } = props;

    const showMonthDropdown = props.showMonthDropdown || true;
    const showYearDropdown = props.showYearDropdown || true;
    const peekNextMonth = props.peekNextMonth || true;
    const dropdownMode = props.dropdownMode || 'select';
    const placeholder = props.placeholder || 'Date';
    const clearable = props.clearable !== undefined ? props.clearable : false;
    const format = props.format ? props.format : 'dd/MM/yyyy';
    const [date, setDate] = useState<Moment | null>(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleTimePickerOpen = useCallback(() => {
        setIsDatePickerOpen(true);
    }, []);

    const handleTimePickerClose = useCallback(() => {
        setIsDatePickerOpen(false);
    }, []);

    const handleDatePickerToggle = useCallback(() => {
        setIsDatePickerOpen(!isDatePickerOpen);
    }, [isDatePickerOpen]);

    const handleChange = useCallback((date: Date | null) => {
        if (date) {
            const selectedDateMoment = moment(date);
            setDate(selectedDateMoment);
            if (onChange) onChange(selectedDateMoment);
        } else {
            setDate(null);
            if (onChange) onChange(null);
        }
        handleTimePickerClose();
    }, [onChange, handleTimePickerClose]);


    useEffect(() => {
        setDate(props.value ? props.value : null);
    }, [props.value]);

    return (
        <div className={`date-picker-component ${fullWidth ? "fullWidth" : ''}`}>
            {date && !monthSelection && showArrow && <div className={'date-picker-decrease-icon'} onClick={() => {
                handleChange(moment(date).subtract(1, 'days').toDate())
            }}>
                <ImageConfig.ArrowBackIcon/>
            </div>}
            {label && <LabelComponent title={label} required={required}/>}
            <div className={"date-picker-container"}>
                <DatePicker
                    showMonthYearPicker={monthSelection}
                    showTwoColumnMonthYearPicker={true}
                    className={`date-picker-field ${className}`}
                    placeholderText={placeholder}
                    name={name}
                    autoComplete={"off"}
                    selected={date?.toDate()}
                    dateFormat={format}
                    minDate={minDate?.toDate()}
                    maxDate={maxDate?.toDate()}
                    showMonthDropdown={showMonthDropdown}
                    showYearDropdown={showYearDropdown}
                    peekNextMonth={peekNextMonth}
                    dropdownMode={dropdownMode}
                    open={isDatePickerOpen}
                    onCalendarOpen={handleTimePickerOpen}
                    onCalendarClose={handleTimePickerClose}
                    onClickOutside={handleTimePickerClose}
                    onChange={handleChange}
                    isClearable={clearable}
                />
                <ImageConfig.CalendarIcon className="date-picker-icon" onClick={handleDatePickerToggle}/>
            </div>
            {(errorMessage && hasError) && (
                <ErrorTextComponent error={errorMessage}/>
            )}
            {date && !monthSelection && showArrow && <div
                className={date === moment() ? 'date-picker-increase-icon disabled' : 'date-picker-increase-icon'}
                onClick={() => {
                    if (date && date.format('YYYY-MM-DD') >= moment().subtract(1, "days").format('YYYY-MM-DD')) return;
                    handleChange(moment(date).add(1, 'days').toDate())
                }}>
                <ImageConfig.ArrowRightIcon/>
            </div>}
        </div>
    );

};

export default DatePickerComponent;

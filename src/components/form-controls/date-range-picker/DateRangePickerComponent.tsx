import './DateRangePickerComponent.scss';
import DateRangePicker, {DateRange} from 'rsuite/DateRangePicker';
import LabelComponent from '../../label/LabelComponent';
import React, {useCallback, useEffect, useState} from 'react';
import moment, {Moment} from 'moment';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import {RangeType} from 'rsuite/esm/DateRangePicker/types';
import {ImageConfig} from '../../../../constants';
import IconButtonComponent from '../../icon-button/IconButtonComponent';
import {CommonService} from "../../../services";
import ToolTipComponent from "../../tool-tip/ToolTipComponent";

const PREDEFINED_RANGES: RangeType[] = [
    {
        label: 'Today',
        value: [startOfDay(new Date()), endOfDay(new Date())],
        placement: 'left'
    },
    {
        label: 'Yesterday',
        value: [startOfDay(addDays(new Date(), -1)), endOfDay(addDays(new Date(), -1))],
        placement: 'left'
    },
    {
        label: 'This week',
        value: [startOfDay(startOfWeek(new Date())), endOfDay(endOfWeek(new Date()))],
        placement: 'left'
    },
    {
        label: 'Last 7 days',
        value: [startOfDay(subDays(new Date(), 6)), endOfDay(new Date())],
        placement: 'left'
    },
    {
        label: 'Last 30 days',
        value: [startOfDay(subDays(new Date(), 29)), endOfDay(new Date())],
        placement: 'left'
    },
    {
        label: 'This month',
        value: [startOfDay(startOfMonth(new Date())), endOfDay(endOfMonth(new Date()))],
        placement: 'left'
    }
]

interface DateRangePickerComponentProps {
    size?: 'lg' | 'md' | 'sm' | 'xs';
    label?: string;
    required?: boolean;
    className?: string;
    placeholder?: string;
    format?: 'date' | 'date-time' | 'date-time-12' | 'time-range';
    showMeridian?: boolean;
    selectionDurationType?: 'week' | 'monday-to-monday' | 'month';
    showDualCalendar?: boolean;
    showPredefinedRanges?: boolean;
    value?: [Moment, Moment];
    onChange?: (value: [Moment | undefined, Moment | undefined]) => void;
    onConfirm?: (value: [Moment, Moment]) => void;
    showNavigationArrows?: boolean;
    cleanable?: boolean;
}

const DURATION_TYPE_CONFIG: any = {
    week: {
        isoWeek: true,
        editable: false,
        oneTap: true,
        hoverRange: 'week'
    },
    'monday-to-monday': {
        isoWeek: true,
        editable: false,
        oneTap: true,
        //custom hover range for monday to monday
        hoverRange: (date: Date) => {
            const startOfMonday = startOfWeek(date, {weekStartsOn: 1});
            const nextMonday = addDays(endOfWeek(date, {weekStartsOn: 1}), 1)
            return [startOfMonday, nextMonday] as DateRange;
        }
    },
    month: {
        isoWeek: true,
        editable: false,
        oneTap: true,
        hoverRange: 'month'
    }
}
const FORMATTER_CONFIG: any = {
    'date-time': 'dd-MM-yyyy HH:mm:ss',
    'date-time-12': 'dd-MM-yyyy hh:mm aa',
    'date': 'dd-MM-yyyy',
    'time-range': 'hh:mm aa'
}

const DateRangePickerComponent = (props: DateRangePickerComponentProps) => {

    const {
        label,
        required,
        onChange,
        onConfirm,
        showDualCalendar,
        selectionDurationType,
        showPredefinedRanges,
        showNavigationArrows,
        className,
        showMeridian,
        cleanable=false,
    } = props;
    const size = props.size || 'lg';
    const placeholder = props.placeholder || 'Select Date Time Range';
    const format = props.format || 'date-time';
    const [value, setValue] = useState<[Date, Date] | undefined>(undefined);

    const handleChange = useCallback((value: any, another: any) => {
        setValue(value);
        if (onChange) {
            const startDate = value?.[0];
            const endDate = value?.[1];
            if (startDate && endDate) {
                onChange([moment(startDate), moment(endDate)] as [Moment, Moment]);
            } else {
                onChange([undefined, undefined]);
            }
        }
    }, [onChange]);


    const handleOk = useCallback((value: any) => {
        setValue(value);
        if (onConfirm) {
            onConfirm([moment(value[0]), moment(value[1])] as [Moment, Moment]);
        }
    }, [onConfirm]);

    useEffect(() => {
        const value = props.value;
        if (value) {
            setValue([value?.[0]?.toDate(), value?.[1]?.toDate()]);
        } else {
            setValue(undefined);
        }
    }, [props.value]);

    const handleArrowClick = useCallback((direction: 'left' | 'right') => {
        switch (selectionDurationType) {
            case 'week':
                // calculate new start and end date based on direction and current value
                const [startDate, endDate] = value || [new Date(), new Date()];
                const newStartDate = direction === 'left' ? subDays(startDate, 7) : addDays(startDate, 7);
                const newEndDate = direction === 'left' ? subDays(endDate, 7) : addDays(endDate, 7);
                const newDateRange = [moment(newStartDate), moment(newEndDate)] as [Moment, Moment];
                setValue([newStartDate, newEndDate]);
                if (onChange) onChange(newDateRange);
                break;
            case 'monday-to-monday':
                // calculate new start and end date based on direction and current value
                const [startDateMonday, endDateMonday] = value || [new Date(), new Date()];
                const startMonday = direction === 'left' ? subDays(startDateMonday, 7) : addDays(startDateMonday, 7);
                const endMonday = direction === 'left' ? subDays(endDateMonday, 7) : addDays(endDateMonday, 7);
                const mondayToMondayRange = [moment(startMonday), moment(endMonday)] as [Moment, Moment];
                setValue([startMonday, endMonday]);
                if (onChange) onChange(mondayToMondayRange);
                break;
            default:
                break;
        }
    }, [onChange, value, selectionDurationType]);

    return (
        <div className={'date-range-picker-component'}>
            {label && <LabelComponent title={label} required={required}/>}
            <div className="date-range-picker-container">
                {showNavigationArrows && <IconButtonComponent onClick={() => handleArrowClick('left')}>
                    <ImageConfig.ArrowBackIcon/>
                </IconButtonComponent>}
                <DateRangePicker
                    className={`date-range-picker-field ${className}`}
                    format={FORMATTER_CONFIG[format]}
                    ranges={showPredefinedRanges ? PREDEFINED_RANGES : []}
                    size={size}
                    placeholder={placeholder}
                    onChange={handleChange}
                    onOk={handleOk}
                    value={value}
                    cleanable={cleanable && !!value?.[0] && !!value?.[0]}
                    caretAs={ImageConfig.CalendarIcon}
                    {...(selectionDurationType === 'month' && {renderValue: (value, format) => moment(value[0]).format("MMM yyyy")})}
                    editable={selectionDurationType && DURATION_TYPE_CONFIG[selectionDurationType].editable}
                    hoverRange={selectionDurationType && DURATION_TYPE_CONFIG[selectionDurationType].hoverRange}
                    isoWeek={selectionDurationType && DURATION_TYPE_CONFIG[selectionDurationType].isoWeek}
                    oneTap={selectionDurationType && DURATION_TYPE_CONFIG[selectionDurationType].oneTap}
                    showOneCalendar={!showDualCalendar}
                    placement="auto"
                    showMeridian={showMeridian}
                />
                {showNavigationArrows && <IconButtonComponent onClick={() => {
                    //disable next week by using value.endDate and return
                    if (value) {
                        const currentDate = new Date();

                        // Calculate the start of the next week
                        const startOfNextWeek = new Date(value[1]);
                        startOfNextWeek.setDate(value[1].getDate() + 1);

                        // Check if the start of the next week is in the future
                        !(startOfNextWeek > currentDate) && handleArrowClick('right');
                    }
                }}>

                    <ImageConfig.ArrowRightIcon/>
                </IconButtonComponent>}
                {
                    selectionDurationType === "monday-to-monday" && value && (
                        <>
                            <ToolTipComponent
                                tooltip={`Time Calculated from ${moment(CommonService.setMomentHourMinute(value[0], 4)).format('D MMM h:mm A')} until ${moment(CommonService.setMomentHourMinute(value[1], 3, 59)).format('D MMM h:mm A')}`}>
                                <ImageConfig.MapLiveInfoIcon/>
                            </ToolTipComponent>
                        </>
                    )
                }
            </div>
        </div>
    );

};

export default DateRangePickerComponent;

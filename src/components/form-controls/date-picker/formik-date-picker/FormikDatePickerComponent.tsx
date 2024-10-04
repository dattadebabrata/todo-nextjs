import './FormikDatePickerComponent.scss'
import React, {useCallback} from 'react';
import _ from "lodash";
import {FieldProps} from "formik";
import DatePickerComponent from "../DatePickerComponent";
import {IDatePickerProps} from "../../../../models/form-controls.model";

interface FormikDatePickerComponentProps extends IDatePickerProps {
    formikField: FieldProps;
}

const FormikDatePickerComponent = (props: FormikDatePickerComponentProps) => {

        const {
            formikField,
            onChange,
            ...otherProps
        } = props;

        const {field, form} = formikField;
        const {name, value} = field;
        const {setFieldTouched, touched, errors, setFieldValue} = form;
        const hasError = _.get(touched, name) && !!(_.get(errors, name));
        otherProps.id = otherProps.id || name;

        const dateChangeHandler = useCallback((value: Date | null) => {
            setFieldValue(name, value);
            setFieldTouched(name);
            if (onChange) {
                onChange(value)
            }
        }, [setFieldValue, setFieldTouched, name, onChange]);

        const handleCalenderClose = useCallback(() => {
            setFieldTouched(name);
        }, [setFieldTouched, name]);

        return (
            <DatePickerComponent
                name={name}
                value={value}
                onChange={dateChangeHandler}
                onCalenderClose={handleCalenderClose}
                hasError={hasError}
                errorMessage={hasError && _.get(errors, name)}
                {...otherProps}
            />
        )
    }

;

export default FormikDatePickerComponent;

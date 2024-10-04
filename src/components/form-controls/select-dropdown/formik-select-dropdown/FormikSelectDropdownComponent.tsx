import "./FormikSelectDropdownComponent.scss";
import React, {useCallback, useEffect, useState} from "react";
import {FieldProps} from "formik";
import SelectDropdownComponent from "../SelectDropdownComponent";
import _ from "lodash";
import {ISelectDropdownProps} from "../Types.SelectComponent";

export interface FormikSelectDropdownComponentProps extends ISelectDropdownProps {
    formikField: FieldProps;
}

const FormikSelectDropdownComponent = (props: FormikSelectDropdownComponentProps) => {

    const {
        formikField,
        onChange,
        ...otherProps
    } = props;

    const {field, form} = formikField;
    const {name, value} = field;
    const {setFieldTouched, touched, errors, setFieldValue} = form;
    const hasError = _.get(touched, name) && !!(_.get(errors, name));
    const [formControlValue, setFormControlValue] = useState(value);

    const onValueChange = useCallback((value: any) => {
        let tempValue = value;
        setFormControlValue(tempValue);
        setFieldValue(name, tempValue);
        setFieldTouched(name);
        if (onChange) {
            onChange(tempValue)
        }
    }, [name, onChange, setFieldTouched, setFieldValue, setFormControlValue]);

    const onBlur = useCallback((value: any) => {
        setFieldTouched(name);
    }, [name, setFieldTouched]);

    useEffect(() => {
        setFormControlValue(value || '');
    }, [value]);

    return (
        <SelectDropdownComponent
            id={name}
            value={formControlValue}
            hasError={hasError}
            errorMessage={hasError && (_.get(errors, name))}
            onSelectUpdate={onBlur}
            onChange={(value) => {
                onValueChange(value);
            }}
            {...otherProps}
        />
    );

};

export default FormikSelectDropdownComponent;

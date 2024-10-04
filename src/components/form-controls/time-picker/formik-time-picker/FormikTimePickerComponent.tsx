import "./FormikTimePickerComponent.scss";
import {FieldProps} from "formik";
import {ITimePickerProps} from "../../../../models/form-controls.model";
import _ from "lodash";
import TimePickerComponent from "../TimePickerComponent";
import {useCallback} from "react";

interface FormikTimePickerComponentProps extends ITimePickerProps{
    formikField: FieldProps;

}

const FormikTimePickerComponent = (props: FormikTimePickerComponentProps) => {
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

    const timeChangeHandler = useCallback((value: Date | null) => {
        setFieldValue(name, value);
        setFieldTouched(name);
        if (onChange) {
            onChange(value)
        }
    }, [setFieldValue, setFieldTouched, name, onChange]);

    return (
        <TimePickerComponent
            name={name}
            value={value}
            hasError={hasError}
            onChange={timeChangeHandler}
            errorMessage={hasError && _.get(errors, name)}
            {...otherProps}
        />
    );

};

export default FormikTimePickerComponent;

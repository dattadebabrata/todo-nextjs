import "./FormikPasswordComponent.scss";
import {useCallback} from "react";
import {FieldProps} from "formik";
import _ from "lodash";
import {IInputFieldProps} from "../../input/Types.InputComponent";
import PasswordComponent from "../PasswordComponent";

interface FormikPasswordComponentProps extends Omit<IInputFieldProps, 'type'> {
    formikField: FieldProps;
    maxlength?: number;
}

const FormikPasswordComponent = (props: FormikPasswordComponentProps) => {

    const {
        maxlength,
        formikField,
        onChange,
        ...otherProps
    } = props;
    const {field, form} = formikField;
    const {name, value} = field;
    const {setFieldTouched, touched, handleBlur, errors, setFieldValue} = form;
    const hasError = _.get(touched, name) && !!(_.get(errors, name));

    const textChangeHandler = useCallback((text: string) => {
        setFieldValue(name, text);
        setFieldTouched(name);
        if (onChange) {
            onChange(text);
        }
    }, [setFieldValue, setFieldTouched, name, onChange]);

    const onInputBlur = useCallback(() => {
        handleBlur(name);
        setFieldTouched(name);
    }, [name, handleBlur, setFieldTouched]);

    return (
        <PasswordComponent
            maxlength={maxlength}
            name={name}
            value={value}
            inputProps={{
                onBlur: onInputBlur,
            }}
            onChange={textChangeHandler}
            hasError={hasError}
            errorMessage={hasError && (_.get(errors, name))}
            {...otherProps}
        />
    );

};

export default FormikPasswordComponent;

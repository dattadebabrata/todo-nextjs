import "./PasswordComponent.scss";
import {useCallback, useEffect, useState} from "react";
import InputComponent from "../input/InputComponent";
import {IInputFieldProps} from "../input/Types.InputComponent";
import { GrFormView } from "react-icons/gr";
import { GrFormViewHide } from "react-icons/gr";

interface PasswordComponentProps extends Omit<IInputFieldProps, "type"> {
    name?: string;
    value?: string;
    errorMessage?: string;
    hasError?: boolean;
    maxlength?: number;
}

const PasswordComponent = (props: PasswordComponentProps) => {

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const {onChange, value, ...otherProps} = props;
    const [passwordValue, setPasswordValue] = useState<string | undefined>(value);
    const placeholder = props.placeholder || 'Password';

    useEffect(() => {
        setPasswordValue(value);
    }, [value]);

    const handlePasswordChange = useCallback((value: unknown) => {
        if (onChange) {
            onChange(value);
        }
    }, [onChange]);

    const handlePasswordVisibility = useCallback(() => {
        setPasswordVisible(!passwordVisible);
    }, [passwordVisible]);

    return (
        <InputComponent
            type={passwordVisible ? "text" : "password"}
            value={passwordValue}
            placeholder={placeholder}
            onChange={handlePasswordChange}
            suffix={<div onClick={handlePasswordVisibility}>
                {passwordVisible ? <GrFormView/> : <GrFormViewHide/>}
            </div>}
            {...otherProps}
        />
    );

};

export default PasswordComponent;

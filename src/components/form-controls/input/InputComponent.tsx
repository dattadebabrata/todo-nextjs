import "./InputComponent.scss";
import {useCallback} from "react";
import ErrorTextComponent from "../../error-text/ErrorTextComponent";
import LabelComponent from "../../label/LabelComponent";
import {IInputFieldProps} from "./Types.InputComponent";
import CommonService from "@/service/common.service";

export interface InputComponentProps extends IInputFieldProps {
    name?: string;
    value?: string;
    errorMessage?: unknown;
    hasError?: boolean;
    maxlength?: number;
}

const InputComponent = (props: InputComponentProps) => {

    const {
        label,
        titleCase,
        errorMessage,
        hasError,
        className,
        inputProps,
        disabled,
        required,
        value,
        validationPattern,
        fullWidth,
        size,
        maxlength,
        onChange,
        onKeyEnter,
        suffix,
        prefix,
        ...otherProps
    } = props;

    const inputSize = props.size || "lg";
    const type = props.type || "text";
    const placeholder = props.placeholder || label;
    const autocomplete = props.autocomplete !== undefined ? props.autocomplete : true;

    const handleOnChange = useCallback((event: unknown) => {
        let nextValue = event.target.value;
        if (titleCase) {
            nextValue = CommonService.capitalizeSentence(nextValue);
        }
        if (onChange) {
            if (validationPattern) {
                const reg = RegExp(validationPattern);
                if (nextValue === "" || reg.test(nextValue)) {
                    onChange(nextValue);
                } else {
                    // console.log(nextValue, reg, reg.test(nextValue), "regex failed");
                }
            } else {
                onChange(nextValue);
            }
        }
    }, [titleCase, validationPattern, onChange]);

    const handleKeyDown = useCallback((event: unknown) => {
        if (event.key === "Enter") {
            if (onKeyEnter) {
                onKeyEnter();
            }
        }
    }, [onKeyEnter]);

    return (
        <div
            className={`input-component form-control ${fullWidth ? "fullWidth" : ''} ${disabled ? 'disabled' : ''} ${size}`}>
            {label && <LabelComponent title={label} required={required}/>}
            <div className="input-wrapper">
                <input type={type}
                       autoComplete={autocomplete ? 'on' : 'new-password'} // hack to disable chrome autofill
                       maxLength={maxlength}
                       placeholder={placeholder}
                       required={required}
                       value={value || ""}
                       disabled={disabled}
                       onKeyDown={handleKeyDown}
                       className={'input-field ' + (hasError ? "has-error" : '') + ' ' + className + ' ' + inputSize + ' ' + (suffix ? "has-suffix" : '') + ' ' + (prefix ? "has-prefix" : '')}
                       onChange={(event) => {
                           handleOnChange(event);
                       }}
                       {...inputProps}
                       {...otherProps}
                />
                {suffix && (
                    <div className="suffix-icon">
                        {suffix}
                    </div>
                )}
                {prefix && (
                    <div className="prefix-icon">
                        {prefix}
                    </div>
                )}
                {(errorMessage && hasError) && (
                    <ErrorTextComponent error={errorMessage as string}/>
                )}
            </div>
        </div>
    );
};

export default InputComponent;

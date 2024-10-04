import "./CheckBoxComponent.scss";
import {InputHTMLAttributes, useCallback, useEffect, useState} from "react";
import LabelComponent from "../../label/LabelComponent";
import ErrorTextComponent from "../../error-text/ErrorTextComponent";

interface CheckBoxComponentProps {
    checked?: boolean;
    value?: unknown;
    color?: string;
    className?: string;
    disabled?: boolean;
    errorMessage?: unknown;
    hasError?: boolean;
    id?: string;
    label?: string;
    name?: string;
    onChange?: (isChecked: boolean) => void;
    required?: boolean;
    readOnly? : boolean;
    color?:string;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
}

const CheckBoxComponent = (props: CheckBoxComponentProps) => {

    const {
        label,
        checked,
        className,
        disabled,
        id,
        hasError,
        errorMessage,
        onChange,
        required,
        value,
        readOnly,
        inputProps,
        color
    } = props;
    const [tmpChecked, setTmpChecked] = useState(checked);

    useEffect(() => {
        setTmpChecked(checked || false);
    }, [checked]);

    const handleCheckBoxOnChange = useCallback((event: unknown) => {
        if (readOnly) {
            return;
        }
        const isChecked = event.target.checked;
        console.log(isChecked);
        setTmpChecked(isChecked);
        if (onChange) {
            onChange(isChecked);
        }
    }, [readOnly, onChange]);

    return (
        <div
            className={`checkbox-component ${className} ${tmpChecked ? 'checked ' : ''} ${disabled ? 'disabled' : ''} ${hasError ? 'has-error' : ''}`}>
            <label id={id} className={"checkbox-container " + (disabled ? 'disable' : '')}>
                {label && <LabelComponent required={required} title={label}/>}
                <input
                    disabled={disabled}
                    checked={tmpChecked}
                    onChange={handleCheckBoxOnChange}
                    value={value as  string | readonly string[] | number | undefined}
                    className={`checkbox-field`}
                    type="checkbox"
                    readOnly={readOnly}
                    {...inputProps}
                />
                <span {...inputProps} className= {`checkbox-checkmark + ${color ? color : ''}`}/>
            </label>
            {(errorMessage && hasError) && (
                <ErrorTextComponent error={errorMessage as string}/>
            )}
        </div>
    );

};

export default CheckBoxComponent;

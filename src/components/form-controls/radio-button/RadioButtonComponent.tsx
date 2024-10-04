import "./RadioButtonComponent.scss";
import {useCallback, useEffect, useState} from "react";
import {IRadioButtonGroupProps, IRadioButtonProps} from "../../../models/form-controls.model";
import LabelComponent from "../../label/LabelComponent";
import ErrorTextComponent from "../../error-text/ErrorTextComponent";

interface RadioButtonGroupComponentProps extends IRadioButtonGroupProps {
    value?: any;
    errorMessage?: any;
    hasError?: boolean;
}

const RadioButtonGroupComponent = (props: RadioButtonGroupComponentProps) => {

    let {
        options,
        name,
        label,
        className,
        hasError,
        errorMessage,
        isValueBoolean,
        onChange,
        disabled,
        id,
        required
    } = props;
    const [value, setValue] = useState(props.value);

    const defaultDisplayWith = useCallback((item: any) => item?.title || '', []);
    const defaultValueExtractor = useCallback((item: any) => item?.code, []);
    const defaultKeyExtractor = useCallback((item: any) => item?._id, []);
    const displayWith = props.displayWith || defaultDisplayWith;
    const valueExtractor = props.valueExtractor || defaultValueExtractor;
    const keyExtractor = props.keyExtractor || defaultKeyExtractor;
    const direction = props.direction || "row";

    useEffect(() => {
        setValue(props.value);
    }, [props.value]);

    return (<div className={`radio-group-component ${className} ${direction}`}>
            {label && <LabelComponent title={label} required={required}/>}
            <div className={`radio-option-list`}>
                {
                    (options && options?.length > 0) && options.map((option: any) => {
                        return <RadioButtonComponent
                            key={keyExtractor(option)}
                            value={valueExtractor(option)}
                            checked={valueExtractor(option) === value}
                            required={required}
                            hasError={hasError}
                            id={id}
                            name={name}
                            disabled={disabled}
                            label={displayWith(option)}
                            onChange={(value: any) => {
                                let selectedValue: any = value;
                                if (isValueBoolean) {
                                    selectedValue = selectedValue === true;
                                }
                                if (onChange) {
                                    onChange(selectedValue);
                                }
                            }}
                        />
                    })
                }
            </div>
            {(errorMessage && hasError) && (
                <ErrorTextComponent error={errorMessage}/>
            )}
        </div>
    )
}
export default RadioButtonGroupComponent;

interface RadioButtonComponentProps extends IRadioButtonProps {

}

export const RadioButtonComponent = (props: RadioButtonComponentProps) => {

    const {label, checked, name, disabled, onChange, value, readOnly} = props;

    const handleRadioOnChange = useCallback((e: any) => {
        if (onChange) {
            onChange(value);
        }
    }, [onChange, value]);

    return (
        <div className={`radio-component ${checked ? 'checked' : ''}`}>
            <label className={`radio-container ${(disabled ? 'disable' : '')}`}>
                {label && <LabelComponent title={label || ''}/>}
                <input
                    value={value}
                    readOnly={readOnly}
                    onChange={
                        (event) => {
                            if (handleRadioOnChange) {
                                handleRadioOnChange(value);
                            }
                        }
                    }
                    disabled={disabled}
                    name={name}
                    checked={checked}
                    className={'radio-field'}
                    type="radio"
                />
                <span className="radio-checkmark"/>
            </label>
        </div>
    )

}

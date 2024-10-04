import "./TextAreaComponent.scss";
import {ITextAreaProps} from "../../../models/form-controls.model";
import {useCallback} from "react";
import ErrorTextComponent from "../../error-text/ErrorTextComponent";
import LabelComponent from "../../label/LabelComponent";

interface TextAreaComponentProps extends ITextAreaProps {
    onEnterPress:()=>void;
}

const TextAreaComponent = (props: TextAreaComponentProps) => {

    const {
        label,
        errorMessage,
        readOnly,
        hasError,
        disabled,
        required,
        fullWidth,
        className,
        onChange,
        onEnterPress,
        textAreaProps,
        autoFocus,
        ...otherProps
    } = props;
    const placeholder = props.placeholder || label;
    const rows = props.rows || 3;

    const handleOnChange = useCallback((event: any) => {
        const value = event.target.value;
        if (onChange) {
            onChange(value);
        }
    }, [onChange]);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onEnterPress()
            // You can handle your logic here, like submitting a form or executing some action
        }
    };

    return (
        <div className={`textarea-component  ${fullWidth ? "fullWidth" : ''} ${disabled ? 'disabled' : ''}`}>
            {label && <LabelComponent title={label} required={required}/>}
            <textarea
                style={{resize: "none"}}
                placeholder={placeholder}
                readOnly={readOnly}
                disabled={disabled}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                autoFocus={autoFocus}
                rows={rows}
                className={'textarea-field ' + (hasError ? "has-error" : '') + ' ' + className}
                {...textAreaProps}
                {...otherProps}
            />
            {(errorMessage && hasError) && (
                <ErrorTextComponent error={errorMessage}/>
            )}
        </div>
    );

};

export default TextAreaComponent;

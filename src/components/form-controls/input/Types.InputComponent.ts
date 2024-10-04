import {InputHTMLAttributes} from "react";

export interface IInputFieldProps {
    autocomplete?: boolean;
    validationPattern?: RegExp;
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    id?: string;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    label?: string;
    onChange?: (value: any) => void;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    titleCase?: boolean;
    size?: "lg" | "md";
    type?: 'email' | 'number' | 'password' | 'text';
    suffix?: any;
    prefix?: any;
    onKeyEnter?: () => void;
}

import "./ButtonComponent.scss";
import {CSSProperties, PropsWithChildren, useCallback} from "react";

interface ButtonComponentProps {
    type?: 'button' | 'submit' | 'reset';
    variant?: 'contained' | 'outlined' | 'link';
    color?: 'primary' | 'secondary' | 'error';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    prefixIcon?: any;
    suffixIcon?: any;
    loading?: boolean;
    id?: string;
    onClick?: (event: any) => void;
    style?: CSSProperties;
}

const ButtonComponent = (props: PropsWithChildren<ButtonComponentProps>) => {

    const {
        className,
        fullWidth,
        disabled,
        loading,
        prefixIcon,
        suffixIcon,
        onClick,
        children,
        ...otherProps
    } = props;
    const type = props.type || "button";
    const color = props.color || "primary";
    const variant = props.variant || "contained";
    const size = props.size || "lg";

    const handleOnClick = useCallback((event: any) => {
        if (onClick) {
            onClick(event);
        }
    }, [onClick]);

    return <button type={type}
                   className={`button-component component ${variant} ${disabled ? 'disabled' : ''} ${loading ? 'loading' : ''} ${fullWidth ? 'fullWidth' : ''} ${size} ${className} ${color}`}
                   disabled={disabled}
                   onClick={handleOnClick}
                   {...otherProps}>
        <div className={"button-contents"}>
            {prefixIcon && <span className={"button-prefix"}>{prefixIcon}&nbsp;</span>}
            <span className={"button-text"}>{children}</span>
            {suffixIcon && <span className={"button-suffix"}>{suffixIcon}</span>}
        </div>
    </button>

};

export default ButtonComponent;

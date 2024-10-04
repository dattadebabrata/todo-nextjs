import './HelperTextComponent.scss';
import React from 'react';

export interface HelperTextComponentProps {
    type?: "success" | "warning" | "error" | "info" | "default";
    message?: string
}

const HelperTextComponent = (props: HelperTextComponentProps) => {

    const {message} = props;
    let {type} = props;
    if (!type) type = "default";

    return (
        <div className={`helper-text-component ${type}`}>
            {message}
        </div>
    );

};

export default HelperTextComponent;

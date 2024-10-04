import React from 'react';
import './ErrorTextComponent.scss';
import HelperTextComponent from "../helper-text/HelperTextComponent";

export interface ErrorTextComponentProps {
    error: string
}

const ErrorTextComponent = (props: ErrorTextComponentProps) => {

    const {error} = props;

    return (
        <div className={'error-component'}>
            <HelperTextComponent type={"error"} message={error}/>
        </div>
    );

};

export default ErrorTextComponent;

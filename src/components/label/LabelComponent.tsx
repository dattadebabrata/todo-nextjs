import React, {CSSProperties} from 'react';
import './LabelComponent.scss';

export interface LabelComponentProps {
    title: string;
    required?: boolean;
    hasError?: boolean;
    styles?: CSSProperties;
}

const LabelComponent = (props: LabelComponentProps) => {

    const {title, required, hasError, styles} = props;

    return (
        <div className={'label-component ' + (hasError ? 'has-error' : '')} style={styles}>
            {title}{required && <span className={'required'}>*</span>}
            {/*{title}{!required && <span className={'optional'}>(Optional)</span>}*/}
        </div>
    );

};

export default LabelComponent;

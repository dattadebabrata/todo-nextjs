import "./PopOversComponent.scss";
import * as React from "react";
import {useCallback} from "react";
import Popover from '@mui/material/Popover';

interface PopOversComponentProps {
    id?: string;
    isOpen: boolean;
    className?: string;
    closeOnEsc?: boolean;
    closeOnBackDropClick?: boolean;
    onClose?: () => void;
    anchorEl?: HTMLElement | null;
    transformOrigin?: { vertical: 'top' | 'center' | 'bottom', horizontal: 'left' | 'center' | 'right' };
    anchorOrigin?: { vertical: 'top' | 'center' | 'bottom', horizontal: 'left' | 'center' | 'right' };
}

const PopOversComponent = (props: React.PropsWithChildren<PopOversComponentProps>) => {
    const {id, isOpen, children, onClose, className, anchorEl, transformOrigin, anchorOrigin} = props;


    // const anchorOrigin = props.anchorOrigin || {vertical: 'top', horizontal: 'right'};
    // const transformOrigin = props.anchorOrigin || {vertical: 'top', horizontal: 'right'};

    const handleOnClose = useCallback(() => {
        if (onClose) {
            onClose();
            console.log(`closing`)
        }
    }, [onClose]);

    return (
            <Popover
                id={id}
                open={isOpen}
                className={className}
                anchorEl={anchorEl}
                onClose={handleOnClose}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
            >
                {children}
            </Popover>
    );
};

export default PopOversComponent;

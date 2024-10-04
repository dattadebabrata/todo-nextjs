import "./ToolTipComponent.scss";
import React, {ReactFragment, useCallback} from "react";
import {Tooltip} from "@mui/material";

interface ToolTipComponentProps {
    tooltip: string | ReactFragment;
    showArrow?: boolean;
    position?: 'bottom-end' | 'bottom-start' | 'bottom' | 'left-end' | 'left-start' | 'left' | 'right-end' | 'right-start' | 'right' | 'top-end' | 'top-start' | 'top';
    onOpen?: () => void;
    onClose?: () => void;
    showAfter?: number;
    hideAfter?: number;
}

const ToolTipBgColor = "#07213C";
const ToolTipTextColor = "#ffffff";

const ToolTipComponent = (props: React.PropsWithChildren<ToolTipComponentProps>) => {

    const {tooltip, showAfter, hideAfter, onOpen, onClose, children} = props;

    const position = props.position || "top";
    const showArrow = props.showArrow !== undefined ? props.showArrow : true;

    const handleOpen = useCallback((e: any) => {
        if (onOpen) {
            onOpen();
        }
    }, [onOpen]);

    const handleClose = useCallback((e: any) => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);

    return (
        <Tooltip title={
            <React.Fragment>
                {tooltip}
            </React.Fragment>
        }
                 arrow={showArrow}
                 placement={position}
                 onOpen={handleOpen}
                 onClose={handleClose}
                 enterDelay={showAfter}
                 leaveDelay={hideAfter}
                 componentsProps={{
                     tooltip: {
                         sx: {
                             fontSize: '12px',
                             fontFamily: 'Roboto',
                             padding: '10px',
                             fontWeight: 400,
                             bgcolor: ToolTipBgColor,
                             color: ToolTipTextColor,
                             whiteSpace: 'pre-line',
                             '& .MuiTooltip-arrow': {
                                 color: ToolTipBgColor,
                             },
                         },
                     },
                 }}
        >
            {children}
        </Tooltip>
    );

};

export default ToolTipComponent;

// ****************************** USAGE ****************************** //

// <ToolTipComponent tooltip={serviceCategory?.name || "-"}
//                   position={"top"}
//                   onOpen={()=>{
//                       console.log("tooltip opened");
//                   }}
//                   onClose={()=>{
//                       console.log("tooltip CLOSED");
//                   }}
// >
//     <div className="service-category-name" id={`sc_${serviceCategory?.name}`}>
//         {serviceCategory?.name || "-"}
//     </div>
// </ToolTipComponent>

// ****************************** USAGE ****************************** //

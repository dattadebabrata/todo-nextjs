import "./FormDebuggerComponent.scss";
import DataLabelValueComponent from "../data-label-value/DataLabelValueComponent";
import HorizontalLineComponent from "../horizontal-line/HorizontalLineComponent";
import React, {useCallback, useState} from "react";
import {FormikProps} from "formik";
import CardComponent from "../card/CardComponent";
import IconButtonComponent from "../icon-button/IconButtonComponent";
import Draggable from 'react-draggable';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {ENV} from "../../../constants";

interface FormDebuggerComponentProps {
    form?: FormikProps<any>;
    values?: any;
    errors?: any;
    isValid?: boolean;
    showDebugger?: boolean;
}

const FormDebuggerComponent = (props: FormDebuggerComponentProps) => {

    const {form, isValid, values, errors} = props;
    const showDebugger = props.showDebugger !== undefined ? props.showDebugger : true;
    const [isDebuggerMinimised, setIsDebuggerMinimised] = useState<boolean>(false);

    const handleToggleDebugger = useCallback(() => {
        setIsDebuggerMinimised(!isDebuggerMinimised);
    }, [isDebuggerMinimised]);

    return (
        <>
            {
                (  ENV.ENV_MODE === "dev" && showDebugger )&& <Draggable handle={".card-header"}>
                    <div className={`form-debugger`}>
                        <CardComponent title={"Form Debugger"}
                                       actions={<> <IconButtonComponent onClick={handleToggleDebugger}>
                                           {!isDebuggerMinimised ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                                       </IconButtonComponent> </>}>
                            {
                                !isDebuggerMinimised && <>
                                    <DataLabelValueComponent label={"Values"}>
                                        {
                                            form && <pre>
                                            {JSON.stringify(form.values, null, 2)}
                                        </pre>
                                        }
                                        {
                                            values !== undefined && <pre>
                                                            {JSON.stringify(values, null, 2)}
                                                        </pre>
                                        }
                                    </DataLabelValueComponent>
                                    <HorizontalLineComponent/>
                                    <DataLabelValueComponent label={"Errors"}>
                                        {
                                            form && <pre>
                                            {JSON.stringify(form.errors, null, 2)}
                                        </pre>
                                        }
                                        {
                                            errors !== undefined && <pre>
                                                            {JSON.stringify(errors, null, 2)}
                                                        </pre>
                                        }
                                    </DataLabelValueComponent>
                                    <HorizontalLineComponent/>
                                    <DataLabelValueComponent label={"Form Valid"}>
                                        {
                                            form && <>
                                                {form.isValid ? "Valid" : "Invalid"}
                                            </>
                                        }
                                        {
                                            isValid !== undefined && <>
                                                {isValid ? "Valid" : "Invalid"}
                                            </>
                                        }
                                    </DataLabelValueComponent>
                                </>
                            }
                        </CardComponent>
                    </div>
                </Draggable>
            }
        </>
    );

};

export default FormDebuggerComponent;

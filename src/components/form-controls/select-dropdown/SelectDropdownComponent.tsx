import "./SelectDropdownComponent.scss";
import React, {useCallback, useEffect, useRef, useState} from "react";
import Select, {InputActionMeta} from 'react-select';
import {IAPIResponseType} from "../../../models/api.model";
import _ from "lodash";
import {AXIOS_REQUEST_CANCELLED} from "../../../services/api.service";
import {CommonService} from "../../../services";
import LabelComponent from "../../label/LabelComponent";
import ErrorTextComponent from "../../error-text/ErrorTextComponent";
import HelperTextComponent from "../../helper-text/HelperTextComponent";
import {ISelectDropdownProps} from "./Types.SelectComponent";
import {ColorConfig} from "../../../../constants";

export interface SelectDropdownComponentProps extends ISelectDropdownProps {
    value?: any;
    hasError?: boolean;
    errorMessage?: any;
    defaultValue?:string
}

const SelectDropdownComponent = (props: SelectDropdownComponentProps) => {

    const {
        className,
        label,
        value,
        hasError,
        required,
        errorMessage,
        onChange,
        onSelectUpdate,
        disabled,
        id,
        options,
        url,
        extraPayload,
        minSearchKeyLength,
    } = props;

    let {
        placeholder,
        noDataMessage,
        searchable,
        searchMode,
        multiple,
        method,
        isClearable,
        fullWidth,
        dataListKey,
        hideSelectedOptions,
        isDataLoading,
        isDataLoaded,
        isDataLoadingFailed,
        defaultData,
        displayWith,
        valueExtractor
    } = props;

    const size = props.size ? props.size : "lg";
    if (!placeholder) placeholder = label ? 'Select ' + label : "Select";
    if (!method) method = "get";
    if (!searchMode) searchMode = "clientSide";
    if (!dataListKey) dataListKey = "data.docs";
    if (isClearable === undefined) isClearable = true;
    if (searchable === undefined) searchable = false;
    if (multiple === undefined) multiple = false;
    if (!displayWith) displayWith = (option: any) => option?.title;
    if (!valueExtractor) valueExtractor = (option: any) => option?.code;
    if (!noDataMessage) noDataMessage = <div>No Data</div>;
    if (!defaultData) defaultData = [];

    const [isDropDownDataLoading, setIsDropDownDataLoading] = useState(isDataLoading);
    const [isDropDownDataLoaded, setIsDropDownDataLoaded] = useState(isDataLoaded);
    const [isDropDownDataLoadingFailed, setIsDropDownDataLoadingFailed] = useState(isDataLoadingFailed);
    const [dropDownData, setDropDownData] = useState<any>([]);
    const [selectedValue, setSelectedValue] = useState<any>(null);
    const APICallSubscription = useRef<any>(null);
    const [renderList, setRenderList] = useState<any>([]);

    const onValueChange = useCallback((value: any) => {
        if (onChange) {
            onChange(value)
        }
    }, [onChange]);

    const customStyles = {
        menuPortal: (base: any) => ({...base, zIndex: 9999}),
        option: (base: any) => ({
            ...base,
            cursor: "pointer",
            ":hover": {
                backgroundColor: "rgb(200, 200, 200)",
            },
        })
    }

    const onBlur = useCallback(() => {
        if (onSelectUpdate) {
            onSelectUpdate();
        }
    }, [onSelectUpdate]);

    const transformRenderList = useCallback((list: any) => {
        try{

            if (list?.length > 0) {
                const options = list && list?.map((item: any) => {
                    return {
                        label: displayWith && displayWith(item) !== undefined ? displayWith(item) : item.label,
                        value: valueExtractor && valueExtractor(item) !== undefined ? valueExtractor(item) : item.code,
                        ...item
                    }
                });
                setRenderList(options);
            } else {
                setRenderList([]);
            }
        }catch(error){
            console.error("Error in transformRenderList",error);
        }
    }, [displayWith, valueExtractor]);

    useEffect(() => {
        try{

            if (renderList) {
                if (multiple) {
                    setSelectedValue(renderList?.filter((item: any) => value?.includes(item?.value)));
                } else {
                    setSelectedValue(renderList?.find((item: any) => item?.value === value));
                }
            } else {
                setSelectedValue(null);
            }
        }catch(error){
            console.error("Error in SelectDropdownComponent",error);
        }
    }, [value, multiple, renderList]);

    useEffect(() => {
        setIsDropDownDataLoading(isDataLoading);
    }, [isDataLoading]);

    useEffect(() => {
        setIsDropDownDataLoaded(isDataLoaded);
    }, [isDataLoaded]);

    useEffect(() => {
        setIsDropDownDataLoadingFailed(isDataLoadingFailed);
    }, [isDataLoadingFailed]);

    useEffect(() => {
        // setNoDataMsg(noDataMessage);
    }, [noDataMessage]);

    useEffect(() => { //TODO: make it more fool proof
        setDropDownData(options);
        transformRenderList(options);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    useEffect(() => {
        if (searchMode === "serverSide") {
            if (dropDownData?.length === 0) {
            }
        }
    }, [searchMode, dropDownData]);

    const getDataList = useCallback((searchValue: string) => {
        if (!url) {
            console.warn("URL not provided to fetch dropdown list");
            return;
        }
        if (!method) {
            console.warn("METHOD not provided to fetch dropdown list");
            return;
        }
        const cleanedSearchValue = searchValue.trimStart();
        if (minSearchKeyLength && cleanedSearchValue.length < minSearchKeyLength) {
            return;
        }
        const finalPayload = {...extraPayload, search: searchValue};
        const cancelTokenSource = CommonService.getCancelToken();
        let request;
        if (method === "get") {
            request = CommonService._api.get
        } else {
            request = CommonService._api.post
        }
        if (APICallSubscription && APICallSubscription.current) {
            APICallSubscription.current.cancel();
        }
        APICallSubscription.current = cancelTokenSource;
        setIsDropDownDataLoading(true);
        setIsDropDownDataLoaded(false);
        setIsDropDownDataLoadingFailed(false);
        let dropDownData: any[] = [...defaultData || []];
        request(url, finalPayload, {}, {cancelToken: cancelTokenSource.token}).then((response: IAPIResponseType<any>) => {
            if (dataListKey && _.get(response, dataListKey)) {
                dropDownData.unshift(..._.get(response, dataListKey));
            }
            setDropDownData(dropDownData);
            setIsDropDownDataLoading(false);
            transformRenderList(dropDownData);
            setIsDropDownDataLoaded(true);
            setIsDropDownDataLoadingFailed(false);
            // if (isMenuFocused) {
            //     setIsMenuOpen(true);
            // }
        }).catch((error: any) => {
            if (error.reason !== AXIOS_REQUEST_CANCELLED) { // if previous request got cancelled do not close loading state
                setDropDownData(dropDownData);
                setIsDropDownDataLoading(false);
                setIsDropDownDataLoaded(false);
                setIsDropDownDataLoadingFailed(true);
                // if (isMenuFocused) {
                //     setIsMenuOpen(true);
                // }
            }
        });
    }, [defaultData, minSearchKeyLength, transformRenderList, url, dataListKey, method, extraPayload]);

    const handleInputChange = useCallback((newValue: string, actionMeta: InputActionMeta) => {
        const {action} = actionMeta;
        switch (action) {
            case "input-change": {
                if (searchMode === "serverSide") {
                    getDataList(newValue);
                }
                break;
            }
            default:
                void 0;
        }
    }, [searchMode, getDataList]);

    return (
        <div
            className={`select-dropdown-component form-control ${searchable ? "search" : ''} ${fullWidth ? "fullWidth" : ''} ${disabled ? 'disabled' : ''} ${hasError ? "has-error" : ''}  ${size}`}>
            {label && <LabelComponent title={label || ''} required={required}/>}
            <Select
                id={id}
                className={`select-dropdown ${className}`}
                classNamePrefix={'select-dropdown'}
                closeMenuOnSelect={!multiple}
                isMulti={multiple}
                hideSelectedOptions={hideSelectedOptions}
                options={renderList}
                placeholder={placeholder}
                isDisabled={disabled}
                isLoading={isDropDownDataLoading}
                isClearable={isClearable}
                value={selectedValue || null}
                // menuIsOpen={true}
                menuPosition={"absolute"}
                menuPlacement={"auto"}
                isSearchable={searchable}
                onBlur={onBlur}
                components={{
                    // Option: CustomOption,
                    // MultiValueLabel: CustomMultiOption
                }}
                styles={customStyles}
                menuPortalTarget={document.body}
                menuShouldScrollIntoView={false}
                filterOption={(option: any, inputValue: string) => {
                    // console.log(option, inputValue);
                    const {label, value} = option;
                    if (searchMode === "serverSide") {
                        return true;
                    } else {
                        if (searchable && inputValue.length > 0) {
                            if (dropDownData) {
                                const otherKey = dropDownData.filter(
                                    (opt: any) => opt?.label === label && opt?.value && typeof opt.value === 'string' && opt.value.includes(inputValue)
                                );
                                return (typeof value === 'string' && value.toLowerCase().includes(inputValue.toLowerCase())) || (otherKey && otherKey.length > 0);
                            } else {
                                return true;
                            }
                        } else {
                            return true;
                        }
                    }
                }}
                noOptionsMessage={() => {
                    return noDataMessage
                }}
                onInputChange={handleInputChange}
                onChange={(value) => {
                    return (value !== undefined) ? (multiple ? onValueChange(value?.map((item: any) => item.value)) : onValueChange(value?.value)) : onValueChange(null)
                }}
                // menuPortalTarget={document.body}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary25: "#dddddd",
                        primary: ColorConfig.primary,
                        zIndex: 9999
                    },
                })}
            />
            {(errorMessage && hasError) && (
                <ErrorTextComponent error={errorMessage}/>
            )}
            {(isDropDownDataLoading && !isDropDownDataLoaded) && (
                <HelperTextComponent message={"Data loading"}/>
            )}
            {(isDropDownDataLoadingFailed) && (
                <HelperTextComponent type={"error"} message={"Error loading the data"}/>
            )}
        </div>
    );

};

export default SelectDropdownComponent;

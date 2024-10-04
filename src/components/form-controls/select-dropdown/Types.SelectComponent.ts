import {ReactNode} from "react";


export interface ISelectDropdownProps {
    label?: string;
    value?: any;
    placeholder?: string;
    fullWidth?: boolean;
    multiple?: boolean;
    id?: string;
    size?: "lg" | "md";
    isDataLoading?: boolean;
    isDataLoaded?: boolean;
    isDataLoadingFailed?: boolean;
    options?: any[];
    disabled?: boolean;
    onChange?: (value: any) => void;
    hasError?: boolean;
    className?: string;
    required?: boolean;
    errorMessage?: any;
    isClearable?: boolean;
    displayWith?: (option: any) => any;
    valueExtractor?: (option: any) => any;
    searchable?: boolean;
    noDataMessage?: ReactNode;
    hideSelectedOptions?: boolean;
    searchMode?: "clientSide" | "serverSide",
    minSearchKeyLength?: number,
    method?: "get" | "post" | any,
    url?: string,
    extraPayload?: object;
    dataListKey?: string;
    defaultData?: any[],
    searchKey?: string,
    onSelectUpdate?: Function
}

import "./SearchComponent.scss";
import InputComponent from "../form-controls/input/InputComponent";
import {useCallback, useEffect, useState} from "react";
import {ImageConfig} from "../../../constants";

interface SearchComponentProps {
    label?: string;
    className?: any;
    placeholder?: string;
    value?: string;
    size?: "lg" | "md";
    fullWidth?: boolean;
    clean?: boolean;
    lowerCase?: boolean;
    onChange?: (value: any) => void;
}

const SearchComponent = (props: SearchComponentProps) => {

    const {label, fullWidth, className, onChange, size} = props;
    const [searchText, setSearchText] = useState<string | undefined>(props.value);
    const placeholder = props.placeholder || 'Search';
    const lowerCase = props.lowerCase;
    const clean = props.clean;

    useEffect(() => {
        setSearchText(props.value);
    }, [props.value]);

    const handleSearchTextChange = useCallback((value: any) => {
        const searchValue = lowerCase ? value.toLowerCase() : value;
        const cleanedValue = clean ? searchValue.trim() : searchValue;
        if (onChange) {
            onChange(cleanedValue);
        }
        setSearchText(cleanedValue);
    }, [lowerCase, clean, onChange]);

    //
    // const handleSearchClear = useCallback(() => {
    //     handleSearchTextChange("");
    // }, [handleSearchTextChange]);

    return (
        <div className={'search-component'}>
            <InputComponent
                label={label}
                className={className}
                value={searchText}
                onChange={handleSearchTextChange}
                fullWidth={fullWidth}
                placeholder={placeholder}
                size={size}
                prefix={<ImageConfig.SearchIcon className={"icon-search"}/>}
            />
        </div>
    );

};

export default SearchComponent;

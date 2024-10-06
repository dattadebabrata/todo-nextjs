import {OptionsFilter, ComboboxItem, Select, SelectProps, Group} from '@mantine/core';
import "./SelectDropdownComponent.scss";
import {ReactNode, useState} from "react";
import {ImageConfig} from "../../constants";

interface SelectDropdownComponentProps {
    size?: "xs" | "sm" | "md" | "lg" | "xl"
    radius?: "xs" | "sm" | "md" | "lg" | "xl"
    variant?: 'unstyled' | 'filled'
    onChange: (value: Option | string) => void;
    error?: ReactNode;
    value: string | null;
    label?: string;
    description?: string;
    readOnly?: boolean;
    required?: boolean
    disabled?: boolean;
    searchValue?: string
    allowDeselect?: boolean
    clearable?: boolean
    searchable?: boolean
    emptyMessage?: string
    prefixElement?: ReactNode;
    suffixElement?: ReactNode;
    options: Option | GroupedOption;
    placeholder?: string;
    displayWith?: (option: any) => any;
    valueExtractor?: (option: any) => any;
    getEntireValue?: boolean;
    limit?: number;
}

interface Option extends ComboboxItem {
    [key: string]: any;
    label?: string;
    value?: any;
}

interface GroupedOption {
    group: string;
    items: Option[];
}


// const iconProps = {
//     stroke: 1.5,
//     color: 'currentColor',
//     opacity: 0.6,
//     size: 18,
// };
const SelectDropdownComponent = (props: SelectDropdownComponentProps) => {
    const {
        getEntireValue = false,
        options,
        prefixElement,
        suffixElement,
        value,
        label,
        description,
        readOnly,
        placeholder,
        displayWith = (option: any) => option.label,
        valueExtractor = (option: any) => option.value,
        required,
        disabled,
        allowDeselect,
        clearable,
        searchable,
        emptyMessage = 'No results found',
        onChange,
        error,
        size = 'md',
        radius = 'md',
        // limit,
        variant,
    } = props;
    const [searchValue, setSearchValue] = useState(props?.searchValue || '');


    const handleChange = (value: string | null, option: Option) => {
        onChange && value && onChange(getEntireValue ? option : value);
    };
    const optionsFilter: ({options, search}: { options: any; search: any }) => ({
        items: Option[]
    }[]) = ({options, search}) => {
        const splittedSearch = search.toLowerCase().trim().split(' ');

        // Helper function to filter individual items
        const filterItems = (items: Option[]) => {
            return items.filter(option => {
                const words = displayWith(option).toLowerCase().trim().split(' ');
                return splittedSearch.every(searchWord => words.some(word => word.includes(searchWord)));
            });
        };

        // Check if options are grouped (i.e., contain group and items)
        const hasGroups = options.every(option => option.group && option.items);

        // If options are grouped, filter the items within each group
        if (hasGroups) {
            return options.flatMap(group => {
                const filteredItems = filterItems(group.items);
                return filteredItems.length > 0 ? [{...group, items: filteredItems}] : [];
            });
        }

        // If options are not grouped, apply the filter directly
        return filterItems(options as Option[]);
    };


    const renderSelectOption: SelectProps['renderOption'] = ({option, checked}: {
        option: Option,
        checked: boolean | undefined
    }) => {
        return <Group flex="1" gap="xs">
            {option.icon ? <option.icon/> : null}
            {displayWith(option)}
            {checked && <ImageConfig.CheckIcon style={{marginInlineStart: 'auto'}}/>}
        </Group>
    };

    return (
        <Select
            className={'select-dropdown-component'}
            label={label}
            description={description}
            error={error}
            size={size}
            radius={radius}
            variant={variant}
            leftSection={prefixElement}
            rightSection={suffixElement}
            withAsterisk={required}
            disabled={disabled}
            placeholder={placeholder}
            value={getEntireValue ? valueExtractor(value) : value}
            checkIconPosition="right"
            onChange={handleChange}
            data={options}
            allowDeselect={allowDeselect}
            readOnly={readOnly}
            onSearchChange={setSearchValue}
            searchValue={searchValue}
            // dropdownOpened={true}
            nothingFoundMessage={emptyMessage}
            searchable={searchable}
            filter={optionsFilter}
            clearable={clearable}
            renderOption={renderSelectOption}
            comboboxProps={{
                // width: 200,
                position: 'bottom-start',
                transitionProps: {transition: 'scale-y', duration: 200}
            }}
            maxDropdownHeight={200}
        />
    );

};

export default SelectDropdownComponent;

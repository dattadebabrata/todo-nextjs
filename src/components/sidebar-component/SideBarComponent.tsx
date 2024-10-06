import {useCallback, useState} from 'react';
import "./SideBarComponent.scss";
import {IoMdArrowDropleftCircle, IoMdArrowDroprightCircle} from "react-icons/io";
import {NavLink} from "react-router-dom";
import {ImageConfig} from "../../constants";
import {RoutesConfig} from "../../constants";

interface SideBarComponentProps {
    className: string
}

interface MenuItem {
    title: string;
    path: string;
    prefix?: React.ComponentType;
}

const menuListItem: MenuItem[] = [
    {
        title: "Button",
        path: RoutesConfig.BUTTON_COMPONENT_ROUTE,
        // prefix: ImageConfig.ButtonIcon,
    },
    {
        title: "Input",
        path: RoutesConfig.INPUT_COMPONENT_ROUTE,
        // prefix: ImageConfig.InputIcon,
    },
    {
        title: "Password",
        path: RoutesConfig.PASSWORD_COMPONENT_ROUTE,
        // prefix: ImageConfig.PasswordIcon,
    },
    {
        title: "PIN",
        path: RoutesConfig.PIN_COMPONENT_ROUTE,
        // prefix: ImageConfig.PINIcon,
    },
    {
        title: "Checkbox",
        path: RoutesConfig.CHECKBOX_COMPONENT_ROUTE,
        // prefix: ImageConfig.CheckboxIcon,
    },
    {
        title: "Switch",
        path: RoutesConfig.SWITCH_COMPONENT_ROUTE,
        // prefix: ImageConfig.CheckboxIcon,
    },
    {
        title: "Radio Button",
        path: RoutesConfig.RADIO_BUTTON_COMPONENT_ROUTE,
        // prefix: ImageConfig.RadioIcon,
    },
    {
        title: "Drawer",
        path: RoutesConfig.DRAWER_COMPONENT_ROUTE,
        // prefix: ImageConfig.RadioIcon,
    },
    {
        title: "Select Dropdown",
        path: RoutesConfig.SELECT_DROPDOWN_COMPONENT_ROUTE
    },
    {
        title: "Multi Select Dropdown",
        path: RoutesConfig.MULTI_SELECT_DROPDOWN_COMPONENT_ROUTE
    }
];

export default function SideBarComponent(props: SideBarComponentProps) {
    const {className} = props;
    const [isExpanded, setIsExpanded] = useState(true);

    const handleExpandCollapse = useCallback(() => {
        setIsExpanded((prev) => !prev);
    }, []);

    return (
        <div className={`sidebar-wrapper ${isExpanded ? "expanded" : ""} ${className}`}>
            <div className="branding">
                {isExpanded ? "Mantine UI" : "MUI"}
            </div>
            <div className="resize-icon-action" onClick={handleExpandCollapse}>
                {isExpanded ? <IoMdArrowDropleftCircle size={24}/> : <IoMdArrowDroprightCircle size={24}/>}
            </div>
            {menuListItem.map((menu, index) => (
                <div className="menu-list-wrapper" key={index}>
                    <NavLink to={menu.path} className={"menu-link"}>
                        {menu.prefix ? <div className="prefix-icon">{<menu.prefix/>}</div> : null}
                        {isExpanded && <div className="menu-label">{menu.title}</div>}
                    </NavLink>
                </div>
            ))}
        </div>
    );
}

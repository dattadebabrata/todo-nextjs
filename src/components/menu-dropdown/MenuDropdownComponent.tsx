import "./MenuDropdownComponent.scss";
import React, {ReactNode, useCallback, useRef, useState} from "react";
// import OutsideClickListener from "../../utils/outside-click-listener";

interface MenuDropdownComponentProps {
    menuBase: ReactNode | null;
}

const MenuDropdownComponent = (props: React.PropsWithChildren<MenuDropdownComponentProps>) => {

    const {menuBase, children} = props;
    const menuRef = useRef(null);
    // const [listening, setListening] = useState(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenuDropDown = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);

    // useEffect(OutsideClickListener(listening, setListening, menuRef, setIsOpen), [OutsideClickListener, listening, setListening, menuRef, setIsOpen]);

    return (
        <div ref={menuRef} className={'menu-dropdown-component-menu ' + (isOpen ? "active" : "")}>
            <div onClick={toggleMenuDropDown}>
                {menuBase}
            </div>
            <ul className="menu-dropdown-menu__content" onClick={toggleMenuDropDown}>
                {children}
            </ul>
        </div>
    );

};

export default MenuDropdownComponent;

// ****************************** USAGE ****************************** //

// const [isContextMenuOpened, setIsContextMenuOpened] = useState<boolean | undefined>(undefined);
//
// <MenuDropdownComponent
//     menuBase={
//         <ButtonComponent>Context Menu</ButtonComponent>
//     }
//     menuOptions={[
//         <CheckBoxComponent label={"Option 1"}/>,
//         <CheckBoxComponent label={"Option 2"}/>,
//         <CheckBoxComponent label={"Close"} onChange={()=>{setIsContextMenuOpened(false)}}/>,
//     ]}
//     isOpen={isContextMenuOpened}
//     onOpen={()=>{setIsContextMenuOpened(true)}}
//     onClose={()=>{setIsContextMenuOpened(false)}}
// />

// ****************************** USAGE ****************************** //

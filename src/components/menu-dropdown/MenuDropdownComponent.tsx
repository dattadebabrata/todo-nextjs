import "./MenuDropdownComponent.scss";
import {Menu, FloatingPlacement, FloatingSide, MantineRadius, MantineColor} from '@mantine/core';
import {useClickOutside} from '@mantine/hooks';
import {MutableRefObject, ReactNode} from "react";

interface MenuComponentProps {
    trigger?: 'hover' | 'click-hover' | 'click',
    isOpen?: boolean,
    onClose?: () => void;
    offset?: {
        mainAxis: number,
        crossAxis: number,
        alignmentAxis: number,
    } | number;
    position?: FloatingSide | `${FloatingSide}-${FloatingPlacement}`;
    withArrow?: boolean;
    width?: number | string;
    radius?: MantineRadius | number;
    zIndex?: string | number;
}

const MenuDropdownComponent = (props: MenuComponentProps) => {
    const {
        target,
        isOpen,
        onClose,
        trigger,
        children,
        offset,
        position,
        withArrow,
        width,
        radius,
        zIndex
    } = props;
    const menuRef: MutableRefObject<unknown> = useClickOutside(() => {
        onClose && onClose();
    });

    return (
        <Menu
            trigger={trigger}
            transitionProps={{transition: 'scale-y', duration: 200}}
            className={'menu-dropdown-component'}
            offset={offset}
            opened={isOpen}
            position={position}
            width={width}
            withArrow={withArrow}
            radius={radius}
            zIndex={zIndex}
            withinPortal={true}
        >
            <Menu.Target>
                {target}
            </Menu.Target>
            <Menu.Dropdown
                ref={menuRef}>
                {children}
            </Menu.Dropdown>
        </Menu>
    );

};

export default MenuDropdownComponent;

export const MenuDropdownItems = (props: {
    leftElement?: ReactNode,
    rightElement?: ReactNode,
    children: ReactNode,
    color?: MantineColor | 'primary' | 'secondary',
    disabled?: boolean,
    onClick?: (event: React.MouseEvent<unknown>) => void,
    closeMenuOnClick?: boolean,
    // onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    // onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}) => {
    const {
        leftElement,
        rightElement,
        children,
        color,
        closeMenuOnClick = true,
        disabled,
        onClick
    } = props;
    return <Menu.Item
        leftSection={leftElement}
        rightSection={rightElement}
        color={color as MantineColor}
        closeMenuOnClick={closeMenuOnClick}
        disabled={disabled} onClick={onClick}>
        {children}
    </Menu.Item>
}

export const MenuLabel = (props: { children: ReactNode }) => {
    const {children} = props;
    return <Menu.Label>{children}</Menu.Label>
}

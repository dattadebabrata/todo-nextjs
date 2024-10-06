import "./DrawerComponent.scss";
import {Drawer, Button, Container} from '@mantine/core';
import {ImageConfig} from "../../constants";
import {ReactNode} from "react";

interface DrawerComponentProps {
    position: 'left' | 'right' | 'top' | 'bottom',
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string | number,
    isOpen: boolean;
}

interface DrawerHeaderProps {
    title?: string;
    rightSection?: React.ReactNode;
}

const DrawerComponent = (props: DrawerComponentProps) => {
    const {
        children,
        position = 'right',
        size = 'md',
        isOpen,
        onClose,
        // transitionProps={ transition: 'rotate-left', duration: 150, timingFunction: 'linear' }
    } = props;

    return (
        <Drawer.Root
            className={'mantine-drawer-component'}
            opened={isOpen} onClose={onClose}
            position={position}
            size={size}
            // transitionProps={transitionProps}
        >
            <Drawer.Overlay/>
            <Drawer.Content>
                {children}
            </Drawer.Content>
        </Drawer.Root>
    );

};

export const DrawerHeader = (props: DrawerHeaderProps) => {
    const {title = 'Drawer Title', rightSection, onClose, CloseIcon = ImageConfig.CloseIcon} = props;
    return (
        <Drawer.Header className={'mantine-drawer-header'}>
            <Drawer.Title>{title}</Drawer.Title>
            <div className="drawer-header-right-section">
                {rightSection || null}
                {onClose ? <CloseIcon cursor={'pointer'} onClick={onClose}/> : null}
            </div>
        </Drawer.Header>
    );
}

export const DrawerBody = (props: { children: ReactNode }) => {
    const {children} = props;
    return (
        <Drawer.Body className={'mantine-drawer-body'}>
            {children}
        </Drawer.Body>
    );
}

export const DrawerFooter = (props: { children: ReactNode }) => {
    const {children} = props;
    return (
        <div className={'mantine-drawer-footer'}>
            {children}
        </div>
    );
}

export default DrawerComponent;

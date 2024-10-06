import "./ButtonComponent.scss";
import {
    Button,
    LoaderProps,
    MantineColor,
    MantineGradient,
    Tooltip
} from '@mantine/core';
import {forwardRef, ReactNode, useCallback, useMemo} from "react";

interface ButtonComponentProps {
    children: ReactNode;
    color?: string;
    compact?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;
    gradient?: MantineGradient;
    prefixElement?: ReactNode;
    suffixElement?: ReactNode;
    loaderProps?: LoaderProps;
    // variant: Changes the style of the loader. Available variants in Mantine are 'bars', 'dots' for ex. loaderProps={{ type: 'dots' }}
    loading?: boolean;
    radius?: number | "xs" | "sm" | "md" | "lg" | "xl";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    width?: number | string; // New feature for setting the width of the button
    type?: "button" | "reset" | "submit";
    variant?: "outline" | "white" | "light" | "default" | "filled" | "subtle" | "gradient";
    tooltip?: string; // New feature for adding a tooltip
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonComponentProps>(
    (props, ref) => {
        const {
            children,
            color = 'primary',
            compact = false,
            disabled = false,
            fullWidth = false,
            gradient,
            prefixElement,
            suffixElement,
            loaderProps,
            loading = false,
            radius = 'md',
            size = 'sm',
            width,
            type = 'button' as 'button',
            variant = 'filled',
            tooltip,
            onClick
        } = props;

        const handleOnClick = useCallback((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (!disabled && onClick) {
                onClick(event);
            }
        }, [disabled, onClick]);

        // Memoized prefix and suffix elements
        const prefix = useMemo(() => {
            return prefixElement || null;
        }, [prefixElement]);

        const suffix = useMemo(() => {
            return suffixElement || null;
        }, [suffixElement]);

        const buttonContent = (
            <Button
                ref={ref}
                className="button-component"
                color={color as MantineColor}
                compact={compact?.toString()}
                disabled={disabled}
                fullWidth={fullWidth}
                gradient={gradient}
                leftSection={prefix}
                rightSection={suffix}
                loaderProps={loaderProps}
                loading={loading}
                radius={radius}
                size={size}
                type={type}
                variant={variant}
                onClick={handleOnClick}
                styles={{
                    root: {
                        width:undefined
                    }
                }}
            >
                {children}
            </Button>
        );

        return tooltip ? (
            <Tooltip label={tooltip} position="top" withArrow>
                {buttonContent}
            </Tooltip>
        ) : (
            buttonContent
        );
    }
);

ButtonComponent.displayName = 'ButtonComponent'; // Added displayName for better debugging

export default ButtonComponent;

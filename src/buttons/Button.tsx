import React, { memo, forwardRef } from 'react';
import { Spinner } from "../spinner";
import { cx, dataAttr } from '../helpers';
import type { IButtonProps } from "./types";
import { useButtonClass, useSpinnerClass } from './styles';


export const Button: React.FC<IButtonProps> = memo(
  forwardRef<HTMLButtonElement, IButtonProps>((props, ref) => {
    const {
        className,
        size = 'md',
        variant = 'outline',
        intent = 'primary',
        isDisabled = false,
        isLoading = false,
        children,
        ...restProps
    } = props;
    const classes = useButtonClass({ size, variant, intent, isDisabled, isLoading });
    const spinnerClasses = useSpinnerClass({ size })

    return (
        <button
            ref={ref}
            data-loading={dataAttr(isLoading)}
            className={cx(classes, className)}
            disabled={isDisabled || isLoading}
            {...restProps}
        >
            {isLoading && (
                <Spinner className={spinnerClasses} />
            )}
            {children}
        </button>
    );
  })
);

import React from 'react';

export type IButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IButtonVariant = 'link' | 'solid' | 'outline' | 'light' | 'ghost';
export type IButtonIntent =
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'white';

export interface IButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'size'> {
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * Intent
   * @default primary
   */
  intent?: IButtonIntent;
  /**
   * Size of the button
   * @default md
   */
  size?: IButtonSize;
  /**
   * Controls button appearance
   * @default outline
   */
  variant?: IButtonVariant;
  /* React node */
  children?: React.ReactNode;
}

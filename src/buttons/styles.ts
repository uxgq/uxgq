import { IButtonProps } from '.';
import { createMemoClass, cx } from '../helpers';
import { IButtonIntent, IButtonSize } from './types';

const buttonIntent: Record<IButtonIntent, string> = {
  primary:
    'border-transparent text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500',
  success:
    'border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500',
  danger:
    'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
  warning:
    'border-transparent text-white bg-orange-600 hover:bg-orange-700 focus:ring-orange-500',
  white:
    'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary-500',
};

const buttonStyles: Record<string, string> = {
  base:
    'inline-flex items-center relative border  font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2',
  transition: 'transition duration-75 ease-out transition-colors',
};

const buttonSize: Record<IButtonSize, string> = {
  xs: 'px-2.5 py-1.5 text-xs  rounded',
  sm: 'px-3 py-2 text-sm leading-4 rounded-md ',
  md: 'px-4 py-2 text-sm  rounded-md',
  lg: 'px-4 py-2 text-base rounded-md',
  xl: 'px-6 py-3 text-base rounded-md ',
};

const buttonIsDisabled = 'opacity-20 cursor-not-allowed';

const spinnerSize: Record<IButtonSize, string> = {
  xs: '-ml-0.5 mr-2 h-4 w-4',
  sm: '-ml-1 mr-2 h-5 w-5',
  md: '-ml-1 mr-3 h-5 w-5',
  lg: '-ml-1 mr-3 h-5 w-5',
  xl: '-ml-1 mr-3 h-5 w-5',
};

export const useSpinnerClass = createMemoClass(
  (props: Required<Pick<IButtonProps, 'size'>>) => {
    return cx(spinnerSize[props.size]);
  }
);

export const useButtonClass = createMemoClass(
  (
    props: Required<
      Pick<
        IButtonProps,
        'size' | 'variant' | 'intent' | 'isDisabled' | 'isLoading'
      >
    >
  ) => {
    return cx(
      buttonStyles.base,
      buttonStyles.transition,
      buttonSize[props.size],
      buttonIntent[props.intent],
      {
        [buttonIsDisabled]: props.isDisabled || props.isLoading,
      }
    );
  }
);

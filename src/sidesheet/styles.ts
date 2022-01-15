import { ISidesheetProps } from '.';
import { createMemoClass, cx } from '../helpers';
import { ISidesheetPosition } from './types';

const direction = (position?: ISidesheetPosition) => {
  switch (position) {
    case 'right': {
      return 'right-0 pl-10 sm:pl-16';
    }
    case 'left': {
      return 'left-0 pr-10 sm:pr-16';
    }
  }

  return '';
};

const rootAnimation = (position?: ISidesheetPosition) => {
  switch (position) {
    case 'right': {
      return {
        enterFrom: 'translate-x-full',
        enterTo: 'translate-x-0',
        leaveTo: 'translate-x-full',
        leaveFrom: 'translate-x-0',
      };
    }
    case 'left': {
      return {
        enterFrom: '-translate-x-full',
        enterTo: 'translate-x-0',
        leaveTo: '-translate-x-full',
        leaveFrom: 'translate-x-0',
      };
    }
  }

  return {
    enterFrom: '',
    enterTo: '',
    leaveTo: '',
    leaveFrom: '',
  };
};

export const useSidesheetClass = createMemoClass(
  (props: Pick<ISidesheetProps, 'position'>) => {
    return {
      root: cx(direction(props.position)),
      animation: rootAnimation(props.position),
    };
  }
);

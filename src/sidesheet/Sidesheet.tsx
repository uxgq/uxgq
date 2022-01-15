import React, { memo, Fragment } from 'react';
import { cx, __DEV__ } from '../helpers';
import { ISidesheetProps, ISidesheetSize } from './types';
import { Dialog, Transition } from '@headlessui/react';
import { useSidesheetClass } from './styles';
import { Stack } from '..';

const noop = () => {};

const getOffset = (depth: number) => {
  // max of 200px, min of 80px
  const offset = Math.max(200 / depth, 80);
  return offset * depth + 1;
};

const getMaxWidth = (depth: number, size: ISidesheetSize) => {
  switch (size) {
    case 'sm': {
      return '24rem';
    }
    case 'md': {
      return '28rem';
    }
    case 'lg': {
      return '42rem';
    }
    case 'half': {
      return '50vw';
    }
    default: {
      const offset = getOffset(depth + 1);
      return `calc(100vw - ${offset}px)`;
    }
  }
};

export const Sidesheet: React.FC<ISidesheetProps> = memo(props => {
  const {
    isOpen = false,
    position = 'right',
    size = 'default',
    children,
    onClose = noop,
  } = props;

  const classes = useSidesheetClass({ position });

  return (
    <Stack>
      {current => (
        <Transition as="div" className="foo" show={isOpen}>
          <Dialog
            as="div"
            className="fixed inset-0 overflow-hidden"
            onClose={onClose}
          >
            <div className="absolute inset-0 overflow-hidden">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div
                className={cx('fixed inset-y-0 max-w-full flex', classes.root)}
              >
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom={classes.animation.enterFrom}
                  enterTo={classes.animation.enterTo}
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom={classes.animation.leaveFrom}
                  leaveTo={classes.animation.leaveTo}
                >
                  <div
                    className="w-screen"
                    style={{
                      maxWidth: getMaxWidth(current, size),
                    }}
                  >
                    <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                      {children}
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </Stack>
  );
});

if (__DEV__) {
  Sidesheet.displayName = 'Sidesheet';
}

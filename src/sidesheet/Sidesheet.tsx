import React, { memo, Fragment } from 'react';
import { cx, __DEV__ } from '../helpers';
import { ISidesheetProps } from './types';
import { Dialog, Transition } from '@headlessui/react';
import { useSidesheetClass } from './styles';

const noop = () => {};

export const Sidesheet: React.FC<ISidesheetProps> = memo(props => {
  const {
    isOpen = false,
    position = 'right',
    children,
    onClose = noop,
  } = props;

  const classes = useSidesheetClass({ position });

  return (
    <Transition show={isOpen} as={Fragment}>
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

          <div className={cx('fixed inset-y-0 max-w-full flex', classes.root)}>
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom={classes.animation.enterFrom}
              enterTo={classes.animation.enterTo}
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom={classes.animation.leaveFrom}
              leaveTo={classes.animation.leaveTo}
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  {children}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

if (__DEV__) {
  Sidesheet.displayName = 'Sidesheet';
}

import React, { memo } from 'react';
import { Dialog } from '@headlessui/react';
import { __DEV__ } from '../helpers';

export const SidesheetHeader: React.FC = memo(props => {
  const { children } = props;

  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="flex items-start justify-between">
        <Dialog.Title className="text-lg font-medium text-gray-900">
          {children}
        </Dialog.Title>
      </div>
    </div>
  );
});

if (__DEV__) {
  SidesheetHeader.displayName = 'SidesheetHeader';
}

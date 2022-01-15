import React, { useContext, memo } from 'react';
import { __DEV__ } from '../helpers';
import StackingContext from './StackingContext';

export interface IStackProps {
  value?: number;
  children: (zIndex: number) => React.ReactNode;
}

export const Stack: React.FC<IStackProps> = memo(props => {
  const { value = 1000, children } = props;
  const previousValue = useContext(StackingContext);
  const currentValue = Math.max(value, previousValue);
  const nextValue = currentValue + 1;

  return (
    <StackingContext.Provider value={nextValue}>
      {children(currentValue)}
    </StackingContext.Provider>
  );
});

if (__DEV__) {
  Stack.displayName = 'Stack';
}

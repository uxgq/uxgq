import { useMemo } from 'react';

export function createMemoClass<T = any>(func: (props: any) => T) {
  return function useMemoClass(args?: any) {
    const dependencies =
      typeof args === 'object' && args !== null
        ? Object.keys(args)
            .filter(key => key !== 'theme')
            .map(key => args[key])
        : [];

    return useMemo(() => func(args), dependencies);
  };
}

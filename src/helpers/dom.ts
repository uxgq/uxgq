import cx from 'clsx';
import { Booleanish } from './types';

export { cx };

export function canUseDOM(): boolean {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export const isBrowser = canUseDOM();

export const dataAttr = (condition: boolean | undefined) =>
  (condition ? '' : undefined) as Booleanish;

export const ariaAttr = (condition: boolean | undefined) =>
  condition ? true : undefined;

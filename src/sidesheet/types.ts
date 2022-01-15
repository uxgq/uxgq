export type ISidesheetPosition = 'right' | 'left';

export type ISidesheetSize = 'sm' | 'half' | 'md' | 'lg' | 'default';

export interface ISidesheetProps {
  /**
   * Position either left or right
   * @default right
   */
  position?: ISidesheetPosition;
  /**
   * When true, the Side Sheet is shown.
   */
  isOpen?: boolean;
  /**
   * Function that will be called when the exit transition is complete.
   */
  onClose?: () => void;
  /**
   * Offset Sidesheet
   * the default size is a offset sidesheet, with an offset of 80px to the previous
   * this is usefull if you work with nested forms etc.
   *
   * sm - is used for info panes, like media information
   * md - for small forms or profiles
   * lg - use lg for profiles with avatars, large forms.
   *
   * @default default
   */
  size?: ISidesheetSize;
}

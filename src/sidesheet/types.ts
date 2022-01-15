export type ISidesheetPosition = 'right' | 'left';

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
}

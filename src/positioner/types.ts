import React from 'react';
import { Position } from './position.enum';

export type Dimension = {
  width: number;
  height: number;
  left?: number;
  top?: number;
  transformOrigin?: null | string;
};

export type IPosition = {
  left: number;
  top: number;
};

export type IRect = {
  width: number;
  height: number;
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type IViewport = {
  height: number;
  width: number;
};

export type GetFittedPositionOptions = GetPositionOptions;

export type GetPositionOptions = {
  /**
   * the dimensions of the positioner.
   */
  dimensions: Dimension;
  /**
   * the position the positioner should be on.
   */
  position: Position;
  /**
   * offset from the target.
   */
  targetOffset: number;
  /**
   * the rect of the target.
   */
  targetRect: IRect;
  /**
   * the width and height of the viewport.
   */
  viewport: IViewport;
  /**
   * offset from the viewport.
   */
  viewportOffset: number;
};

export interface IPositionerProps {
  /**
   * Function that should return a node for the target.
   * ({ getRef: () -> Ref, isShown: Bool }) -> React Node
   */
  target: (props: {
    getRef: React.Ref<unknown> | React.MutableRefObject<unknown>;
    isShown: boolean;
  }) => React.ReactNode;
  /**
   * The position the element that is being positioned is on.
   * Smart positioning might override this.
   */
  position: Position;
  /**
   * When true, show the element being positioned.
   */
  isShown: boolean;
  /**
   * The minimum distance from the body to the element being positioned.
   */
  bodyOffset?: number;
  /**
   * The minimum distance from the target to the element being positioned.
   */
  targetOffset?: number;
  /**
   * Function that will be called when the exit transition is complete.
   */
  onCloseComplete?: () => void;
  /**
   * Function that will be called when the enter transition is complete.
   */
  onOpenComplete?: () => void;
  /**
   * Function that returns the element being positioned.
   */
  children: (props: {
    top: number | undefined;
    left: number | undefined;
    zIndex: number;
    style: React.CSSProperties;
    getRef: React.Ref<unknown> | React.MutableRefObject<unknown>;
  }) => React.ReactNode;
}

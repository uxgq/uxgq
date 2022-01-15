import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useMergeRefs, usePrevious } from '../hooks';
import getPosition from './get-position';
import { Position } from './position.enum';
import { Dimension, IPositionerProps } from './types';
import { Stack } from '../stack';
import { Portal } from '../portal';

const noop = () => {};
const initialDimensions: Dimension = {
  left: 0,
  top: 0,
  height: 0,
  width: 0,
  transformOrigin: null,
};

export const Positioner: React.FC<IPositionerProps> = memo(props => {
  const {
    target,
    isShown,
    position = Position.BOTTOM,
    bodyOffset = 6,
    targetOffset = 6,
    onOpenComplete = noop,
    onCloseComplete = noop,
    children,
  } = props;
  const [dimensions, setDimensions] = useState(initialDimensions);
  const previousDimensions = usePrevious(dimensions, initialDimensions);
  const latestAnimationFrame = useRef<number>();
  const transitionState = useRef<'entered' | 'exited'>();
  const positionerRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const setTargetRef = useMergeRefs(targetRef);
  const getRef = useMergeRefs(positionerRef);

  const update = useCallback(
    (prevHeight = 0, prevWidth = 0) => {
      if (!isShown || !targetRef.current || !positionerRef.current) return;

      const targetRect = targetRef.current.getBoundingClientRect();

      const hasEntered =
        positionerRef.current.getAttribute('data-state') === 'entered';

      const viewportHeight = document.documentElement.clientHeight;
      const viewportWidth = document.documentElement.clientWidth;

      let height: number;
      let width: number;
      if (hasEntered) {
        // Only when the animation is done should we opt-in to `getBoundingClientRect`
        const positionerRect = positionerRef.current.getBoundingClientRect();

        // https://github.com/segmentio/evergreen/issues/255
        // We need to ceil the width and height to prevent jitter when
        // the window is zoomed (when `window.devicePixelRatio` is not an integer)
        height = Math.round(positionerRect.height);
        width = Math.round(positionerRect.width);
      } else {
        // When the animation is in flight use `offsetWidth/Height` which
        // does not calculate the `transform` property as part of its result.
        // There is still change on jitter during the animation (although unoticable)
        // When the browser is zoomed in — we fix this with `Math.max`.
        height = Math.max(positionerRef.current.offsetHeight, prevHeight);
        width = Math.max(positionerRef.current.offsetWidth, prevWidth);
      }

      const { rect, transformOrigin } = getPosition({
        position,
        targetRect,
        targetOffset,
        dimensions: {
          height,
          width,
        },
        viewport: {
          width: viewportWidth,
          height: viewportHeight,
        },
        viewportOffset: bodyOffset,
      });

      setDimensions({
        left: rect.left,
        top: rect.top,
        height,
        width,
        transformOrigin,
      });
    },
    [bodyOffset, isShown, position, targetOffset]
  );

  // Call `update` whenever the component has "entered" and dimensions change
  useEffect(() => {
    if (transitionState.current === 'entered') {
      latestAnimationFrame.current = requestAnimationFrame(() => {
        update(previousDimensions.height, previousDimensions.width);
      });
    }

    return () => {
      if (latestAnimationFrame.current) {
        cancelAnimationFrame(latestAnimationFrame.current);
      }
    };
  }, [previousDimensions.height, previousDimensions.width, update]);

  const handleEnter = () => {
    transitionState.current = 'entered';
    update();
  };

  const handleExited = () => {
    transitionState.current = 'exited';
    setDimensions(initialDimensions);
    onCloseComplete();
  };

  return (
    <Stack>
      {zIndex => (
        <>
          {target({ getRef: setTargetRef, isShown })}

          <Transition
            appear
            show={isShown}
            ref={positionerRef}
            unmount
            beforeEnter={handleEnter}
            afterEnter={onOpenComplete}
            afterLeave={handleExited}
          >
            <Portal>
              {children({
                top: dimensions.top,
                left: dimensions.left,
                zIndex,
                style: {
                  transformOrigin: dimensions.transformOrigin || undefined,
                  left: dimensions.left,
                  top: dimensions.top,
                  zIndex,
                },
                getRef,
              })}
            </Portal>
          </Transition>
        </>
      )}
    </Stack>
  );
});

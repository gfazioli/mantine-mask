import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import {
  Box,
  createVarsResolver,
  factory,
  getRadius,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
  type BoxProps,
  type Factory,
  type MantineRadius,
} from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import classes from './Mask.module.css';

export type MaskStylesNames = 'root' | 'mask';

export type MaskCssVariables = {
  root: '--mask-radius';
  mask: '--mask-transparency-end' | '--mask-transparency-start' | '--mask-opacity';
};

export interface MaskProps extends BoxProps, StylesApiProps<MaskFactory> {
  /** Mask content */
  children?: React.ReactNode;

  /** Enable cursor-follow mask. When false, the mask uses static coordinates. @default true */
  withCursorMask?: boolean;

  /** Horizontal position of the mask center in percentages when `withCursorMask` is false. @default 50 */
  maskX?: number;

  /** Vertical position of the mask center in percentages when `withCursorMask` is false. @default 50 */
  maskY?: number;

  maskTransparencyEnd?: number;
  maskTransparencyStart?: number;
  maskOpacity?: number;
  easing?: number;

  /** Radius of the mask. Accepts numbers (px) or any CSS length unit. @default 240 */
  maskRadius?: number | string;

  /** Border radius
   * @default 'md'
   */
  radius?: MantineRadius | (string & {}) | number;
}

export type MaskFactory = Factory<{
  props: MaskProps;
  ref: HTMLDivElement;
  stylesNames: MaskStylesNames;
  vars: MaskCssVariables;
}>;

export const defaultProps: Partial<MaskProps> = {
  withCursorMask: false,
  maskX: 50,
  maskY: 50,
  maskRadius: 240,
  maskTransparencyEnd: 100,
  maskTransparencyStart: 0,
  maskOpacity: 1,
  easing: 0.12,
  radius: 0,
};

const varsResolver = createVarsResolver<MaskFactory>(
  (_, { radius, maskTransparencyEnd, maskTransparencyStart, maskOpacity }) => {
    return {
      root: {
        '--mask-radius': radius === undefined ? undefined : getRadius(radius),
      },
      mask: {
        '--mask-transparency-end':
          maskTransparencyEnd !== undefined ? `${maskTransparencyEnd}%` : undefined,
        '--mask-transparency-start':
          maskTransparencyStart !== undefined ? `${maskTransparencyStart}%` : undefined,
        '--mask-opacity': maskOpacity.toString(),
      },
    };
  }
);

export const Mask = factory<MaskFactory>((_props, ref) => {
  const props = useProps('Mask', defaultProps, _props);

  const {
    children,
    radius,
    withCursorMask,
    maskX,
    maskY,
    maskRadius,
    maskTransparencyEnd,
    maskTransparencyStart,
    maskOpacity,
    easing,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const getStyles = useStyles<MaskFactory>({
    name: 'Mask',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRef(containerRef, ref);

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setCursorPosition({ x: centerX, y: centerY });
    setSmoothPosition({ x: centerX, y: centerY });
  }, []);

  useEffect(() => {
    if (!withCursorMask) {
      return undefined;
    }

    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      setCursorPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    };

    node.addEventListener('pointermove', handlePointerMove);
    return () => node.removeEventListener('pointermove', handlePointerMove);
  }, [withCursorMask]);

  useEffect(() => {
    if (!withCursorMask) {
      return undefined;
    }

    let animationFrame = 0;
    const animate = () => {
      setSmoothPosition((prev) => {
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;

        return {
          x: Math.round(prev.x + dx * easing),
          y: Math.round(prev.y + dy * easing),
        };
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [cursorPosition.x, cursorPosition.y, withCursorMask]);

  const radiusValue = typeof maskRadius === 'number' ? rem(maskRadius) : maskRadius;
  const maskVariables: CSSProperties = withCursorMask
    ? ({
        '--mask-x': `${smoothPosition.x}px`,
        '--mask-y': `${smoothPosition.y}px`,
      } as CSSProperties)
    : ({
        '--mask-x': `${maskX}%`,
        '--mask-y': `${maskY}%`,
      } as CSSProperties);

  return (
    <Box ref={mergedRef} {...getStyles('root')} data-with-cursor={withCursorMask} {...others}>
      <div
        {...getStyles('mask', {
          style: {
            '--mask-radial-radius': radiusValue,
            ...maskVariables,
          },
        })}
      >
        {children}
      </div>
    </Box>
  );
});

Mask.displayName = 'Mask';

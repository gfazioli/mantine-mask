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
  root: '--mask-radius' | '--mask-background';
  mask: '--mask-transparency-end' | '--mask-transparency-start' | '--mask-opacity';
};

export type MaskActivation = 'always' | 'hover' | 'focus';

export interface MaskProps extends BoxProps, StylesApiProps<MaskFactory> {
  /** Mask content */
  children?: React.ReactNode;

  /** Tab index applied to root element (useful with `activation="focus"`). */
  tabIndex?: number;

  /** Enable cursor-follow mask. When false, the mask uses static coordinates. @default false */
  withCursorMask?: boolean;

  /** Horizontal position of the mask center in percentages when `withCursorMask` is false. @default 50 */
  maskX?: number;

  /** Vertical position of the mask center in percentages when `withCursorMask` is false. @default 50 */
  maskY?: number;

  /** Background of the container behind the masked content. */
  maskBackground?: string;

  maskTransparencyEnd?: number;
  maskTransparencyStart?: number;
  maskOpacity?: number;
  easing?: number;

  /** Radius of the mask. Accepts numbers (px) or any CSS length unit. @default 240 */
  maskRadius?: number | string;

  /** Horizontal radius of the mask. If set, it overrides `maskRadius` on X axis. */
  maskRadiusX?: number | string;

  /** Vertical radius of the mask. If set, it overrides `maskRadius` on Y axis. */
  maskRadiusY?: number | string;

  /** Invert mask: hide center and show outside. @default false */
  invertMask?: boolean;

  /** Cursor offset on X axis (px) when `withCursorMask` is true. @default 0 */
  cursorOffsetX?: number;

  /** Cursor offset on Y axis (px) when `withCursorMask` is true. @default 0 */
  cursorOffsetY?: number;

  /** Constrain cursor-follow mask to stay inside container bounds when possible. @default true */
  clampToBounds?: boolean;

  /** Recenter the mask when container size changes. @default false */
  recenterOnResize?: boolean;

  /** Controls when the cursor mask is active. @default 'always' */
  activation?: MaskActivation;

  /** Controlled active state. When provided, it overrides `activation`. */
  active?: boolean;

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
  maskBackground: undefined,
  maskRadius: 240,
  maskRadiusX: undefined,
  maskRadiusY: undefined,
  maskTransparencyEnd: 100,
  maskTransparencyStart: 0,
  maskOpacity: 1,
  easing: 0.12,
  invertMask: false,
  cursorOffsetX: 0,
  cursorOffsetY: 0,
  clampToBounds: true,
  recenterOnResize: false,
  activation: 'always',
  active: undefined,
  radius: 0,
};

const varsResolver = createVarsResolver<MaskFactory>(
  (_, { radius, maskBackground, maskTransparencyEnd, maskTransparencyStart, maskOpacity }) => {
    return {
      root: {
        '--mask-radius': radius === undefined ? undefined : getRadius(radius),
        '--mask-background': maskBackground,
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

function clampValue(value: number, min: number, max: number) {
  if (max < min) {
    return (min + max) / 2;
  }

  return Math.min(Math.max(value, min), max);
}

export const Mask = factory<MaskFactory>((_props, ref) => {
  const props = useProps('Mask', defaultProps, _props);

  const {
    children,
    radius,
    withCursorMask,
    tabIndex,
    maskX,
    maskY,
    maskBackground,
    maskRadius,
    maskRadiusX,
    maskRadiusY,
    maskTransparencyEnd,
    maskTransparencyStart,
    maskOpacity,
    easing,
    invertMask,
    cursorOffsetX,
    cursorOffsetY,
    clampToBounds,
    recenterOnResize,
    activation,
    active,

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

  const [uncontrolledActive, setUncontrolledActive] = useState(activation === 'always');
  const isActive = active ?? (activation === 'always' ? true : uncontrolledActive);

  useEffect(() => {
    if (activation === 'always') {
      setUncontrolledActive(true);
    } else {
      setUncontrolledActive(false);
    }
  }, [activation]);

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
    if (!recenterOnResize) {
      return undefined;
    }

    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new ResizeObserver(() => {
      const rect = node.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setCursorPosition({ x: centerX, y: centerY });
      setSmoothPosition({ x: centerX, y: centerY });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [recenterOnResize]);

  useEffect(() => {
    if (!withCursorMask || !isActive) {
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
  }, [cursorPosition.x, cursorPosition.y, easing, isActive, withCursorMask]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!withCursorMask || !isActive) {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();

    const rawX = event.clientX - rect.left + (cursorOffsetX ?? 0);
    const rawY = event.clientY - rect.top + (cursorOffsetY ?? 0);

    if (!clampToBounds) {
      setCursorPosition({ x: rawX, y: rawY });
      return;
    }

    const radiusXNumber =
      typeof maskRadiusX === 'number'
        ? maskRadiusX
        : typeof maskRadius === 'number'
          ? maskRadius
          : undefined;
    const radiusYNumber =
      typeof maskRadiusY === 'number'
        ? maskRadiusY
        : typeof maskRadius === 'number'
          ? maskRadius
          : undefined;

    const radiusXForClamp = radiusXNumber ?? 0;
    const radiusYForClamp = radiusYNumber ?? 0;

    const minX = radiusXForClamp;
    const maxX = rect.width - radiusXForClamp;
    const minY = radiusYForClamp;
    const maxY = rect.height - radiusYForClamp;

    setCursorPosition({
      x: clampValue(rawX, minX, maxX),
      y: clampValue(rawY, minY, maxY),
    });
  };

  const handlePointerEnter = () => {
    if (active !== undefined) {
      return;
    }

    if (activation === 'hover') {
      setUncontrolledActive(true);
    }
  };

  const handlePointerLeave = () => {
    if (active !== undefined) {
      return;
    }

    if (activation === 'hover') {
      setUncontrolledActive(false);
    }
  };

  const handleFocus = () => {
    if (active !== undefined) {
      return;
    }

    if (activation === 'focus') {
      setUncontrolledActive(true);
    }
  };

  const handleBlur = () => {
    if (active !== undefined) {
      return;
    }

    if (activation === 'focus') {
      setUncontrolledActive(false);
    }
  };

  const radiusXValue = typeof maskRadiusX === 'number' ? rem(maskRadiusX) : maskRadiusX;
  const radiusYValue = typeof maskRadiusY === 'number' ? rem(maskRadiusY) : maskRadiusY;
  const radiusValue = typeof maskRadius === 'number' ? rem(maskRadius) : maskRadius;

  const resolvedRadiusX = radiusXValue ?? radiusValue;
  const resolvedRadiusY = radiusYValue ?? radiusValue;

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
    <Box
      ref={mergedRef}
      {...getStyles('root')}
      data-with-cursor={withCursorMask}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={activation === 'focus' ? (tabIndex ?? 0) : tabIndex}
      {...others}
    >
      <div
        {...getStyles('mask', {
          style: {
            '--mask-radial-radius': radiusValue,
            '--mask-radial-radius-x': resolvedRadiusX,
            '--mask-radial-radius-y': resolvedRadiusY,
            ...maskVariables,
          },
        })}
        data-invert={invertMask}
        data-active={isActive}
      >
        {children}
      </div>
    </Box>
  );
});

Mask.displayName = 'Mask';

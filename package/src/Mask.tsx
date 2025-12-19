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

/** Available mask variants */
export type MaskVariant = 'radial' | 'linear';

export type MaskStylesNames = 'root' | 'mask';

export type MaskCssVariables = {
  root: '--mask-radius';
  mask: '--mask-transparency-end' | '--mask-transparency-start' | '--mask-opacity';
};

export type MaskActivation = 'always' | 'hover' | 'focus' | 'pointer';

export type MaskAnimation = 'lerp' | 'none';

export interface MaskProps extends BoxProps, StylesApiProps<MaskFactory> {
  /** Mask component variant @default 'radial' */
  variant?: MaskVariant;

  /** Linear gradient angle (deg) when `variant="linear"`. @default 90 */
  maskAngle?: number | string;

  /** Mask content */
  children?: React.ReactNode;

  /** Tab index applied to root element (useful with `activation="focus"`). */
  tabIndex?: number;

  /** Enable cursor-follow mask. When false, the mask uses static coordinates. @default false */
  withCursorMask?: boolean;

  /**
   * Track cursor position on the entire document instead of only inside the component.
   * When enabled, `clampToBounds` and `clampPadding` are ignored.
   * @default false
   */
  trackPointerOnDocument?: boolean;

  /** Horizontal position of the mask center in percentages when `withCursorMask` is false. @default 50 */
  maskX?: number;

  /** Vertical position of the mask center in percentages when `withCursorMask` is false. @default 50 */
  maskY?: number;

  /** Controls gradient start stop (percentage). @default 0 */
  maskTransparencyStart?: number;

  /** Controls gradient end stop (percentage). @default 100 */
  maskTransparencyEnd?: number;

  /**
   * Controls gradient feathering as a single value.
   * If set, it overrides `maskTransparencyStart` and `maskTransparencyEnd`.
   * - 0: hard edge (start=end=100)
   * - 100: full fade (start=0, end=100)
   */
  maskFeather?: number;

  /** Opacity of the masked content (0 to 1). @default 1 */
  maskOpacity?: number;

  /** Easing factor for cursor-follow mask animation (0 to 1). Lower values result in slower easing. @default 0.12 */
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

  /** Extra padding (px) applied when `clampToBounds` is enabled. @default 0 */
  clampPadding?: number;

  /** Recenter the mask when container size changes. @default false */
  recenterOnResize?: boolean;

  /** Recenter the mask when children change. @default false */
  recenterOnChildrenChange?: boolean;

  /** Controls when the cursor mask is active. @default 'always' */
  activation?: MaskActivation;

  /** Controlled active state. When provided, it overrides `activation`. */
  active?: boolean;

  /** Called when active state changes due to activation events. */
  onActiveChange?: (active: boolean) => void;

  /**
   * Cursor mask animation.
   * - `lerp`: animate following cursor using `easing`
   * - `none`: follow cursor instantly
   * @default 'lerp'
   */
  animation?: MaskAnimation;

  /** Border radius
   * @default 'md'
   */
  radius?: MantineRadius | (string & {}) | number;
}

export type MaskFactory = Factory<{
  props: MaskProps;
  ref: HTMLDivElement;
  stylesNames: MaskStylesNames;
  variant: MaskVariant;
  vars: MaskCssVariables;
}>;

export const defaultProps: Partial<MaskProps> = {
  variant: 'radial',
  maskAngle: 90,
  withCursorMask: false,
  trackPointerOnDocument: false,
  maskX: 50,
  maskY: 50,
  maskRadius: 240,
  maskRadiusX: undefined,
  maskRadiusY: undefined,
  maskTransparencyEnd: 100,
  maskTransparencyStart: 0,
  maskFeather: undefined,
  maskOpacity: 1,
  easing: 0.12,
  invertMask: false,
  cursorOffsetX: 0,
  cursorOffsetY: 0,
  clampToBounds: false,
  clampPadding: 0,
  recenterOnResize: false,
  recenterOnChildrenChange: false,
  activation: 'always',
  active: undefined,
  onActiveChange: undefined,
  animation: 'lerp',
  radius: 0,
};

function normalizeFeather(feather: number) {
  const asPercent = feather <= 1 ? feather * 100 : feather;
  return clampValue(asPercent, 0, 100);
}

const varsResolver = createVarsResolver<MaskFactory>((_, { radius, maskTransparencyEnd, maskTransparencyStart, maskFeather, maskOpacity }) => {
  const hasFeather = maskFeather !== undefined;
  const featherPercent = hasFeather ? normalizeFeather(maskFeather) : undefined;
  const computedStart = hasFeather ? 100 - (featherPercent ?? 0) : maskTransparencyStart;
  const computedEnd = hasFeather ? 100 : maskTransparencyEnd;

  return {
    root: {
      '--mask-radius': radius === undefined ? undefined : getRadius(radius),
    },
    mask: {
      '--mask-transparency-end': computedEnd !== undefined ? `${computedEnd}%` : undefined,
      '--mask-transparency-start': computedStart !== undefined ? `${computedStart}%` : undefined,
      '--mask-opacity': maskOpacity.toString(),
    },
  };
});

function clampValue(value: number, min: number, max: number) {
  if (max < min) {
    return (min + max) / 2;
  }

  return Math.min(Math.max(value, min), max);
}

function parseAngleDegrees(angle: number | string | undefined, fallback: number) {
  if (typeof angle === 'number') {
    return angle;
  }

  if (typeof angle === 'string') {
    const trimmed = angle.trim();
    const numeric = Number.parseFloat(trimmed);
    return Number.isFinite(numeric) ? numeric : fallback;
  }

  return fallback;
}

function getLinearCenterPercent(x: number, y: number, width: number, height: number, angleDeg: number) {
  if (width <= 0 || height <= 0) {
    return 50;
  }

  const theta = (angleDeg * Math.PI) / 180;
  const directionX = Math.sin(theta);
  const directionY = -Math.cos(theta);

  const project = (px: number, py: number) => px * directionX + py * directionY;

  const projections = [project(0, 0), project(width, 0), project(0, height), project(width, height)];

  const min = Math.min(...projections);
  const max = Math.max(...projections);
  const range = max - min;

  if (range <= 0) {
    return 50;
  }

  const t = project(x, y);
  return clampValue(((t - min) / range) * 100, 0, 100);
}

export const Mask = factory<MaskFactory>((_props, ref) => {
  const props = useProps('Mask', defaultProps, _props);

  const {
    variant,
    maskAngle,
    children,
    radius,
    withCursorMask,
    trackPointerOnDocument,
    tabIndex,
    maskX,
    maskY,
    maskRadius,
    maskRadiusX,
    maskRadiusY,
    maskTransparencyEnd,
    maskTransparencyStart,
    maskFeather,
    maskOpacity,
    easing,
    invertMask,
    cursorOffsetX,
    cursorOffsetY,
    clampToBounds,
    clampPadding,
    recenterOnResize,
    recenterOnChildrenChange,
    activation,
    active,
    onActiveChange,
    animation,

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

  const containerSizeRef = useRef({ width: 0, height: 0 });

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

  const setActive = (nextActive: boolean) => {
    if (active === undefined) {
      setUncontrolledActive(nextActive);
    }

    onActiveChange?.(nextActive);
  };

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    containerSizeRef.current = { width: rect.width, height: rect.height };
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
      containerSizeRef.current = { width: rect.width, height: rect.height };
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setCursorPosition({ x: centerX, y: centerY });
      setSmoothPosition({ x: centerX, y: centerY });
    });

    observer.observe(node);
    return () => observer.disconnect();
  }, [recenterOnResize]);

  useEffect(() => {
    if (!recenterOnChildrenChange) {
      return undefined;
    }

    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    let frame = 0;
    const recenter = () => {
      const rect = node.getBoundingClientRect();
      containerSizeRef.current = { width: rect.width, height: rect.height };
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      setCursorPosition({ x: centerX, y: centerY });
      setSmoothPosition({ x: centerX, y: centerY });
    };

    const observer = new MutationObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(recenter);
    });

    observer.observe(node, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [recenterOnChildrenChange]);

  useEffect(() => {
    if (!withCursorMask || !isActive || animation !== 'lerp') {
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
  }, [animation, cursorPosition.x, cursorPosition.y, easing, isActive, withCursorMask]);

  const applyNextPosition = (next: { x: number; y: number }) => {
    if (animation === 'none') {
      setCursorPosition(next);
      setSmoothPosition(next);
    } else {
      setCursorPosition(next);
    }
  };

  const updateFromClientPoint = (clientX: number, clientY: number) => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    containerSizeRef.current = { width: rect.width, height: rect.height };

    const rawX = clientX - rect.left + (cursorOffsetX ?? 0);
    const rawY = clientY - rect.top + (cursorOffsetY ?? 0);

    const shouldClamp = clampToBounds && !trackPointerOnDocument;

    if (!shouldClamp) {
      applyNextPosition({ x: rawX, y: rawY });
      return;
    }

    const radiusXNumber = typeof maskRadiusX === 'number' ? maskRadiusX : typeof maskRadius === 'number' ? maskRadius : undefined;
    const radiusYNumber = typeof maskRadiusY === 'number' ? maskRadiusY : typeof maskRadius === 'number' ? maskRadius : undefined;

    const radiusXForClamp = radiusXNumber ?? 0;
    const radiusYForClamp = radiusYNumber ?? 0;

    const padding = clampPadding ?? 0;
    const minX = radiusXForClamp + padding;
    const maxX = rect.width - radiusXForClamp - padding;
    const minY = radiusYForClamp + padding;
    const maxY = rect.height - radiusYForClamp - padding;

    applyNextPosition({
      x: clampValue(rawX, minX, maxX),
      y: clampValue(rawY, minY, maxY),
    });
  };

  useEffect(() => {
    if (!withCursorMask || !trackPointerOnDocument) {
      return undefined;
    }

    const handleMouseMove = (event: MouseEvent) => {
      updateFromClientPoint(event.clientX, event.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [trackPointerOnDocument, withCursorMask]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (trackPointerOnDocument) {
      return;
    }

    if (!withCursorMask || !isActive) {
      return;
    }

    updateFromClientPoint(event.clientX, event.clientY);
  };

  const handlePointerEnter = () => {
    if (activation === 'hover' || activation === 'pointer') {
      setActive(true);
    }
  };

  const handlePointerLeave = () => {
    if (activation === 'hover' || activation === 'pointer') {
      setActive(false);
    }
  };

  const handleFocus = () => {
    if (activation === 'focus') {
      setActive(true);
    }
  };

  const handleBlur = () => {
    if (activation === 'focus') {
      setActive(false);
    }
  };

  const radiusXValue = typeof maskRadiusX === 'number' ? rem(maskRadiusX) : maskRadiusX;
  const radiusYValue = typeof maskRadiusY === 'number' ? rem(maskRadiusY) : maskRadiusY;
  const radiusValue = typeof maskRadius === 'number' ? rem(maskRadius) : maskRadius;

  const resolvedRadiusX = radiusXValue ?? radiusValue;
  const resolvedRadiusY = radiusYValue ?? radiusValue;

  const angleDegrees = parseAngleDegrees(maskAngle, 90);
  const angleValue =
    typeof maskAngle === 'number'
      ? `${maskAngle}deg`
      : typeof maskAngle === 'string'
        ? /[a-z%]/i.test(maskAngle.trim())
          ? maskAngle.trim()
          : `${maskAngle.trim()}deg`
        : '90deg';
  const { width: containerWidth, height: containerHeight } = containerSizeRef.current;

  const linearPoint = withCursorMask
    ? { x: smoothPosition.x, y: smoothPosition.y }
    : {
        x: (containerWidth * (maskX ?? 50)) / 100,
        y: (containerHeight * (maskY ?? 50)) / 100,
      };
  const linearCenter = getLinearCenterPercent(linearPoint.x, linearPoint.y, containerWidth, containerHeight, angleDegrees);

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
            '--mask-linear-radius': radiusValue,
            '--mask-angle': angleValue,
            '--mask-linear-center': `${linearCenter}%`,
            ...maskVariables,
          },
        })}
        data-variant={variant}
        data-invert={invertMask}
        data-active={isActive}
      >
        {children}
      </div>
    </Box>
  );
});

Mask.classes = classes;
Mask.displayName = 'Mask';

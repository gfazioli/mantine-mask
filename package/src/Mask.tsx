import React, { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  createVarsResolver,
  factory,
  getBaseValue,
  getRadius,
  StylesApiProps,
  useProps,
  useRandomClassName,
  useStyles,
  type BoxProps,
  type Factory,
  type MantineRadius,
  type StyleProp,
} from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import {
  clampValue,
  generateSmoothedLinearGradient,
  generateSmoothedRadialGradient,
  getLinearCenterPercent,
  normalizeFeather,
  parseAngleDegrees,
} from './lib';
import { MaskGroup, useMaskGroupContext } from './MaskGroup';
import { MaskMediaVariables } from './MaskMediaVariables';
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

  /** Radius of the mask. Accepts numbers (px) or any CSS length unit. Supports responsive object. @default 240 */
  maskRadius?: StyleProp<number | string>;

  /** Horizontal radius of the mask. If set, it overrides `maskRadius` on X axis. Supports responsive object. */
  maskRadiusX?: StyleProp<number | string>;

  /** Vertical radius of the mask. If set, it overrides `maskRadius` on Y axis. Supports responsive object. */
  maskRadiusY?: StyleProp<number | string>;

  /** Invert mask: hide center and show outside. @default false */
  invertMask?: boolean;

  /** Cursor offset on X axis (px) when `withCursorMask` is true. @default 0 */
  cursorOffsetX?: number;

  /** Cursor offset on Y axis (px) when `withCursorMask` is true. @default 0 */
  cursorOffsetY?: number;

  /** Constrain cursor-follow mask to stay inside container bounds when possible. @default false */
  clampToBounds?: boolean;

  /** Extra padding (px) applied when `clampToBounds` is enabled. @default 0 */
  clampPadding?: number;

  /** Recenter the mask when container size changes. @default false */
  recenterOnResize?: boolean;

  /** Recenter the mask when children change. @default false */
  recenterOnChildrenChange?: boolean;

  /** Controls when the cursor mask is active. When set to anything other than 'always',
   * the component maintains a Box wrapper even when inactive to handle activation events.
   * @default 'always'
   */
  activation?: MaskActivation;

  /** Controlled active state. When provided, it overrides `activation`.
   * When false, only children are rendered without the mask effect (a Box wrapper is kept if activation !== 'always').
   */
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

  /**
   * CSS transition applied to the mask when `active` changes.
   * Accepts any valid CSS transition value (e.g. `'opacity 300ms ease'`).
   * When set, the mask fades in/out instead of appearing/disappearing instantly.
   */
  maskTransition?: string;

  /** Called with the current spotlight position `{ x, y }` whenever it changes. */
  onPositionChange?: (position: { x: number; y: number }) => void;

  /** Enable smoothed gradient transitions using eased multi-stop gradients.
   * Eliminates the hard edge / bright ring artifact in both radial and linear variants.
   * @default false
   */
  maskSmoothing?: boolean;

  /** Border radius
   * @default 0
   */
  radius?: MantineRadius | (string & {}) | number;
}

export type MaskFactory = Factory<{
  props: MaskProps;
  ref: HTMLDivElement;
  stylesNames: MaskStylesNames;
  variant: MaskVariant;
  vars: MaskCssVariables;
  staticComponents: {
    Group: typeof MaskGroup;
  };
}>;

const defaultProps: Partial<MaskProps> = {
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
  maskTransition: undefined,
  onPositionChange: undefined,
  maskSmoothing: false,
  radius: 0,
};

const varsResolver = createVarsResolver<MaskFactory>(
  (_, { radius, maskTransparencyEnd, maskTransparencyStart, maskFeather, maskOpacity }) => {
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
        '--mask-opacity': maskOpacity?.toString(),
      },
    };
  }
);

export const Mask = factory<MaskFactory>((_props) => {
  const { ref, ...restProps } = _props as typeof _props & { ref?: React.Ref<HTMLDivElement> };
  const props = useProps('Mask', defaultProps, restProps);

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
    maskTransition,
    onPositionChange,
    maskSmoothing,

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

  const groupContext = useMaskGroupContext();
  const responsiveClassName = useRandomClassName();

  const maskRadiusBase = getBaseValue(maskRadius) ?? 240;
  const maskRadiusXBase = getBaseValue(maskRadiusX);
  const maskRadiusYBase = getBaseValue(maskRadiusY);

  const containerRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRef(containerRef, ref);

  const containerSizeRef = useRef({ width: 0, height: 0 });

  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });

  const initialStaticX = maskX ?? 50;
  const initialStaticY = maskY ?? 50;
  const [staticSmoothPosition, setStaticSmoothPosition] = useState({
    x: initialStaticX,
    y: initialStaticY,
  });
  const staticTargetRef = useRef({ x: initialStaticX, y: initialStaticY });

  const [uncontrolledActive, setUncontrolledActive] = useState(activation === 'always');
  const isActive = active ?? (activation === 'always' ? true : uncontrolledActive);

  staticTargetRef.current = { x: maskX ?? 50, y: maskY ?? 50 };

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
  }, [recenterOnResize, active]);

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
  }, [recenterOnChildrenChange, active]);

  useEffect(() => {
    if (!withCursorMask || !isActive || animation !== 'lerp') {
      return undefined;
    }

    let animationFrame = 0;
    const animate = () => {
      setSmoothPosition((prev) => {
        const dx = cursorPosition.x - prev.x;
        const dy = cursorPosition.y - prev.y;

        const nextX = Math.round(prev.x + dx * (easing ?? 0.15));
        const nextY = Math.round(prev.y + dy * (easing ?? 0.15));

        if (nextX === prev.x && nextY === prev.y) {
          return prev;
        }

        return {
          x: nextX,
          y: nextY,
        };
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [animation, cursorPosition.x, cursorPosition.y, easing, isActive, withCursorMask]);

  useEffect(() => {
    if (withCursorMask || animation !== 'none') {
      return;
    }

    setStaticSmoothPosition({ x: staticTargetRef.current.x, y: staticTargetRef.current.y });
  }, [animation, maskX, maskY, withCursorMask]);

  useEffect(() => {
    if (withCursorMask || !isActive || animation !== 'lerp') {
      return undefined;
    }

    let animationFrame = 0;

    const animate = () => {
      setStaticSmoothPosition((prev) => {
        const dx = staticTargetRef.current.x - prev.x;
        const dy = staticTargetRef.current.y - prev.y;

        const nextX = Number((prev.x + dx * (easing ?? 0.15)).toFixed(3));
        const nextY = Number((prev.y + dy * (easing ?? 0.15)).toFixed(3));

        if (nextX === prev.x && nextY === prev.y) {
          return prev;
        }

        return { x: nextX, y: nextY };
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [animation, easing, isActive, maskX, maskY, withCursorMask]);

  // Notify position changes
  useEffect(() => {
    if (!onPositionChange) {
      return;
    }

    if (withCursorMask) {
      onPositionChange({ x: smoothPosition.x, y: smoothPosition.y });
    } else {
      onPositionChange({
        x: animation === 'lerp' ? staticSmoothPosition.x : (maskX ?? 50),
        y: animation === 'lerp' ? staticSmoothPosition.y : (maskY ?? 50),
      });
    }
  }, [
    onPositionChange,
    smoothPosition.x,
    smoothPosition.y,
    staticSmoothPosition.x,
    staticSmoothPosition.y,
    withCursorMask,
    animation,
    maskX,
    maskY,
  ]);

  const applyNextPosition = (next: { x: number; y: number }) => {
    if (animation === 'none') {
      setCursorPosition(next);
      setSmoothPosition(next);
    } else {
      setCursorPosition(next);
    }
  };

  const updateFromClientPoint = useCallback(
    (clientX: number, clientY: number) => {
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

      const radiusXNumber =
        typeof maskRadiusXBase === 'number'
          ? maskRadiusXBase
          : typeof maskRadiusBase === 'number'
            ? maskRadiusBase
            : undefined;
      const radiusYNumber =
        typeof maskRadiusYBase === 'number'
          ? maskRadiusYBase
          : typeof maskRadiusBase === 'number'
            ? maskRadiusBase
            : undefined;

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
    },
    [
      animation,
      clampToBounds,
      clampPadding,
      cursorOffsetX,
      cursorOffsetY,
      maskRadiusBase,
      maskRadiusXBase,
      maskRadiusYBase,
      trackPointerOnDocument,
    ]
  );

  useEffect(() => {
    if (!withCursorMask || !trackPointerOnDocument) {
      return undefined;
    }

    const handleMouseMove = (event: MouseEvent) => {
      updateFromClientPoint(event.clientX, event.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [trackPointerOnDocument, updateFromClientPoint, withCursorMask]);

  // Consume group context position when inside a Mask.Group
  useEffect(() => {
    if (!groupContext || !withCursorMask || !isActive) {
      return;
    }

    if (groupContext.pointerInside) {
      updateFromClientPoint(groupContext.clientX, groupContext.clientY);
    }
  }, [
    groupContext?.clientX,
    groupContext?.clientY,
    groupContext?.pointerInside,
    withCursorMask,
    isActive,
    updateFromClientPoint,
  ]);

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
        x: (containerWidth * (animation === 'lerp' ? staticSmoothPosition.x : (maskX ?? 50))) / 100,
        y:
          (containerHeight * (animation === 'lerp' ? staticSmoothPosition.y : (maskY ?? 50))) / 100,
      };
  const linearCenter = getLinearCenterPercent(
    linearPoint.x,
    linearPoint.y,
    containerWidth,
    containerHeight,
    angleDegrees
  );

  const maskVariables: CSSProperties = withCursorMask
    ? ({
        '--mask-x': `${smoothPosition.x}px`,
        '--mask-y': `${smoothPosition.y}px`,
      } as CSSProperties)
    : ({
        '--mask-x': `${animation === 'lerp' ? staticSmoothPosition.x : maskX}%`,
        '--mask-y': `${animation === 'lerp' ? staticSmoothPosition.y : maskY}%`,
      } as CSSProperties);

  // When activation is not 'always', we need the Box container to handle events
  const needsContainer = activation !== 'always';
  const hasTransition = !!maskTransition;

  const transitionStyle: CSSProperties | undefined = hasTransition
    ? ({ '--mask-transition': maskTransition } as CSSProperties)
    : undefined;

  // Compute smoothed gradient when maskSmoothing is enabled
  const hasFeather = maskFeather !== undefined;
  const featherPercent = hasFeather ? normalizeFeather(maskFeather) : undefined;
  const computedStart = hasFeather ? 100 - (featherPercent ?? 0) : (maskTransparencyStart ?? 0);
  const computedEnd = hasFeather ? 100 : (maskTransparencyEnd ?? 100);

  const maskRadiusBaseRem =
    typeof maskRadiusBase === 'number' ? `${maskRadiusBase / 16}rem` : String(maskRadiusBase);
  const maskRadiusXBaseRem = maskRadiusXBase
    ? typeof maskRadiusXBase === 'number'
      ? `${maskRadiusXBase / 16}rem`
      : String(maskRadiusXBase)
    : maskRadiusBaseRem;
  const maskRadiusYBaseRem = maskRadiusYBase
    ? typeof maskRadiusYBase === 'number'
      ? `${maskRadiusYBase / 16}rem`
      : String(maskRadiusYBase)
    : maskRadiusBaseRem;

  let smoothingStyle: CSSProperties | undefined;

  if (maskSmoothing) {
    const xPos = withCursorMask
      ? `${smoothPosition.x}px`
      : `${animation === 'lerp' ? staticSmoothPosition.x : maskX}%`;
    const yPos = withCursorMask
      ? `${smoothPosition.y}px`
      : `${animation === 'lerp' ? staticSmoothPosition.y : maskY}%`;

    let gradientValue: string;

    if (variant === 'linear') {
      // For linear, solidSize and fadeSize match the CSS calc logic
      const solidSize = `calc(${maskRadiusBaseRem} * ${computedStart / 100})`;
      const fadeSize = `calc(${maskRadiusBaseRem} * ${computedEnd / 100})`;

      gradientValue = generateSmoothedLinearGradient({
        angle: angleValue,
        center: `${linearCenter}%`,
        solidSize,
        fadeSize,
        invert: !!invertMask,
      });
    } else {
      gradientValue = generateSmoothedRadialGradient({
        shape: 'ellipse',
        radiusX: maskRadiusXBaseRem,
        radiusY: maskRadiusYBaseRem,
        x: xPos,
        y: yPos,
        start: computedStart,
        end: computedEnd,
        invert: !!invertMask,
      });
    }

    smoothingStyle = {
      WebkitMaskImage: gradientValue,
      maskImage: gradientValue,
    } as CSSProperties;
  }

  const maskContent = (
    <div
      {...getStyles('mask', {
        style: {
          '--mask-angle': angleValue,
          '--mask-linear-center': `${linearCenter}%`,
          ...maskVariables,
          ...transitionStyle,
          ...smoothingStyle,
        },
      })}
      data-variant={!maskSmoothing ? variant : undefined}
      data-invert={!maskSmoothing ? invertMask : undefined}
      data-active={isActive ? undefined : false}
    >
      {children}
    </div>
  );

  // Always render maskContent when needsContainer to keep DOM structure stable (no layout shift).
  // The mask effect is controlled via data-active and CSS opacity.
  const shouldRenderMask = isActive || hasTransition || needsContainer;

  if (shouldRenderMask) {
    return (
      <>
        <MaskMediaVariables
          maskRadius={maskRadius}
          maskRadiusX={maskRadiusX}
          maskRadiusY={maskRadiusY}
          selector={`.${responsiveClassName}`}
        />
        <Box
          ref={mergedRef}
          {...getStyles('root', { className: responsiveClassName })}
          data-with-cursor={withCursorMask}
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          tabIndex={activation === 'focus' ? (tabIndex ?? 0) : tabIndex}
          {...others}
        >
          {maskContent}
        </Box>
      </>
    );
  }

  // activation='always' but active controlled to false, just return children
  return children ? <>{children}</> : null;
});

Mask.classes = classes;
Mask.displayName = 'Mask';
Mask.Group = MaskGroup;

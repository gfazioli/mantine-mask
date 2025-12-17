import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import {
  Box,
  factory,
  rem,
  StylesApiProps,
  useMantineTheme,
  useProps,
  type BoxProps,
  type Factory,
} from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import classes from './Mask.module.css';

export type MaskStylesNames = 'root';

export type MaskCssVariables = {
  root: '--mask-radius';
};

export interface MaskProps extends BoxProps, StylesApiProps<MaskFactory> {
  children?: React.ReactNode;
  /** Enable cursor-follow mask. When false, the mask uses static coordinates. @default true */
  withCursorMask?: boolean;

  /** Horizontal position of the mask center in percentages when `withCursorMask` is false. @default 50 */
  maskX?: number;

  /** Vertical position of the mask center in percentages when `withCursorMask` is false. @default 50 */
  maskY?: number;

  /** Radius of the mask. Accepts numbers (px) or any CSS length unit. @default 240 */
  maskRadius?: number | string;

  /** Background color for the masked surface. @default theme.colors.dark[8] */
  maskBackground?: string;
}

export type MaskFactory = Factory<{
  props: MaskProps;
  ref: HTMLDivElement;
  stylesNames: MaskStylesNames;
  vars: MaskCssVariables;
}>;

export const defaultProps: Partial<MaskProps> = {
  maskRadius: 240,
};

export const Mask = factory<MaskFactory>((_props, ref) => {
  const props = useProps('Mask', defaultProps, _props);

  const {
    withCursorMask = true,
    maskX = 50,
    maskY = 50,
    maskRadius,
    maskBackground,
    children,

    classNames,
    style,
    styles,
    unstyled,
    vars,
    className,

    ...others
  } = props;

  const theme = useMantineTheme();
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
        const easing = 0.12;

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
    <Box
      ref={mergedRef}
      className={[classes.root, className].filter(Boolean).join(' ')}
      style={{
        '--mask-radius': radiusValue,
        '--mask-background': maskBackground ?? theme.colors.dark[8],
        ...maskVariables,
        ...style,
      }}
      data-with-cursor={withCursorMask}
      {...others}
    >
      <div className={classes.mask}>{children}</div>
    </Box>
  );
});

Mask.displayName = 'Mask';

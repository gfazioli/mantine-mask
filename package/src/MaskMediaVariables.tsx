import {
  filterProps,
  getBaseValue,
  getSortedBreakpoints,
  InlineStyles,
  keys,
  rem,
  useMantineTheme,
  type MantineBreakpoint,
  type StyleProp,
} from '@mantine/core';
import React from 'react';

interface MaskMediaVariablesProps {
  maskRadius?: StyleProp<number | string>;
  maskRadiusX?: StyleProp<number | string>;
  maskRadiusY?: StyleProp<number | string>;
  selector: string;
}

function toRemValue(value: number | string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return typeof value === 'number' ? rem(value) : value;
}

export function MaskMediaVariables({
  maskRadius,
  maskRadiusX,
  maskRadiusY,
  selector,
}: MaskMediaVariablesProps) {
  const theme = useMantineTheme();

  const baseRadiusValue = toRemValue(getBaseValue(maskRadius));
  const baseRadiusXValue = toRemValue(getBaseValue(maskRadiusX));
  const baseRadiusYValue = toRemValue(getBaseValue(maskRadiusY));

  const baseStyles: Record<string, string | undefined> = filterProps({
    '--mask-radial-radius': baseRadiusValue,
    '--mask-radial-radius-x': baseRadiusXValue ?? baseRadiusValue,
    '--mask-radial-radius-y': baseRadiusYValue ?? baseRadiusValue,
    '--mask-linear-radius': baseRadiusValue,
  });

  const queries = keys(theme.breakpoints).reduce<Record<string, Record<string, string>>>(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }

      const radiusAtBp =
        typeof maskRadius === 'object' ? toRemValue(maskRadius[breakpoint]) : undefined;
      const radiusXAtBp =
        typeof maskRadiusX === 'object' ? toRemValue(maskRadiusX[breakpoint]) : undefined;
      const radiusYAtBp =
        typeof maskRadiusY === 'object' ? toRemValue(maskRadiusY[breakpoint]) : undefined;

      if (radiusAtBp) {
        acc[breakpoint]['--mask-radial-radius'] = radiusAtBp;
        acc[breakpoint]['--mask-linear-radius'] = radiusAtBp;
      }

      if (radiusXAtBp || radiusAtBp) {
        acc[breakpoint]['--mask-radial-radius-x'] = radiusXAtBp ?? radiusAtBp!;
      }

      if (radiusYAtBp || radiusAtBp) {
        acc[breakpoint]['--mask-radial-radius-y'] = radiusYAtBp ?? radiusAtBp!;
      }

      return acc;
    },
    {}
  );

  const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme.breakpoints).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );

  const media = sortedBreakpoints.map((breakpoint) => ({
    query: `(min-width: ${theme.breakpoints[breakpoint.value as MantineBreakpoint]})`,
    styles: queries[breakpoint.value],
  }));

  return <InlineStyles styles={baseStyles} media={media} selector={selector} />;
}

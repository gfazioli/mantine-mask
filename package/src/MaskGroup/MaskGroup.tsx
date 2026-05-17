import {
  Box,
  factory,
  StylesApiProps,
  useProps,
  useStyles,
  type BoxProps,
  type Factory,
} from '@mantine/core';
import React, { useCallback, useRef, useState } from 'react';
import { MaskGroupContext } from './MaskGroup.context';
import classes from './MaskGroup.module.css';

export type MaskGroupStylesNames = 'root';

export type MaskGroupCssVariables = {
  root: never;
};

export interface MaskGroupProps extends BoxProps, StylesApiProps<MaskGroupFactory> {
  /** Children — typically multiple `<Mask>` components */
  children?: React.ReactNode;
}

export type MaskGroupFactory = Factory<{
  props: MaskGroupProps;
  ref: HTMLDivElement;
  stylesNames: MaskGroupStylesNames;
  vars: MaskGroupCssVariables;
}>;

const defaultProps: Partial<MaskGroupProps> = {};

export const MaskGroup = factory<MaskGroupFactory>((_props) => {
  const props = useProps('MaskGroup', defaultProps, _props);
  const { children, classNames, style, styles, unstyled, vars, className, ...others } = props;

  const getStyles = useStyles<MaskGroupFactory>({
    name: 'MaskGroup',
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
  });

  const [position, setPosition] = useState({ clientX: 0, clientY: 0 });
  const [pointerInside, setPointerInside] = useState(false);
  const rafRef = useRef(0);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setPosition({ clientX: event.clientX, clientY: event.clientY });
    });
  }, []);

  const handlePointerEnter = useCallback(() => {
    setPointerInside(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setPointerInside(false);
  }, []);

  return (
    <MaskGroupContext.Provider value={{ ...position, pointerInside }}>
      <Box
        {...getStyles('root')}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...others}
      >
        {children}
      </Box>
    </MaskGroupContext.Provider>
  );
});

MaskGroup.classes = classes;
MaskGroup.displayName = 'MaskGroup';

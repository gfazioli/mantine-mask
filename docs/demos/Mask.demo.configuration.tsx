import { Mask, type MaskProps } from '@gfazioli/mantine-mask';
import { Flex, Image } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: MaskProps) {
  return (
    <Flex>
      <Mask {...props}>
        <Image
          src="https://images.unsplash.com/photo-1712705155129-0470455233c8?q=80&w=1587&auto=format&fit=crop"
          alt="Before"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Mask>
    </Flex>
  );
}

const code = `
import { Mask, type MaskProps } from '@gfazioli/mantine-mask';
import { Image } from '@mantine/core';

function Demo(props: MaskProps) {
  return (
    <Mask{{props}}>
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}
`;

export const configuration: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  controls: [
    {
      type: 'boolean',
      prop: 'withCursorMask',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'trackPointerOnDocument',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'select',
      prop: 'activation',
      initialValue: 'always',
      libraryValue: 'always',
      data: [
        { value: 'always', label: 'Always' },
        { value: 'hover', label: 'Hover' },
        { value: 'focus', label: 'Focus' },
        { value: 'pointer', label: 'Pointer' },
      ],
    },
    {
      type: 'segmented',
      prop: 'animation',
      initialValue: 'lerp',
      libraryValue: 'lerp',
      data: [
        { value: 'lerp', label: 'Lerp' },
        { value: 'none', label: 'None' },
      ],
    },
    {
      type: 'number',
      prop: 'maskAngle',
      label: 'maskAngle (linear variant only)',
      initialValue: 90,
      libraryValue: 90,
      min: 0,
      max: 360,
      step: 1,
    } as any,
    {
      type: 'segmented',
      prop: 'variant',
      initialValue: 'radial',
      libraryValue: 'radial',
      data: [
        { value: 'radial', label: 'Radial' },
        { value: 'linear', label: 'Linear' },
      ],
    },
    {
      type: 'number',
      prop: 'maskRadiusX',
      initialValue: 160,
      libraryValue: undefined,
      min: 0,
      max: 800,
      step: 1,
    },
    {
      type: 'number',
      prop: 'maskRadiusY',
      initialValue: 160,
      libraryValue: undefined,
      min: 0,
      max: 800,
      step: 1,
    },
    {
      type: 'number',
      prop: 'maskX',
      initialValue: 50,
      libraryValue: 50,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      type: 'number',
      prop: 'maskY',
      initialValue: 50,
      libraryValue: 50,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      type: 'number',
      prop: 'maskTransparencyStart',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      type: 'number',
      prop: 'maskTransparencyEnd',
      initialValue: 100,
      libraryValue: 100,
      min: 0,
      max: 100,
      step: 1,
    },
    {
      type: 'number',
      prop: 'maskOpacity',
      initialValue: 1,
      libraryValue: 1,
      min: 0,
      max: 1,
      step: 0.05,
    },
    {
      type: 'number',
      prop: 'easing',
      initialValue: 0.12,
      libraryValue: 0.12,
      min: 0,
      max: 0.5,
      step: 0.01,
    },
    {
      type: 'number',
      prop: 'cursorOffsetX',
      initialValue: 0,
      libraryValue: 0,
      min: -200,
      max: 200,
      step: 1,
    },
    {
      type: 'number',
      prop: 'cursorOffsetY',
      initialValue: 0,
      libraryValue: 0,
      min: -200,
      max: 200,
      step: 1,
    },
    {
      type: 'boolean',
      prop: 'clampToBounds',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'number',
      prop: 'clampPadding',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 200,
      step: 1,
    },
    {
      type: 'boolean',
      prop: 'recenterOnResize',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'recenterOnChildrenChange',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'boolean',
      prop: 'invertMask',
      initialValue: false,
      libraryValue: false,
    },
    {
      type: 'color',
      prop: 'bg',
      initialValue: 'transparent',
      libraryValue: 'transparent',
    },
  ],
};

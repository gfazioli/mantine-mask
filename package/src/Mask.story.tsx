import React from 'react';
import { Image, Paper, Text } from '@mantine/core';
import { Mask, type MaskProps } from './Mask';

export default {
  title: 'Mask',
  args: {
    variant: 'radial',
    maskAngle: 90,
    radius: 0,
    withCursorMask: false,
    trackPointerOnDocument: false,
    maskX: 50,
    maskY: 50,
    maskRadius: 240,
    maskRadiusX: undefined,
    maskRadiusY: undefined,
    maskOpacity: 1,
    maskTransparencyStart: 0,
    maskTransparencyEnd: 100,
    maskFeather: undefined,
    easing: 0.12,
    animation: 'lerp',
    invertMask: false,
    cursorOffsetX: 0,
    cursorOffsetY: 0,
    clampToBounds: true,
    clampPadding: 0,
    recenterOnResize: false,
    recenterOnChildrenChange: false,
    activation: 'always',
    active: undefined,
  },
  argTypes: {
    variant: { control: { type: 'select' }, options: ['radial', 'linear'] },
    maskAngle: { control: { type: 'range', min: 0, max: 360, step: 1 } },
    withCursorMask: { control: 'boolean' },
    trackPointerOnDocument: { control: 'boolean' },
    maskX: { control: { type: 'range', min: -100, max: 100, step: 1 } },
    maskY: { control: { type: 'range', min: -100, max: 100, step: 1 } },
    maskRadius: { control: { type: 'range', min: 0, max: 2048, step: 1 } },
    maskRadiusX: { control: { type: 'range', min: 0, max: 2048, step: 1 } },
    maskRadiusY: { control: { type: 'range', min: 0, max: 2048, step: 1 } },
    radius: { control: { type: 'range', min: 0, max: 2048, step: 1 } },

    easing: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    maskOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    maskTransparencyStart: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    maskTransparencyEnd: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    maskFeather: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    invertMask: { control: 'boolean' },
    animation: { control: { type: 'select' }, options: ['lerp', 'none'] },
    cursorOffsetX: { control: { type: 'range', min: -300, max: 300, step: 1 } },
    cursorOffsetY: { control: { type: 'range', min: -300, max: 300, step: 1 } },
    clampToBounds: { control: 'boolean' },
    clampPadding: { control: { type: 'range', min: 0, max: 200, step: 1 } },
    recenterOnResize: { control: 'boolean' },
    recenterOnChildrenChange: { control: 'boolean' },
    activation: { control: { type: 'select' }, options: ['always', 'hover', 'focus', 'pointer'] },
    active: { control: 'boolean' },
  },
};

function SampleContent() {
  return (
    <Paper p="lg" withBorder shadow="md">
      <Text fw={700} fz="lg">
        Spotlight content
      </Text>
      <Text c="dimmed" mt="xs">
        Move your cursor to see the mask follow the pointer. You can also switch to static coordinates.
      </Text>
    </Paper>
  );
}

export function Usage() {
  return (
    <Mask>
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}

export function WithProps(props: MaskProps) {
  return (
    <Mask {...props} bg="black">
      <Image
        src="https://docs.once-ui.com/_next/image?url=%2Fimages%2Fdocs%2Fvibe-coding-dark.jpg&w=1920&q=75"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}

export function LinearDisable(props: MaskProps) {
  return (
    <Mask {...props} bg="black" variant="linear" maskAngle={0} maskY={0} recenterOnResize>
      <Image
        src="https://docs.once-ui.com/_next/image?url=%2Fimages%2Fdocs%2Fvibe-coding-dark.jpg&w=1920&q=75"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}

export function CursorMask() {
  return (
    <Mask withCursorMask>
      <Image
        src="https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}

export function StaticMask() {
  return (
    <Mask withCursorMask={false} maskX={30} maskY={30}>
      <SampleContent />
    </Mask>
  );
}

export function CustomRadius() {
  return (
    <Mask withCursorMask maskRadius={200}>
      <SampleContent />
    </Mask>
  );
}

export function EllipticalMask() {
  return (
    <Mask withCursorMask maskRadiusX={320} maskRadiusY={140}>
      <SampleContent />
    </Mask>
  );
}

export function InvertedMask() {
  return (
    <Mask withCursorMask invertMask maskRadius={220}>
      <Image
        src="https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}

export function Reveal() {
  return (
    <Mask
      withCursorMask
      maskRadius={120}
      maskFeather={0}
      bg="url('https://images.unsplash.com/photo-1542749191-320c458c8435?w=800&auto=format&fit=crop') center/cover no-repeat"
    >
      <Image
        src="https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}

export function Zoom() {
  return (
    <Mask
      withCursorMask
      maskRadius={120}
      maskFeather={0}
      bg="url('https://images.unsplash.com/photo-1542749191-320c458c8435?w=800&auto=format&fit=cover') center no-repeat"
    >
      <Image
        src="https://images.unsplash.com/photo-1542749191-320c458c8435?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}

export function HoverActivation() {
  return (
    <Mask withCursorMask activation="hover" maskRadius={240}>
      <SampleContent />
    </Mask>
  );
}

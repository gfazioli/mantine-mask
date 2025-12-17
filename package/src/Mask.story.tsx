import React from 'react';
import { Image, Paper, Text } from '@mantine/core';
import { Mask, type MaskProps } from './Mask';

export default {
  title: 'Mask',
  args: {
    radius: 0,
    withCursorMask: false,
    maskX: 50,
    maskY: 50,
    maskRadius: 240,
    maskOpacity: 1,
    maskTransparencyStart: 0,
    maskTransparencyEnd: 100,
    easing: 0.12,
  },
  argTypes: {
    withCursorMask: { control: 'boolean' },
    maskX: { control: { type: 'range', min: -100, max: 100, step: 1 } },
    maskY: { control: { type: 'range', min: -100, max: 100, step: 1 } },
    maskRadius: { control: { type: 'range', min: 0, max: 2048, step: 1 } },
    radius: { control: { type: 'range', min: 0, max: 2048, step: 1 } },

    easing: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    maskOpacity: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    maskTransparencyStart: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    maskTransparencyEnd: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
};

function SampleContent() {
  return (
    <Paper p="lg" withBorder shadow="md">
      <Text fw={700} fz="lg">
        Spotlight content
      </Text>
      <Text c="dimmed" mt="xs">
        Move your cursor to see the mask follow the pointer. You can also switch to static
        coordinates.
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
    <Mask {...props}>
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
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
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}

export function StaticMask() {
  return (
    <Mask p="md" withCursorMask={false} maskX={30} maskY={30}>
      <SampleContent />
    </Mask>
  );
}

export function CustomRadius() {
  return (
    <Mask p="md" withCursorMask maskRadius={200}>
      <SampleContent />
    </Mask>
  );
}

export function CustomBackground() {
  return (
    <Mask p="md" withCursorMask>
      <SampleContent />
    </Mask>
  );
}

import React from 'react';
import { Box, Text } from '@mantine/core';
import { Mask } from './Mask';

export default {
  title: 'Mask',
  args: {},
  argTypes: {},
};

function SampleContent() {
  return (
    <Box p="lg">
      <Text fw={700} fz="lg">
        Spotlight content
      </Text>
      <Text c="dimmed" mt="xs">
        Move your cursor to see the mask follow the pointer. You can also switch to static
        coordinates.
      </Text>
    </Box>
  );
}

export function CursorMask() {
  return (
    <Mask p="md" withCursorMask maskRadius={360}>
      <SampleContent />
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
    <Mask p="md" withCursorMask maskBackground="var(--mantine-color-indigo-9)">
      <SampleContent />
    </Mask>
  );
}

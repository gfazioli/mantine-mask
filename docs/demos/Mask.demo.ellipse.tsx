import { Mask } from '@gfazioli/mantine-mask';
import { Box, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Mask p="md" withCursorMask maskRadiusX={420} maskRadiusY={180}>
      <Box p="lg">
        <Text fw={600}>Elliptical mask</Text>
        <Text c="dimmed">Use maskRadiusX / maskRadiusY to create an ellipse.</Text>
      </Box>
    </Mask>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-mask';
import { Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask p="md" withCursorMask maskRadiusX={420} maskRadiusY={180}>
      <Box p="lg">
        <Text fw={600}>Elliptical mask</Text>
        <Text c="dimmed">Use maskRadiusX / maskRadiusY to create an ellipse.</Text>
      </Box>
    </Mask>
  );
}
`;

export const maskEllipse: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};

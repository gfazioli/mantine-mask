import { Mask } from '@gfazioli/mantine-mask';
import { Box, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Mask p="md" withCursorMask invertMask maskRadius={240}>
      <Box p="lg">
        <Text fw={600}>Inverted mask</Text>
        <Text c="dimmed">Hide the center and reveal the outside area.</Text>
      </Box>
    </Mask>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-mask';
import { Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask p="md" withCursorMask invertMask maskRadius={240}>
      <Box p="lg">
        <Text fw={600}>Inverted mask</Text>
        <Text c="dimmed">Hide the center and reveal the outside area.</Text>
      </Box>
    </Mask>
  );
}
`;

export const maskInvert: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};

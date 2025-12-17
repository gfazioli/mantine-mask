import { Mask } from '@gfazioli/mantine-mask';
import { Box, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Mask p="md" withCursorMask activation="hover" maskRadius={280}>
      <Box p="lg">
        <Text fw={600}>Hover activation</Text>
        <Text c="dimmed">The mask is active only on hover.</Text>
      </Box>
    </Mask>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-mask';
import { Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask p="md" withCursorMask activation="hover" maskRadius={280}>
      <Box p="lg">
        <Text fw={600}>Hover activation</Text>
        <Text c="dimmed">The mask is active only on hover.</Text>
      </Box>
    </Mask>
  );
}
`;

export const maskActivation: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};

import { Mask } from '@gfazioli/mantine-json-tree';
import { MantineDemo } from '@mantinex/demo';
import { Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask p="md" withCursorMask maskRadius={180}>
      <Box p="lg">
        <Text fw={600}>Custom radius</Text>
        <Text c="dimmed">Mask radius set to 180px.</Text>
      </Box>
    </Mask>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-json-tree';
import { Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask p="md" withCursorMask maskRadius={180}>
      <Box p="lg">
        <Text fw={600}>Custom radius</Text>
        <Text c="dimmed">Mask radius set to 180px.</Text>
      </Box>
    </Mask>
  );
}
`;

export const maskRadius: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};

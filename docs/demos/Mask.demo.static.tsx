import { Mask } from '@gfazioli/mantine-json-tree';
import { MantineDemo } from '@mantinex/demo';
import { Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask p="md" withCursorMask={false} maskX={25} maskY={35}>
      <Box p="lg">
        <Text fw={600}>Static spotlight</Text>
        <Text c="dimmed">Mask origin is pinned at 25% / 35%.</Text>
      </Box>
    </Mask>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-json-tree';
import { Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask p="md" withCursorMask={false} maskX={25} maskY={35}>
      <Box p="lg">
        <Text fw={600}>Static spotlight</Text>
        <Text c="dimmed">Mask origin is pinned at 25% / 35%.</Text>
      </Box>
    </Mask>
  );
}
`;

export const maskStatic: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};

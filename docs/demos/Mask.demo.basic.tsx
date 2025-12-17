import { Mask } from '@gfazioli/mantine-mask';
import { Box, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Mask p="md" withCursorMask maskRadius={360}>
      <Box p="lg">
        <Text fw={700}>Cursor spotlight</Text>
        <Text c="dimmed">Move your cursor to focus any area.</Text>
      </Box>
    </Mask>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-mask';
import { Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask p="md" withCursorMask maskRadius={360}>
      <Box p="lg">
        <Text fw={700}>Cursor spotlight</Text>
        <Text c="dimmed">Move your cursor to focus any area.</Text>
      </Box>
    </Mask>
  );
}
`;

export const mask: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};

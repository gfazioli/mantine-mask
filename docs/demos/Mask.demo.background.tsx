import { Mask } from '@gfazioli/mantine-mask';
import { Box, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Mask p="md" withCursorMask maskBackground="linear-gradient(135deg, #1e3a8a, #312e81)">
      <Box p="lg">
        <Text fw={600} c="white">
          Custom background
        </Text>
        <Text c="white" opacity={0.8}>
          Background behind the mask uses a gradient.
        </Text>
      </Box>
    </Mask>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-mask';
import { Box, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask p="md" withCursorMask maskBackground="linear-gradient(135deg, #1e3a8a, #312e81)">
      <Box p="lg">
        <Text fw={600} c="white">
          Custom background
        </Text>
        <Text c="white" opacity={0.8}>
          Background behind the mask uses a gradient.
        </Text>
      </Box>
    </Mask>
  );
}
`;

export const maskBackground: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
};

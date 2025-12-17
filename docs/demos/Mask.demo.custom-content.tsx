import { Mask } from '@gfazioli/mantine-mask';
import { Box, Paper, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Mask withCursorMask maskRadius={240}>
      <Paper p="lg" withBorder shadow="md" bg="violet.2">
        <Text fw={700} fz="lg">
          Any content
        </Text>
        <Text c="dimmed" mt="xs">
          Mask can wrap any React node, not just images.
        </Text>
        <Box mt="md" h={6} w="60%" bg="orange.4" />
      </Paper>
    </Mask>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-mask';
import { Box, Paper, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask withCursorMask maskRadius={240}>
      <Paper p="lg" withBorder shadow="md" bg="violet.2">
        <Text fw={700} fz="lg">
          Any content
        </Text>
        <Text c="dimmed" mt="xs">
          Mask can wrap any React node, not just images.
        </Text>
        <Box mt="md" h={6} w="60%" bg="orange.4" />
      </Paper>
    </Mask>
  );
}
`;

export const maskCustomContent: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  defaultExpanded: false,
};

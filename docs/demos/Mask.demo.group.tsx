import { Mask } from '@gfazioli/mantine-mask';
import { Box, Image, Paper, SimpleGrid, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Mask.Group>
      <SimpleGrid cols={2}>
        <Mask withCursorMask maskRadius={120}>
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
            alt="Mountain"
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
          />
        </Mask>
        <Mask withCursorMask variant="linear" maskAngle={0} maskRadius={80}>
          <Image
            src="https://images.unsplash.com/photo-1519114056088-b877fe073a5e?w=800&auto=format&fit=crop"
            alt="Forest"
            style={{ width: '100%', height: 200, objectFit: 'cover' }}
          />
        </Mask>
        <Mask withCursorMask maskRadius={100} invertMask>
          <Box bg="blue.9" h={200} p="xl">
            <Text c="white" fw={700} fz="lg">
              Inverted mask
            </Text>
            <Text c="blue.2" fz="sm">
              The center is transparent, the outside is visible.
            </Text>
          </Box>
        </Mask>
        <Mask withCursorMask maskRadiusX={200} maskRadiusY={80} maskFeather={60}>
          <Paper bg="dark.6" h={200} p="xl" withBorder>
            <Text c="white" fw={700} fz="lg">
              Elliptical mask
            </Text>
            <Text c="dimmed" fz="sm">
              Wide horizontal spotlight with soft feathering.
            </Text>
          </Paper>
        </Mask>
      </SimpleGrid>
    </Mask.Group>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-mask';
import { Box, Image, Paper, SimpleGrid, Text } from '@mantine/core';

function Demo() {
  return (
    <Mask.Group>
      <SimpleGrid cols={2}>
        {/* Radial spotlight */}
        <Mask withCursorMask maskRadius={120}>
          <Image src="..." alt="Mountain" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
        </Mask>

        {/* Linear band */}
        <Mask withCursorMask variant="linear" maskAngle={0} maskRadius={80}>
          <Image src="..." alt="Forest" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
        </Mask>

        {/* Inverted radial */}
        <Mask withCursorMask maskRadius={100} invertMask>
          <Box bg="blue.9" h={200} p="xl">
            <Text c="white" fw={700} fz="lg">Inverted mask</Text>
            <Text c="blue.2" fz="sm">The center is transparent, the outside is visible.</Text>
          </Box>
        </Mask>

        {/* Elliptical with feathering */}
        <Mask withCursorMask maskRadiusX={200} maskRadiusY={80} maskFeather={60}>
          <Paper bg="dark.6" h={200} p="xl" withBorder>
            <Text c="white" fw={700} fz="lg">Elliptical mask</Text>
            <Text c="dimmed" fz="sm">Wide horizontal spotlight with soft feathering.</Text>
          </Paper>
        </Mask>
      </SimpleGrid>
    </Mask.Group>
  );
}
`;

export const maskGroup: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  defaultExpanded: false,
};

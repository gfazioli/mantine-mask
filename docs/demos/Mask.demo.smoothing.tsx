import { Mask } from '@gfazioli/mantine-mask';
import { Image, SimpleGrid, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <SimpleGrid cols={2}>
      <div>
        <Text fw={500} mb="xs" ta="center">
          Without smoothing
        </Text>
        <Mask maskRadius={120} maskTransparencyStart={70}>
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
            alt="Without"
            style={{ width: '100%', height: 300, objectFit: 'cover' }}
          />
        </Mask>
      </div>
      <div>
        <Text fw={500} mb="xs" ta="center">
          With smoothing
        </Text>
        <Mask maskSmoothing maskRadius={120} maskTransparencyStart={70}>
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
            alt="With"
            style={{ width: '100%', height: 300, objectFit: 'cover' }}
          />
        </Mask>
      </div>
    </SimpleGrid>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-mask';
import { Image, SimpleGrid, Text } from '@mantine/core';

function Demo() {
  return (
    <SimpleGrid cols={2}>
      <div>
        <Text fw={500} mb="xs" ta="center">Without smoothing</Text>
        <Mask maskRadius={120} maskTransparencyStart={70}>
          <Image src="..." style={{ width: '100%', height: 300, objectFit: 'cover' }} />
        </Mask>
      </div>
      <div>
        <Text fw={500} mb="xs" ta="center">With smoothing</Text>
        <Mask maskSmoothing maskRadius={120} maskTransparencyStart={70}>
          <Image src="..." style={{ width: '100%', height: 300, objectFit: 'cover' }} />
        </Mask>
      </div>
    </SimpleGrid>
  );
}
`;

export const maskSmoothingDemo: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  defaultExpanded: false,
};

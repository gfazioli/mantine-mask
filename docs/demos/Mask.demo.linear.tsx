import { Mask } from '@gfazioli/mantine-mask';
import { Image } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Mask variant="linear" withCursorMask maskAngle={35} maskRadius={180} maskFeather={35}>
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-mask';
import { Image } from '@mantine/core';

function Demo() {
  return (
    <Mask variant="linear" withCursorMask maskAngle={35} maskRadius={180} maskFeather={35}>
      <Image
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}
`;

export const maskLinear: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  defaultExpanded: false,
};

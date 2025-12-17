import { Mask } from '@gfazioli/mantine-mask';
import { Image } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Mask withCursorMask maskRadiusX={420} maskRadiusY={180}>
      <Image
        src="https://plus.unsplash.com/premium_photo-1661306437817-8ab34be91e0c?w=800&auto=format&fit=crop"
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
    <Mask withCursorMask maskRadiusX={420} maskRadiusY={180}>
      <Image
        src="https://plus.unsplash.com/premium_photo-1661306437817-8ab34be91e0c?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}
`;

export const maskEllipse: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  defaultExpanded: false,
};

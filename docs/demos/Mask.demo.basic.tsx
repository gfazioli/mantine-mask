import { Mask } from '@gfazioli/mantine-mask';
import { Image } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Mask withCursorMask maskRadius={360}>
      <Image
        src="https://images.unsplash.com/photo-1519114056088-b877fe073a5e?w=800&auto=format&fit=crop"
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
    <Mask withCursorMask maskRadius={360}>
      <Image
        src="https://images.unsplash.com/photo-1519114056088-b877fe073a5e?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}
`;

export const mask: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  defaultExpanded: false,
};

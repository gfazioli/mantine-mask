import { Mask } from '@gfazioli/mantine-mask';
import { Image } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Mask
      withCursorMask
      maskRadius={120}
      maskFeather={0}
      bg="url('https://images.unsplash.com/photo-1542749191-320c458c8435?w=800&auto=format&fit=crop') center/cover no-repeat"
    >
      <Image
        src="https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&auto=format&fit=crop"
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
    <Mask
      withCursorMask
      maskRadius={120}
      maskFeather={0}
      bg="url('https://images.unsplash.com/photo-1542749191-320c458c8435?w=800&auto=format&fit=crop') center/cover no-repeat"
    >
      <Image
        src="https://images.unsplash.com/photo-1476673160081-cf065607f449?w=800&auto=format&fit=crop"
        alt="Before"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </Mask>
  );
}
`;

export const maskReveal: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  defaultExpanded: false,
};

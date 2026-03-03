import { useState } from 'react';
import { Mask } from '@gfazioli/mantine-mask';
import { Image, Stack, Switch, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [bg, setBg] = useState(false);
  return (
    <Stack>
      <Mask withCursorMask invertMask maskRadius={240} bg={bg ? 'white' : undefined}>
        <Image
          src="https://images.unsplash.com/photo-1542875272-2037d53b5e4d?w=800&auto=format&fit=crop"
          alt="Before"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Mask>
      <Text>Try to change the dark mode</Text>
      <Switch
        label="Use background"
        checked={bg}
        onChange={(event) => setBg(event.currentTarget.checked)}
      />
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Mask } from '@gfazioli/mantine-mask';
import { Image } from '@mantine/core';

function Demo() {
  const [bg, setBg] = useState(false);
  return (
    <Stack>
      <Mask withCursorMask invertMask maskRadius={240} bg={bg ? 'white' : undefined}>
        <Image
          src="https://images.unsplash.com/photo-1542875272-2037d53b5e4d?w=800&auto=format&fit=crop"
          alt="Before"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Mask>
      <Text>Try to change the dark mode</Text>
      <Switch
        label="Use background"
        checked={bg}
        onChange={(event) => setBg(event.currentTarget.checked)}
      />
    </Stack>
  );
}
`;

export const maskInvert: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  defaultExpanded: false,
};

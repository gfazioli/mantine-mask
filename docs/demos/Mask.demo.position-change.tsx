import { useState } from 'react';
import { Mask } from '@gfazioli/mantine-mask';
import { Code, Image, Stack } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <Stack>
      <Mask withCursorMask maskRadius={200} onPositionChange={setPosition}>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
          alt="Before"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Mask>
      <Code>
        x: {Math.round(position.x)}px, y: {Math.round(position.y)}px
      </Code>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Mask } from '@gfazioli/mantine-mask';
import { Code, Image, Stack } from '@mantine/core';

function Demo() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <Stack>
      <Mask withCursorMask maskRadius={200} onPositionChange={setPosition}>
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop"
          alt="Before"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Mask>
      <Code>
        x: {Math.round(position.x)}px, y: {Math.round(position.y)}px
      </Code>
    </Stack>
  );
}
`;

export const maskPositionChange: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  defaultExpanded: false,
};

import { useState } from 'react';
import { Mask } from '@gfazioli/mantine-mask';
import { Button, Group, Image, Slider, Stack, Text } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  const [position, setPosition] = useState({ x: 25, y: 35 });
  const [easing, setEasing] = useState(0.12);

  const randomize = () => {
    setPosition({
      x: Math.round(Math.random() * 100),
      y: Math.round(Math.random() * 100),
    });
  };

  return (
    <Stack>
      <Group gap="sm">
        <Button
          variant="default"
          onClick={() => {
            setPosition({ x: 25, y: 35 });
            setEasing(0.12);
          }}
        >
          Reset
        </Button>
        <Button onClick={randomize}>Random position</Button>
        <Slider labelAlwaysOn value={easing} onChange={setEasing} min={0.01} max={1} step={0.01} style={{ width: 200 }} />
        <Text size="sm" c="dimmed">
          maskX: {position.x}%, maskY: {position.y}%
        </Text>
      </Group>

      <Mask bg="black" withCursorMask={false} animation="lerp" easing={easing} maskX={position.x} maskY={position.y} maskRadius={320} radius={16}>
        <Image
          src="https://images.unsplash.com/photo-1571769267292-e24dfadebbdc?q=80&w=3580&auto=format&fit=crop"
          alt="Before"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Mask>
    </Stack>
  );
}

const code = `
import { useState } from 'react';
import { Mask } from '@gfazioli/mantine-mask';
import { Button, Group, Image, Stack, Text } from '@mantine/core';

function Demo() {
  const [position, setPosition] = useState({ x: 25, y: 35 });
  const [easing, setEasing] = useState(0.12);

  const randomize = () => {
    setPosition({
      x: Math.round(Math.random() * 100),
      y: Math.round(Math.random() * 100),
    });
  };

  return (
    <Stack>
      <Group gap="sm">
        <Button
          variant="default"
          onClick={() => {
            setPosition({ x: 25, y: 35 });
            setEasing(0.12);
          }}
        >
          Reset
        </Button>
        <Button onClick={randomize}>Random position</Button>
        <Slider labelAlwaysOn value={easing} onChange={setEasing} min={0.01} max={1} step={0.01} style={{ width: 200 }} />
        <Text size="sm" c="dimmed">
          maskX: {position.x}%, maskY: {position.y}%
        </Text>
      </Group>

      <Mask bg="black" withCursorMask={false} animation="lerp" easing={easing} maskX={position.x} maskY={position.y} maskRadius={320} radius={16}>
        <Image
          src="https://images.unsplash.com/photo-1571769267292-e24dfadebbdc?q=80&w=3580&auto=format&fit=crop"
          alt="Before"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Mask>
    </Stack>
  );
}
`;

export const maskStaticAnimate: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  defaultExpanded: false,
};

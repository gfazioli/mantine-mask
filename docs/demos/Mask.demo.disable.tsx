import { Mask, type MaskProps } from '@gfazioli/mantine-mask';
import { Alert, Button, Paper, Stack, Text, Textarea, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo(props: MaskProps) {
  return (
    <Stack>
      {props.active && (
        <Alert title="Your credits are running low" color="yellow" variant="light">
          Update your payment method to continue creating videos without interruptions.
          <Button variant="outline" size="xs" ml="md">
            Update Payment Method
          </Button>
        </Alert>
      )}
      <Mask {...props} variant="linear" recenterOnResize>
        <Paper shadow="md" withBorder p="md" radius="lg">
          <Stack>
            <Title>Create Image to Video</Title>
            <Text>
              Unlock the power of AI-driven video creation. Transform your images into captivating videos with just a few clicks. Perfect for marketers, content
              creators, and social media enthusiasts looking to elevate their visual storytelling.
            </Text>
            <Textarea disabled={props.active} placeholder="Describe your video idea..." minRows={3} />
            <Button disabled={props.active}>Create Video</Button>
          </Stack>
        </Paper>
      </Mask>
    </Stack>
  );
}

const code = `
import { Mask, type MaskProps } from '@gfazioli/mantine-mask';
import { Alert, Button, Paper, Stack, Text, Textarea, Title } from '@mantine/core';

function Demo(props: MaskProps) {
  return (
    <Stack>
      {props.active && (
        <Alert title="Your credits are running low" color="yellow" variant="light">
          Update your payment method to continue creating videos without interruptions.
          <Button variant="outline" size="xs" ml="md">
            Update Payment Method
          </Button>
        </Alert>
      )}
      <Mask{{props}} variant="linear" recenterOnResize>
        <Paper shadow="md" withBorder p="md" radius="lg">
          <Stack>
            <Title>Create Image to Video</Title>
            <Text>
              Unlock the power of AI-driven video creation. Transform your images into captivating videos with just a few clicks. Perfect for marketers, content
              creators, and social media enthusiasts looking to elevate their visual storytelling.
            </Text>
            <Textarea disabled={props.active} placeholder="Describe your video idea..." minRows={3} />
            <Button disabled={props.active}>Create Video</Button>
          </Stack>
        </Paper>
      </Mask>
    </Stack>
  );
}
`;

export const disable: MantineDemo = {
  type: 'configurator',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  controls: [
    {
      type: 'boolean',
      prop: 'active',
      initialValue: true,
      libraryValue: true,
    },
    {
      type: 'number',
      prop: 'h',
      label: 'Height',
      initialValue: 340,
      libraryValue: undefined,
      min: 0,
      max: 600,
      step: 1,
    },
    {
      type: 'number',
      prop: 'maskAngle',
      label: 'maskAngle (linear variant only)',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 360,
      step: 1,
    } as any,
    {
      type: 'number',
      prop: 'maskRadius',
      initialValue: 160,
      libraryValue: undefined,
      min: 0,
      max: 800,
      step: 1,
    },
    {
      type: 'number',
      prop: 'maskY',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 600,
      step: 1,
    },
    {
      type: 'number',
      prop: 'maskTransparencyStart',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 600,
      step: 1,
    },
    {
      type: 'number',
      prop: 'maskTransparencyEnd',
      initialValue: 100,
      libraryValue: 100,
      min: 0,
      max: 600,
      step: 1,
    },
  ],
};

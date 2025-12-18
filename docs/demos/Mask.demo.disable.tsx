import { Mask } from '@gfazioli/mantine-mask';
import { Alert, Button, Paper, Stack, Text, Textarea, Title } from '@mantine/core';
import { MantineDemo } from '@mantinex/demo';

function Demo() {
  return (
    <Stack>
      <Alert title="Your credits are running low" color="yellow" variant="light">
        Update your payment method to continue creating videos without interruptions.
        <Button variant="outline" size="xs" ml="md">
          Update Payment Method
        </Button>
      </Alert>
      <Mask h={400} variant="linear" maskAngle={0} maskY={40} maskTransparencyStart={0} maskOpacity={1}>
        <Paper shadow="md" withBorder p="md" radius="lg">
          <Stack>
            <Title>Create Image to Video</Title>
            <Text>
              Unlock the power of AI-driven video creation. Transform your images into captivating videos with just a few clicks. Perfect for marketers, content
              creators, and social media enthusiasts looking to elevate their visual storytelling.
            </Text>
            <Textarea disabled placeholder="Describe your video idea..." minRows={3} />
            <Button disabled>Create Video</Button>
          </Stack>
        </Paper>
      </Mask>
    </Stack>
  );
}

const code = `
import { Mask } from '@gfazioli/mantine-mask';
import { Image } from '@mantine/core';

function Demo() {
  return (
    <Stack>
      <Alert title="Your credits are running low" color="yellow" variant="light">
        Update your payment method to continue creating videos without interruptions.
        <Button variant="outline" size="xs" ml="md">
          Update Payment Method
        </Button>
      </Alert>
      <Mask h={400} variant="linear" maskAngle={0} maskY={40} maskTransparencyStart={0} maskOpacity={1}>
        <Paper shadow="md" withBorder p="md" radius="lg">
          <Stack>
            <Title>Create Image to Video</Title>
            <Text>
              Unlock the power of AI-driven video creation. Transform your images into captivating videos with just a few clicks. Perfect for marketers, content
              creators, and social media enthusiasts looking to elevate their visual storytelling.
            </Text>
            <Textarea disabled placeholder="Describe your video idea..." minRows={3} />
            <Button disabled>Create Video</Button>
          </Stack>
        </Paper>
      </Mask>
    </Stack>
  );
}
`;

export const disable: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: 'Demo.tsx', code, language: 'tsx' }],
  defaultExpanded: false,
};
